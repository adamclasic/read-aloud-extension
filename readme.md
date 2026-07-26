# 🔊 Read Aloud AI — Chrome Extension (Manifest V3)

> Turn any web article or selected text into natural, lifelike speech using the **ElevenLabs Text-to-Speech API**. Built with Manifest V3 and isolated Shadow DOM UI for maximum host page compatibility.

---

## Installation
1. Download the [`read-aloud-extension-v1.0.0.zip`](https://github.com/adamclasic/read-aloud-extension/releases/download/v1.0.0/read-aloud-extension-v1.0.0.zip) file from the latest release.
2. Unzip/extract the file to a folder on your computer.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** using the toggle switch in the top-right corner.
5. Click **Load unpacked** in the top-left corner and select the extracted folder.

---

> [!IMPORTANT]
> **Required API Key Permissions**
> 
> When creating or editing your ElevenLabs API key, ensure you set the following permissions under **Endpoints**:
> 
> * **Text to Speech**: Set to **Access**
> * **Voices**: Set to **Read** (or **Write** if your configuration requires managing voices)

## ✨ Features

- **Context Menu Integration:** Highlight any text on any website, right-click, and select **"Read Aloud AI"** to start listening immediately.
- **Isolated Shadow DOM Player:** The floating player overlay is injected via an open `ShadowRoot`—preventing host page CSS rules, reset scripts, or high z-indexes from ruining the player's appearance or functionality.
- **Smart ~5,000-Character Queueing:** Automatically detects long selections and splits text into sentence-safe chunks (`[^.!?]+[.!?]+`) to bypass ElevenLabs single-request API character limits, streaming sequential audio chunks seamlessly.
- **Live Voice & Model Fetching:** Connects directly to your ElevenLabs account to pull your custom and pre-made voices live.
- **Advanced Controls:** Adjust model selection (`eleven_multilingual_v2`, `eleven_turbo_v2_5`, `eleven_flash_v2_5`), stability, similarity boost, style, and speaker boost.
- **Secure Key Storage:** Keeps your ElevenLabs API key strictly in local storage (`chrome.storage.local`) to ensure sensitive credentials are never synced across devices over unencrypted browser channels.

---

## 🛠️ Project Structure

```text
├── manifest.json         # Manifest V3 configuration & permissions
├── background.js        # Service worker: context menu setup, chunking, & ElevenLabs API fetch
├── content.js           # Content script: Shadow DOM floating player UI & audio controls
├── popup.html           # Extension settings UI
├── popup.js             # Settings logic, voice fetching, & local storage handling
├── popup.css            # Styles for settings panel
└── icons/               # Extension icons (16px, 48px, 128px)
