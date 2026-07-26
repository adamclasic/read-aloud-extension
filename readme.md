# 🔊 Read Aloud AI — Chrome Extension (Manifest V3)

> Turn any web article or selected text into natural, lifelike speech using the **ElevenLabs Text-to-Speech API**. Built with Manifest V3 and isolated Shadow DOM UI for maximum host page compatibility.

---

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