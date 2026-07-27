/**
 * Read Aloud AI - Background Service Worker
 * Handles context menu registration, settings retrieval, sentence chunking,
 * and calling the ElevenLabs Text-to-Speech API.
 */

// 1. Register Context Menu on extension install/startup
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "read-aloud-ai",
    title: "Read Aloud AI",
    contexts: ["selection"]
  });
});

// 2. Listen for context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "read-aloud-ai" && info.selectionText && tab?.id) {
    const selectedText = info.selectionText.trim();
    if (!selectedText) return;

    // Send initial loading state to content script to display floating player UI
    chrome.tabs.sendMessage(tab.id, {
      action: "INIT_PLAYER",
      text: selectedText
    }).catch((err) => {
      console.warn("Could not send message to tab. Injecting content script dynamically...", err);
      // If content script wasn't loaded (e.g. extension just installed), inject it first
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "INIT_PLAYER", text: selectedText });
      });
    });

    // Process TTS conversion
    await processTextToSpeech(selectedText, tab.id);
  }
});

/**
 * Split text into sentence-safe chunks under maxCharLength (ElevenLabs limit is ~5000 chars,
 * we use 2500 for optimal streaming latency and buffer safety).
 */
function splitIntoSentenceChunks(text, maxCharLength = 2500) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
  const chunks = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxCharLength) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        // Fallback: sentence itself is longer than max length, slice arbitrarily at word boundary
        let remaining = sentence;
        while (remaining.length > maxCharLength) {
          const sliceIndex = remaining.lastIndexOf(' ', maxCharLength);
          const cut = sliceIndex > 0 ? sliceIndex : maxCharLength;
          chunks.push(remaining.slice(0, cut).trim());
          remaining = remaining.slice(cut);
        }
        currentChunk = remaining;
      }
    } else {
      currentChunk += sentence;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

/**
 * Main handler: Reads settings, splits text, calls ElevenLabs API sequentially or in parallel queue,
 * and streams audio URLs back to the content script.
 */
async function processTextToSpeech(text, tabId) {
  try {
    // Read local settings (API key stored locally only for security!)
    const settings = await chrome.storage.local.get([
      "apiKey",
      "voiceId",
      "voiceName",
      "modelId",
      "voiceSettings",
      "enableElevenLabs"
    ]);

    // Split text into chunks
    const chunks = splitIntoSentenceChunks(text);

    // If Enable ElevenLabs switch is OFF or no API key is set, use Eco-Friendly Native Browser TTS!
    if (!settings.apiKey || settings.enableElevenLabs === false) {
      chrome.tabs.sendMessage(tabId, {
        action: "INIT_PLAYER_WEB_SPEECH",
        text: text,
        chunks: chunks.map((chunkText, idx) => ({ id: idx, text: chunkText, status: "pending" }))
      });
      return;
    }

    const voiceId = settings.voiceId || "21m00Tcm4TlvDq8ikWAM"; // Default Rachel
    const modelId = settings.modelId || "eleven_multilingual_v2";
    const voiceSettings = settings.voiceSettings || {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.0,
      use_speaker_boost: true
    };
    
    // Notify content script about total chunks
    chrome.tabs.sendMessage(tabId, {
      action: "QUEUE_CHUNKS",
      chunks: chunks.map((chunkText, idx) => ({ id: idx, text: chunkText, status: "pending" }))
    });

    // Process chunks sequentially (can also fetch next while playing current)
    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      
      chrome.tabs.sendMessage(tabId, {
        action: "CHUNK_STATUS",
        chunkId: i,
        status: "loading"
      });

      try {
        const audioBase64 = await fetchElevenLabsAudio(
          settings.apiKey,
          voiceId,
          modelId,
          voiceSettings,
          chunkText
        );

        chrome.tabs.sendMessage(tabId, {
          action: "CHUNK_READY",
          chunkId: i,
          audioUrl: audioBase64
        });
      } catch (err) {
        console.error(`Error synthesizing chunk ${i}:`, err);
        sendErrorToTab(tabId, err.message || `Failed to synthesize audio chunk ${i + 1}.`);
        break; // Stop processing further chunks on fatal error
      }
    }
  } catch (err) {
    console.error("Fatal error in processTextToSpeech:", err);
    sendErrorToTab(tabId, "An unexpected network or extension error occurred.");
  }
}

/**
 * Calls ElevenLabs TTS endpoint and converts arraybuffer response to Base64 Data URL.
 */
async function fetchElevenLabsAudio(apiKey, voiceId, modelId, voiceSettings, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    body: JSON.stringify({
      text: text,
      model_id: modelId,
      voice_settings: voiceSettings
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid ElevenLabs API Key (401 Unauthorized). Please check your settings.");
    } else if (response.status === 429) {
      throw new Error("ElevenLabs API rate limit exceeded (429). Please wait a moment or upgrade your tier.");
    } else if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Bad Request (400): ${errorData?.detail?.message || "Invalid voice or parameter."}`);
    } else {
      throw new Error(`ElevenLabs API Error (${response.status}): ${response.statusText}`);
    }
  }

  const arrayBuffer = await response.arrayBuffer();
  // Convert ArrayBuffer to Base64 Data URL for safe messaging across Chrome IPC
  const base64 = bufferToBase64(arrayBuffer);
  return `data:audio/mpeg;base64,${base64}`;
}

/**
 * Helper to convert ArrayBuffer to Base64
 */
function bufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Helper to send error toast message to content script
 */
function sendErrorToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, {
    action: "SHOW_ERROR",
    error: message
  }).catch(() => {});
}
