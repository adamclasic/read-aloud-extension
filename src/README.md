# Read Aloud AI - Chrome Extension (Manifest V3)
Converts selected webpage text to high-quality speech using the ElevenLabs Text-to-Speech API.

## 📂 Included Files
- `manifest.json` — MV3 configuration with required permissions (`contextMenus`, `storage`, `activeTab`, `scripting`).
- `background.js` — Service worker handling context menu clicks, sentence chunking (~5,000 char limit protection), and ElevenLabs TTS API calls.
- `content.js` — Injects Shadow DOM floating mini-player into host webpages with audio seek, play/pause, stop, and draggable dragging support.
- `popup.html`, `popup.js`, `popup.css` — Settings interface with password-masked API key toggle, live voice fetching from ElevenLabs, model selector, and collapsible voice settings sliders.
- `icons/` — Generated extension icons (16px, 48px, 128px).

---

## 🛠️ Manual Test Steps & Installation Guide

### Step 1: Load the Unpacked Extension in Chrome
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Toggle ON **"Developer mode"** in the top right corner.
3. Click the **"Load unpacked"** button in the top left.
4. Select the unzipped folder containing this extension (`ReadAloudAI-Extension`).
5. Verify that **"Read Aloud AI"** appears in your extensions list without errors. Pin the extension icon to your Chrome toolbar for easy access!

### Step 2: Test Missing / Invalid API Key Handling
1. Click the Read Aloud AI toolbar icon to open the Settings Popup.
2. Notice the status bar says **"Not connected"** and the Voice dropdown prompts to enter an API key.
3. **Test without key:** Navigate to any webpage (e.g., Wikipedia or a news article), highlight a paragraph of text, right-click, and select **"Read Aloud AI"**.
   - *Expected:* The floating player appears in the bottom right with a red error toast stating: *"No ElevenLabs API key configured. Click the extension icon to open Settings."*
4. **Test invalid key:** Open Settings, enter a fake key like `xi-api-key-12345invalid`, and click **"Save Settings"** or **"Refresh"**.
   - *Expected:* An error message appears indicating *"Invalid API Key (401 Unauthorized)"*.

### Step 3: Configure Valid Key & Test Voice Selection
1. Enter your valid ElevenLabs API Key in the settings popup.
2. Click **"Refresh"** next to the Voice selector.
   - *Expected:* The status bar turns green saying **"Connected — [N] voices available"**, and the dropdown populates with your real custom and pre-made ElevenLabs voices.
3. Select a model (e.g., `eleven_multilingual_v2` or `eleven_turbo_v2_5`).
4. (Optional) Expand **"Advanced Voice Settings"** and adjust the stability, similarity boost, or style sliders.
5. Click **"Save Settings"**. Notice the confirmation toast!

### Step 4: Test Text Selection & Audio Playback
1. Open any webpage (e.g., [paulgraham.com](https://paulgraham.com) or a blog post).
2. Select 2–3 sentences of text.
3. Right-click the selected text and choose **"Read Aloud AI"**.
   - *Expected:* The floating mini-player slides up in the bottom-right corner. It displays *"Synthesizing chunk 1..."* and then begins playing high-quality audio!
4. **Test Controls:**
   - Click **Pause** to freeze audio; click **Play** to resume.
   - Click anywhere on the blue **Progress Bar** to seek forward or backward in the current sentence chunk.
   - Click and drag the player header to drag the floating box around the screen.
   - Click **Stop** or the **✕** button to cleanly remove the player from the DOM.

### Step 5: Test Long Text Chunking (~5,000 Character Limit Protection)
1. Select a very large block of text (multiple long paragraphs exceeding 2,500–5,000 characters).
2. Right-click and choose **"Read Aloud AI"**.
   - *Expected:* The service worker automatically splits the text into sentence-safe chunks without cutting off words mid-sentence. The player status will display *"Playing chunk 1 of X"*, and as chunk 1 completes, it seamlessly advances to chunk 2!
