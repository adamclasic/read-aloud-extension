/**
 * Read Aloud AI - Content Script
 * Injects floating mini-player UI inside a Shadow DOM root to prevent CSS collisions.
 * Manages HTML5 audio playback, sequential chunk queueing, progress bar, and dragging.
 */

let shadowHost = null;
let shadowRoot = null;
let audioEl = null;
let audioChunks = [];
let currentChunkIndex = 0;
let isPlaying = false;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let isWebSpeech = false;
let currentUtterance = null;

// Listen for messages from background service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "INIT_PLAYER") {
    initPlayerUI(message.text);
  } else if (message.action === "INIT_PLAYER_WEB_SPEECH") {
    isWebSpeech = true;
    audioChunks = (message.chunks || []).map(chunk => ({
      ...chunk,
      status: "ready"
    }));
    currentChunkIndex = 0;
    if (shadowRoot) {
      const badge = shadowRoot.getElementById("player-badge");
      if (badge) {
        badge.textContent = "Web Speech";
        badge.style.background = "#10b981";
      }
      const toast = shadowRoot.getElementById("error-toast");
      if (toast) {
        toast.style.display = "none";
        toast.textContent = "";
      }
    }
    updateUI();
    playCurrentChunk();
  } else if (message.action === "QUEUE_CHUNKS") {
    isWebSpeech = false;
    audioChunks = message.chunks || [];
    currentChunkIndex = 0;
    updateUI();
  } else if (message.action === "CHUNK_STATUS") {
    const chunk = audioChunks[message.chunkId];
    if (chunk) {
      chunk.status = message.status;
      updateUI();
    }
  } else if (message.action === "CHUNK_READY") {
    const chunk = audioChunks[message.chunkId];
    if (chunk) {
      chunk.status = "ready";
      chunk.audioUrl = message.audioUrl;
      // If this is the current chunk we are waiting to play, play it now!
      if (message.chunkId === currentChunkIndex && !isPlaying && !isWebSpeech) {
        playCurrentChunk();
      }
      updateUI();
    }
  } else if (message.action === "SHOW_ERROR") {
    showErrorToast(message.error);
  }
});

/**
 * Initialize and inject Shadow DOM Player UI into host webpage
 */
function initPlayerUI(initialText) {
  // If player already exists, clean up previous audio
  if (shadowHost) {
    stopAndRemovePlayer();
  }

  // Create Shadow Host container
  shadowHost = document.createElement("div");
  shadowHost.id = "read-aloud-ai-shadow-host";
  shadowHost.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 2147483647; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;";
  document.body.appendChild(shadowHost);

  // Attach Shadow DOM (open mode so we can inspect or style if needed)
  shadowRoot = shadowHost.attachShadow({ mode: "open" });

  // Create internal HTML5 Audio element
  audioEl = document.createElement("audio");
  audioEl.addEventListener("timeupdate", onTimeUpdate);
  audioEl.addEventListener("ended", onChunkEnded);
  audioEl.addEventListener("play", () => { isPlaying = true; updateUI(); });
  audioEl.addEventListener("pause", () => { isPlaying = false; updateUI(); });
  audioEl.addEventListener("error", (e) => {
    if (!isWebSpeech && audioEl && audioEl.src && audioEl.src.length > 0 && audioEl.src !== window.location.href) {
      console.error("Audio playback error:", e);
      showErrorToast("Error playing audio chunk.");
    }
  });

  // Render Shadow DOM styling and layout
  shadowRoot.innerHTML = `
    <style>
      :host {
        all: initial;
      }
      .player-container {
        width: 320px;
        background: #1e1e24;
        color: #ffffff;
        border-radius: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
        padding: 14px 16px;
        font-family: system-ui, -apple-system, sans-serif;
        user-select: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        box-sizing: border-box;
      }
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: grab;
        padding-bottom: 4px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .header:active {
        cursor: grabbing;
      }
      .title-area {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 600;
        color: #f3f4f6;
      }
      .badge {
        background: #3b82f6;
        color: white;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 999px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .close-btn {
        background: transparent;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }
      .status-text {
        font-size: 12px;
        color: #9ca3af;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .controls {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .play-btn {
        background: #3b82f6;
        border: none;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.1s, background 0.2s;
        flex-shrink: 0;
      }
      .play-btn:hover {
        background: #2563eb;
        transform: scale(1.05);
      }
      .play-btn:disabled {
        background: #4b5563;
        cursor: not-allowed;
        transform: none;
      }
      .stop-btn {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .stop-btn:hover {
        background: rgba(239, 68, 68, 0.25);
      }
      .progress-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .progress-bar-bg {
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
      }
      .progress-bar-fill {
        height: 100%;
        background: #3b82f6;
        width: 0%;
        border-radius: 3px;
        transition: width 0.1s linear;
      }
      .time-info {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #6b7280;
      }
      .error-toast {
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        margin-top: 4px;
        display: none;
        line-height: 1.4;
      }
    </style>
    <div class="player-container">
      <div class="header" id="drag-header">
        <div class="title-area">
          <span>Read Aloud AI</span>
          <span class="badge" id="player-badge">ElevenLabs</span>
        </div>
        <button class="close-btn" id="close-btn" title="Stop & Close">✕</button>
      </div>
      
      <div class="status-text" id="status-text">Initializing audio...</div>
      
      <div class="controls">
        <button class="play-btn" id="play-pause-btn" disabled title="Play / Pause">
          <svg id="icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 2px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <svg id="icon-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        </button>
        <div class="progress-container">
          <div class="progress-bar-bg" id="progress-bg">
            <div class="progress-bar-fill" id="progress-fill"></div>
          </div>
          <div class="time-info">
            <span id="time-current">0:00</span>
            <span id="time-duration">0:00</span>
          </div>
        </div>
        <button class="stop-btn" id="stop-btn">Stop</button>
      </div>
      <div class="error-toast" id="error-toast"></div>
    </div>
  `;

  // Attach DOM event listeners inside Shadow Root
  shadowRoot.getElementById("close-btn").addEventListener("click", stopAndRemovePlayer);
  shadowRoot.getElementById("stop-btn").addEventListener("click", stopAndRemovePlayer);
  shadowRoot.getElementById("play-pause-btn").addEventListener("click", togglePlayPause);
  shadowRoot.getElementById("progress-bg").addEventListener("click", seekAudio);

  // Setup draggable functionality
  const dragHeader = shadowRoot.getElementById("drag-header");
  dragHeader.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", endDrag);
}

