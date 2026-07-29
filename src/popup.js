/**
 * Read Aloud AI - Settings Popup Controller
 * Handles ElevenLabs API Key storage, live voice fetching, model selection,
 * advanced voice sliders, and persisting to chrome.storage.local.
 */

document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements
  const apiKeyInput = document.getElementById("api-key");
  const toggleKeyBtn = document.getElementById("toggle-key-visibility");
  const eyeShow = document.getElementById("eye-show");
  const eyeHide = document.getElementById("eye-hide");
  const voiceSelect = document.getElementById("voice-select");
  const refreshVoicesBtn = document.getElementById("refresh-voices-btn");
  const modelSelect = document.getElementById("model-select");
  const statusBar = document.getElementById("status-bar");
  const statusText = document.getElementById("status-text");
  const saveBtn = document.getElementById("save-btn");
  const toastMsg = document.getElementById("toast-message");

  // Advanced Sliders
  const sliderStability = document.getElementById("slider-stability");
  const valStability = document.getElementById("val-stability");
  const sliderSimilarity = document.getElementById("slider-similarity");
  const valSimilarity = document.getElementById("val-similarity");
  const sliderStyle = document.getElementById("slider-style");
  const valStyle = document.getElementById("val-style");
  const checkSpeakerBoost = document.getElementById("check-speaker-boost");
  const checkForceNativeTTS = document.getElementById("check-force-native-tts") || document.getElementById("check-enable-elevenlabs");

  // Toggle API key visibility
  toggleKeyBtn.addEventListener("click", () => {
    if (apiKeyInput.type === "password") {
      apiKeyInput.type = "text";
      eyeShow.style.display = "none";
      eyeHide.style.display = "block";
    } else {
      apiKeyInput.type = "password";
      eyeShow.style.display = "block";
      eyeHide.style.display = "none";
    }
  });

  // Bind slider display labels
  sliderStability.addEventListener("input", (e) => valStability.textContent = Number(e.target.value).toFixed(2));
  sliderSimilarity.addEventListener("input", (e) => valSimilarity.textContent = Number(e.target.value).toFixed(2));
  sliderStyle.addEventListener("input", (e) => valStyle.textContent = Number(e.target.value).toFixed(2));

  // 1. Load existing settings from chrome.storage.local
  const settings = await chrome.storage.local.get([
    "apiKey",
    "voiceId",
    "voiceName",
    "modelId",
    "voiceSettings",
    "cachedVoices",
    "enableElevenLabs",
    "forceNativeTTS"
  ]);

  if (checkForceNativeTTS) {
    checkForceNativeTTS.checked = settings.forceNativeTTS === true || settings.enableElevenLabs === false;
    //disable inputs if True
    sliderStability.disabled = checkForceNativeTTS.checked;
    valStability.disabled = checkForceNativeTTS.checked;
    sliderSimilarity.disabled = checkForceNativeTTS.checked;
    valSimilarity.disabled = checkForceNativeTTS.checked;
    sliderStyle.disabled = checkForceNativeTTS.checked;
    valStyle.disabled = checkForceNativeTTS.checked;
    checkSpeakerBoost.disabled = checkForceNativeTTS.checked;
    modelSelect.disabled = checkForceNativeTTS.checked;
    voiceSelect.disabled = checkForceNativeTTS.checked;
  }
  /**
  * update ui if Force Native TTS switch is toggled
  */
  function updateUI() {
    const isForceNative = checkForceNativeTTS.checked;
    sliderStability.disabled = isForceNative;
    valStability.disabled = isForceNative;
    sliderSimilarity.disabled = isForceNative;
    valSimilarity.disabled = isForceNative;
    sliderStyle.disabled = isForceNative;
    valStyle.disabled = isForceNative;
    checkSpeakerBoost.disabled = isForceNative;
    modelSelect.disabled = isForceNative;
    voiceSelect.disabled = isForceNative;
  }
  checkForceNativeTTS.addEventListener("change", updateUI);



  if (settings.apiKey) {
    apiKeyInput.value = settings.apiKey;
    if (settings.cachedVoices && settings.cachedVoices.length > 0) {
      populateVoiceDropdown(settings.cachedVoices, settings.voiceId);
      showStatus(`Connected — ${settings.cachedVoices.length} voices available`, "connected");
    } else {
      await fetchVoices(settings.apiKey, settings.voiceId);
    }
  }

  if (settings.modelId) {
    modelSelect.value = settings.modelId;
  }

  if (settings.voiceSettings) {
    sliderStability.value = settings.voiceSettings.stability ?? 0.5;
    valStability.textContent = Number(sliderStability.value).toFixed(2);

    sliderSimilarity.value = settings.voiceSettings.similarity_boost ?? 0.75;
    valSimilarity.textContent = Number(sliderSimilarity.value).toFixed(2);

    sliderStyle.value = settings.voiceSettings.style ?? 0.0;
    valStyle.textContent = Number(sliderStyle.value).toFixed(2);

    checkSpeakerBoost.checked = settings.voiceSettings.use_speaker_boost ?? true;
  }

  // 2. Handle Refresh Voices button click
  refreshVoicesBtn.addEventListener("click", async () => {
    const key = apiKeyInput.value.trim();
    if (!key) {
      showStatus("Please enter an ElevenLabs API Key first", "error");
      apiKeyInput.focus();
      return;
    }
    await fetchVoices(key, voiceSelect.value || settings.voiceId);
  });

  // 3. Handle Save button click
  saveBtn.addEventListener("click", async () => {
    const key = apiKeyInput.value.trim();

    const selectedOption = voiceSelect.options[voiceSelect.selectedIndex];
    const voiceId = voiceSelect.value || "21m00Tcm4TlvDq8ikWAM"; // Default Rachel
    const voiceName = selectedOption ? selectedOption.text : "Default Voice";

    const voiceSettings = {
      stability: parseFloat(sliderStability.value),
      similarity_boost: parseFloat(sliderSimilarity.value),
      style: parseFloat(sliderStyle.value),
      use_speaker_boost: checkSpeakerBoost.checked
    };

    const isForceNative = checkForceNativeTTS ? checkForceNativeTTS.checked : false;

    // Note: Strictly store in local storage only (never chrome.storage.sync) to avoid syncing secrets across devices
    await chrome.storage.local.set({
      apiKey: key,
      voiceId: voiceId,
      voiceName: voiceName,
      modelId: modelSelect.value,
      voiceSettings: voiceSettings,
      forceNativeTTS: isForceNative,
      enableElevenLabs: !isForceNative
    });

    // If we haven't fetched voices yet and key is provided, fetch them now
    if (key && (voiceSelect.disabled || voiceSelect.options.length <= 1)) {
      await fetchVoices(key, voiceId);
    }

    showToast("Settings saved successfully!");
  });

  /**
   * Fetch voices from ElevenLabs API
   */
  async function fetchVoices(apiKey, selectedVoiceId) {
    showStatus("Fetching voices from ElevenLabs...", "loading");
    refreshVoicesBtn.disabled = true;
    voiceSelect.disabled = true;

    try {
      const res = await fetch("https://api.elevenlabs.io/v1/voices", {
        method: "GET",
        headers: {
          "xi-api-key": apiKey
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid API Key (401 Unauthorized)");
        }
        throw new Error(`API Error (${res.status})`);
      }

      const data = await res.json();
      const voices = data.voices || [];

      if (voices.length === 0) {
        throw new Error("No voices returned from account.");
      }

      // Cache voices locally so opening popup is instant
      await chrome.storage.local.set({ cachedVoices: voices });

      populateVoiceDropdown(voices, selectedVoiceId);
      showStatus(`Connected — ${voices.length} voices available`, "connected");
    } catch (err) {
      console.error("Failed to fetch voices:", err);
      showStatus(err.message || "Failed to load voices", "error");
      voiceSelect.innerHTML = '<option value="">Failed to load voices</option>';
      voiceSelect.disabled = true;
    } finally {
      refreshVoicesBtn.disabled = false;
    }
  }

  /**
   * Populate voice select dropdown
   */
  function populateVoiceDropdown(voices, selectedId) {
    voiceSelect.innerHTML = "";
    voices.forEach((v) => {
      const option = document.createElement("option");
      option.value = v.voice_id;
      const category = v.labels?.accent || v.category || "Voice";
      option.textContent = `${v.name} (${category})`;
      if (v.voice_id === selectedId || (!selectedId && v.name === "Rachel")) {
        option.selected = true;
      }
      voiceSelect.appendChild(option);
    });
    voiceSelect.disabled = false;
  }

  /**
   * Show connection status bar
   */
  function showStatus(msg, type) {
    statusText.textContent = msg;
    statusBar.className = `status-bar ${type}`;
    statusBar.style.display = "flex";
  }

  /**
   * Show temporary success toast
   */
  function showToast(msg) {
    toastMsg.textContent = msg;
    toastMsg.style.display = "block";
    setTimeout(() => {
      toastMsg.style.display = "none";
    }, 3000);
  }
});


