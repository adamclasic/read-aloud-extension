# 🔊 Read Aloud AI — Chrome Extension (Manifest V3)

> Turn any web article or selected text into natural, lifelike speech using the **ElevenLabs Text-to-Speech API** or free **Native Browser Web Speech**. Built with Manifest V3 and isolated Shadow DOM UI for maximum host page compatibility.

---

## Installation
1. Download the [`read-aloud-extension-latestzip`]([https://github.com/adamclasic/read-aloud-extension/releases/download/v1.1.0/read-aloud-extension-v1.1.0.zip](https://github.com/adamclasic/read-aloud-extension/releases/latest)) file from the latest release.
2. Unzip/extract the file to a folder on your computer.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** using the toggle switch in the top-right corner.
5. Click **Load unpacked** in the top-left corner and select the extracted folder.

---

> [!IMPORTANT]
> **Required API Key Permissions (ElevenLabs Mode)**
> 
> When creating or editing your ElevenLabs API key, ensure you set the following permissions under **Endpoints**:
> 
> * **Text to Speech**: Set to **Access**
> * **Voices**: Set to **Read** (or **Write** if your configuration requires managing voices)

---

## ✨ Features

- **Context Menu Integration:** Highlight any text on any website, right-click, and select **"Read Aloud AI"** to start listening immediately.
- **⚡ Force Browser TTS & Zero-Config  Fallback:**
  - Includes a **"Force Browser TTS Mode"** toggle in Settings to bypass API keys and use 100% free, local Web Speech synthesis (`window.speechSynthesis`).
  - Automatically falls back to native browser speech synthesis if no ElevenLabs API key is configured.
  - Dynamically updates the player badge to **"Web Speech"**  with sentence-by-sentence progress tracking.
- **Isolated Shadow DOM Player:** The floating player overlay is injected via an open `ShadowRoot`—preventing host page CSS rules, reset scripts, or high z-indexes from ruining the player's appearance or functionality.
- **Smart ~5,000-Character Queueing:** Automatically detects long selections and splits text into sentence-safe chunks (`[^.!?]+[.!?]+`) to bypass ElevenLabs single-request API character limits, streaming sequential audio chunks seamlessly.
- **Robust Error Handling & Race Prevention:**
  - Sequential handshake ensures the content script is fully injected and listening before text-to-speech processing begins, eliminating first-run race conditions on new tabs.
  - Smart audio error guards prevent false-alarm HTML5 `<audio>` element errors when running in Web Speech mode, while presenting human-readable error toasts for genuine API issues (e.g. 401 Unauthorized, 429 Rate Limits).
- **Improved UI & Text Contrast:** Enhanced CSS input and select control styling for optimal text contrast and high visibility in settings form fields.
- **Live Voice & Model Fetching:** Connects directly to your ElevenLabs account to pull your custom and pre-made voices live.
- **Advanced Controls:** Adjust model selection (`eleven_multilingual_v2`, `eleven_turbo_v2_5`, `eleven_flash_v2_5`), stability, similarity boost, style, and speaker boost.
- **Secure Key Storage:** Keeps your ElevenLabs API key strictly in local storage (`chrome.storage.local`) to ensure sensitive credentials are never synced across devices over unencrypted browser channels.