function startDrag(e) {
  isDragging = true;
  const rect = shadowHost.getBoundingClientRect();
  dragOffset.x = e.clientX - rect.left;
  dragOffset.y = e.clientY - rect.top;
}

function onDrag(e) {
  if (!isDragging || !shadowHost) return;
  const x = e.clientX - dragOffset.x;
  const y = e.clientY - dragOffset.y;
  shadowHost.style.left = `${Math.max(0, Math.min(window.innerWidth - 320, x))}px`;
  shadowHost.style.top = `${Math.max(0, Math.min(window.innerHeight - 100, y))}px`;
  shadowHost.style.bottom = "auto";
  shadowHost.style.right = "auto";
}

function endDrag() {
  isDragging = false;
}

/**
 * Play current chunk or advance
 */
function playCurrentChunk() {
  const currentChunk = audioChunks[currentChunkIndex];
  if (!currentChunk) return;

  if (isWebSpeech) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any active speech

      const utterance = new SpeechSynthesisUtterance(currentChunk.text);

      utterance.onstart = () => {
        isPlaying = true;
        updateUI();
      };

      utterance.onend = () => {
        onChunkEnded();
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.error("Web Speech error:", e);
          showErrorToast("Web Speech synthesis error.");
        }
        isPlaying = false;
        updateUI();
      };

      utterance.onboundary = (e) => {
        if (e.name === 'word' || e.name === 'sentence') {
          updateWebSpeechProgress(e.charIndex, currentChunk.text ? currentChunk.text.length : 1);
        }
      };

      currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      isPlaying = true;
      updateUI();
    } else {
      showErrorToast("Web Speech API is not supported in this browser.");
    }
    return;
  }

  // ElevenLabs mode
  if (!currentChunk.audioUrl) return;
  if (audioEl) {
    if (audioEl.src !== currentChunk.audioUrl) {
      audioEl.src = currentChunk.audioUrl;
    }
    audioEl.play().catch(e => console.error("Play error:", e));
  }
}

function togglePlayPause() {
  if (isWebSpeech) {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        isPlaying = false;
        updateUI();
      } else {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          isPlaying = true;
          updateUI();
        } else {
          playCurrentChunk();
        }
      }
    }
    return;
  }

  if (!audioEl) return;
  if (isPlaying) {
    audioEl.pause();
  } else {
    if (!audioEl.src && audioChunks[currentChunkIndex]?.audioUrl) {
      playCurrentChunk();
    } else {
      audioEl.play().catch(e => console.error("Play error:", e));
    }
  }
}

function onChunkEnded() {
  currentChunkIndex++;
  if (currentChunkIndex < audioChunks.length) {
    if (isWebSpeech) {
      playCurrentChunk();
    } else {
      const nextChunk = audioChunks[currentChunkIndex];
      if (nextChunk && nextChunk.audioUrl) {
        playCurrentChunk();
      } else {
        updateUI(); // Status will show "Loading next chunk..."
      }
    }
  } else {
    // All chunks completed!
    isPlaying = false;
    updateUI();
  }
}

function onTimeUpdate() {
  if (!shadowRoot || !audioEl || isWebSpeech) return;
  const fill = shadowRoot.getElementById("progress-fill");
  const currEl = shadowRoot.getElementById("time-current");
  const durEl = shadowRoot.getElementById("time-duration");

  const current = audioEl.currentTime || 0;
  const dur = audioEl.duration || 0;

  if (dur > 0) {
    const pct = (current / dur) * 100;
    fill.style.width = `${pct}%`;
  } else {
    fill.style.width = "0%";
  }

  currEl.textContent = formatTime(current);
  durEl.textContent = dur > 0 && isFinite(dur) ? formatTime(dur) : "0:00";
}

function updateWebSpeechProgress(charIndex = 0, chunkLength = 1) {
  if (!shadowRoot || !isWebSpeech) return;
  const fill = shadowRoot.getElementById("progress-fill");
  const currEl = shadowRoot.getElementById("time-current");
  const durEl = shadowRoot.getElementById("time-duration");

  const totalChunks = audioChunks.length || 1;
  const charPct = chunkLength > 0 ? (charIndex / chunkLength) : 0;
  const overallPct = ((currentChunkIndex + charPct) / totalChunks) * 100;

  if (fill) {
    fill.style.width = `${Math.min(100, Math.max(0, overallPct))}%`;
  }
  if (currEl) {
    currEl.textContent = `${currentChunkIndex + 1}/${totalChunks}`;
  }
  if (durEl) {
    durEl.textContent = "Native";
  }
}

function seekAudio(e) {
  if (isWebSpeech) {
    if (audioChunks.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    currentChunkIndex = Math.min(audioChunks.length - 1, Math.max(0, Math.floor(pct * audioChunks.length)));
    playCurrentChunk();
    return;
  }

  if (!audioEl || !audioEl.duration || !isFinite(audioEl.duration)) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, clickX / rect.width));
  audioEl.currentTime = pct * audioEl.duration;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function updateUI() {
  if (!shadowRoot) return;
  const statusEl = shadowRoot.getElementById("status-text");
  const playBtn = shadowRoot.getElementById("play-pause-btn");
  const iconPlay = shadowRoot.getElementById("icon-play");
  const iconPause = shadowRoot.getElementById("icon-pause");

  const currentChunk = audioChunks[currentChunkIndex];
  const totalChunks = audioChunks.length;

  if (!currentChunk || currentChunkIndex >= totalChunks) {
    statusEl.textContent = "Finished playing.";
    playBtn.disabled = true;
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
    if (isWebSpeech) {
      updateWebSpeechProgress(0, 1);
    }
    return;
  }

  if (isWebSpeech) {
    statusEl.textContent = `Speaking sentence ${currentChunkIndex + 1} of ${totalChunks} (Web Speech)`;
    playBtn.disabled = false;
    updateWebSpeechProgress(0, currentChunk.text ? currentChunk.text.length : 1);
  } else {
    if (currentChunk.status === "loading") {
      statusEl.textContent = `Synthesizing chunk ${currentChunkIndex + 1} of ${totalChunks}...`;
      playBtn.disabled = true;
    } else if (currentChunk.status === "ready" || currentChunk.status === "playing") {
      statusEl.textContent = `Playing chunk ${currentChunkIndex + 1} of ${totalChunks}`;
      playBtn.disabled = false;
    } else if (currentChunk.status === "pending") {
      statusEl.textContent = `Waiting for chunk ${currentChunkIndex + 1} of ${totalChunks}...`;
      playBtn.disabled = true;
    }
  }

  if (isPlaying) {
    iconPlay.style.display = "none";
    iconPause.style.display = "block";
  } else {
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
  }
}

function showErrorToast(errorMsg) {
  if (!shadowRoot) return;
  const toast = shadowRoot.getElementById("error-toast");
  const statusEl = shadowRoot.getElementById("status-text");
  if (toast) {
    toast.textContent = errorMsg;
    toast.style.display = "block";
  }
  if (statusEl) {
    statusEl.textContent = "Error occurred.";
  }
}

/**
 * Stop audio and remove player cleanly from DOM
 */
function stopAndRemovePlayer() {
  if (isWebSpeech && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (audioEl) {
    audioEl.pause();
    audioEl.src = "";
    audioEl = null;
  }
  if (shadowHost && shadowHost.parentNode) {
    shadowHost.parentNode.removeChild(shadowHost);
  }
  shadowHost = null;
  shadowRoot = null;
  isPlaying = false;
  isWebSpeech = false;
  currentUtterance = null;
}
