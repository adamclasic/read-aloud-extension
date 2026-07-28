import { FeatureItem, ComparisonRow, FaqItem, DemoArticle, PrivacySection } from '../types';

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'elevenlabs',
    title: 'ElevenLabs Neural Synthesis',
    description: 'Connect your personal ElevenLabs API key to experience cinematic, human-quality neural voice narration with natural inflection and breathing.',
    iconName: 'Sparkles',
    badge: 'Premium Audio'
  },
  {
    id: 'ecotts',
    title: 'Eco-Friendly Browser TTS',
    description: 'Instantly read articles offline using built-in web speech synthesis. Zero latency, zero API costs, and minimal battery consumption.',
    iconName: 'Leaf',
    badge: '100% Free & Offline'
  },
  {
    id: 'rightclick',
    title: 'Instant Right-Click Listen',
    description: 'Highlight any paragraph, quote, or article text on any web domain, right-click "Listen to selected text", and launch audio without opening popups.',
    iconName: 'MousePointerClick',
    badge: 'Seamless Workflow'
  },
  {
    id: 'widget',
    title: 'Floating On-Screen Player',
    description: 'A lightweight floating audio player widget injects dynamically onto your page with play/pause, seek scrubber, speed control, and voice toggle.',
    iconName: 'Volume2',
    badge: 'In-Page Control'
  },
  {
    id: 'privacy',
    title: 'Zero Tracking & Single Purpose',
    description: 'Your browsing habits and highlighted text belong solely to you. No analytics, no telemetry, no remote code execution, and no data sales.',
    iconName: 'ShieldCheck',
    badge: 'Privacy First'
  },
  {
    id: 'opensource',
    title: '100% Open Source Codebase',
    description: 'Fully transparent architecture hosted on GitHub. Inspect every line of code, verify security declarations, or contribute to community features.',
    iconName: 'Code2',
    badge: 'MIT / Open Source'
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'ElevenLabs Neural Voices Support',
    readAloudAi: true,
    competitor: 'Limited / Premium Paywall',
    standardTts: false,
    tooltip: 'Direct integration with your personal ElevenLabs API key for studio-quality audio.'
  },
  {
    feature: '100% Open Source & Auditable Code',
    readAloudAi: true,
    competitor: false,
    standardTts: 'N/A',
    tooltip: 'Verify zero tracking or third-party data monetization on GitHub.'
  },
  {
    feature: 'Instant Right-Click Context Menu Trigger',
    readAloudAi: true,
    competitor: true,
    standardTts: false,
    tooltip: 'Highlight any text and start reading aloud without clicking extension popup buttons.'
  },
  {
    feature: 'Lightweight Floating In-Page Player Widget',
    readAloudAi: true,
    competitor: 'Clunky Popup Only',
    standardTts: false,
    tooltip: 'Controls stay visible over the article with speed toggle and progress scrubbing.'
  },
  {
    feature: 'Local Storage Only (chrome.storage.local)',
    readAloudAi: true,
    competitor: false,
    standardTts: true,
    tooltip: 'API keys and preferences stay strictly on your local device.'
  },
  {
    feature: 'Zero Telemetry & Zero Data Sales',
    readAloudAi: true,
    competitor: 'Varies by vendor',
    standardTts: true,
    tooltip: 'Certified under Chrome Web Store Single Purpose declarations.'
  },
  {
    feature: 'Offline Eco-Friendly Browser TTS Mode',
    readAloudAi: true,
    competitor: true,
    standardTts: true,
    tooltip: 'Fallback to instant built-in speech synthesis when offline or out of API credits.'
  }
];

export const DEMO_ARTICLES: DemoArticle[] = [
  {
    id: 'ai-discovery',
    title: 'The Breakthrough in Neural Speech Synthesis',
    category: 'Technology & AI',
    source: 'ArXiv AI Digest • Read Time: 2 min',
    defaultVoice: 'ElevenLabs: Rachel (Neural)',
    content: `Recent advancements in deep learning have radically transformed synthetic voice generation. Traditional concatenative text-to-speech systems often sounded robotic and struggled with natural cadence. Modern neural models, such as ElevenLabs, analyze contextual semantics to generate realistic intonation, subtle breathing pauses, and emotional depth. With Read Aloud AI, you can convert any complex research paper or news article into an immersive audiobook experience directly inside your browser.`
  },
  {
    id: 'productivity-hack',
    title: 'Why Multitasking with Audio Boosts Information Retention',
    category: 'Cognitive Science',
    source: 'Journal of Modern Work • Read Time: 1.5 min',
    defaultVoice: 'ElevenLabs: Adam (Deep Narrative)',
    content: `Auditory learning provides a powerful secondary channel for digesting lengthy documentation. By combining visual reading with synchronized audio narration at 1.25x or 1.5x speed, cognitive load is distributed across sensory pathways. This dual-modal stimulation reduces eye strain during long working hours while improving focus and comprehension for complex technical materials.`
  },
  {
    id: 'open-source-ethos',
    title: 'The Importance of Open Source Browser Extensions',
    category: 'Web Security',
    source: 'GitHub Community Spotlight • Read Time: 1 min',
    defaultVoice: 'Eco-TTS: Standard Web Speech (Fast & Offline)',
    content: `Browser extensions operate with elevated privileges, making transparency essential. Proprietary text-to-speech tools often route user browsing data through undisclosed third-party servers. Read Aloud AI is built from the ground up as an open-source project. Every line of code is verifiable on GitHub, guaranteeing that your highlighted text is processed strictly for speech synthesis without tracking, profiling, or monetization.`
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'general',
    question: 'What is Read Aloud AI and how is it different from ReadAloud.net?',
    answer: 'Read Aloud AI is a 100% open-source Chrome extension created by Adam Clasic. Unlike commercial alternatives such as ReadAloud.net which may lock premium voices behind proprietary subscription tiers or include tracking, Read Aloud AI lets you bring your own ElevenLabs API key for studio-grade neural voices or use instant zero-cost Eco-Friendly browser TTS without any advertisements, tracking, or data monetization.'
  },
  {
    category: 'voices',
    question: 'How do I connect my ElevenLabs API key?',
    answer: 'Simply click the Read Aloud AI extension icon in Chrome, open the Settings panel, and paste your ElevenLabs API key into the secure input box. Your key is encrypted and stored locally on your machine via chrome.storage.local. It is never sent to our servers or any external domain other than the official api.elevenlabs.io endpoint for voice synthesis.'
  },
  {
    category: 'technical',
    question: 'Why does the extension ask for the "scripting" and "activeTab" permissions?',
    answer: 'When you right-click and select "Listen to selected text", the extension uses activeTab to read only the highlighted text on that specific page without requesting permanent access to your browsing history. The scripting permission allows us to inject our lightweight, floating audio player widget directly onto your screen so you can pause, seek, and adjust playback speed without switching tabs.'
  },
  {
    category: 'privacy',
    question: 'Is any of my reading history or speech data recorded or sold?',
    answer: 'No. Read Aloud AI strictly adheres to a Single Purpose Declaration: converting selected text to speech. We do not use remote code execution, we collect no analytics or telemetry, and we certify that website content is never sold, transferred to marketing third parties, or used for creditworthiness evaluation.'
  },
  {
    category: 'voices',
    question: 'Can I use Read Aloud AI offline or without an ElevenLabs account?',
    answer: 'Yes! Read Aloud AI features an "Eco-Friendly Browser TTS" mode powered by your operating system and browser\'s built-in Web Speech API. This mode is completely free, requires no API key, works offline with zero latency, and consumes minimal battery and network data.'
  },
  {
    category: 'technical',
    question: 'How do I use the Right-Click Context Menu feature?',
    answer: 'Highlight any word, paragraph, or entire article on any web page. Right-click the highlighted selection and choose "Listen to selected text" from the menu. The floating audio player will immediately appear at the bottom of your screen and begin reading the selection aloud.'
  }
];

export const PRIVACY_POLICY_SECTIONS: PrivacySection[] = [
  {
    id: 'single-purpose',
    title: '1. Single Purpose Description',
    iconName: 'Target',
    summary: 'Our strict operational boundary and commitment to focused functionality.',
    content: [
      'Read Aloud AI reads aloud selected web page text or articles using custom ElevenLabs neural voices or browser web speech synthesis.',
      'We operate under a strict Single Purpose architecture: our extension exists exclusively to convert written web content into spoken audio. We do not bundle secondary features, shopping assistants, ad injectors, or analytics monitors.'
    ]
  },
  {
    id: 'permissions',
    title: '2. Chrome Extension Permission Justifications',
    iconName: 'Lock',
    summary: 'Transparent technical justification for every Chrome API permission requested in our manifest.',
    content: [
      'To provide a seamless, non-intrusive reading experience, Read Aloud AI requires specific browser permissions. Each permission is scoped to the absolute minimum necessary to deliver text-to-speech functionality:'
    ],
    permissions: [
      {
        name: 'contextMenus',
        badge: 'Right-Click Activation',
        justification: 'We require the contextMenus permission to add a right-click menu item ("Listen to selected text"). This allows users to highlight any article, document, or webpage text and immediately launch the audio player to synthesize and read the text aloud without needing to open the extension popup.'
      },
      {
        name: 'storage',
        badge: 'Local Preferences',
        justification: 'We require the storage permission to securely save user preferences locally using chrome.storage.local. This is necessary to persist the user\'s custom ElevenLabs API key, selected voice preferences, speech playback speed, and Eco-Friendly Browser TTS settings across browser sessions.'
      },
      {
        name: 'activeTab',
        badge: 'On-Demand Access',
        justification: 'We require the activeTab permission to temporarily access the currently open webpage only when the user explicitly triggers the extension (by clicking the action icon or context menu). This allows us to read the selected text on the page for text-to-speech conversion without requesting broad or intrusive host permissions for all web domains.'
      },
      {
        name: 'scripting',
        badge: 'Floating Player UI',
        justification: 'We require the scripting permission to dynamically inject our lightweight floating audio player script and styles into the active webpage when the user initiates a text-to-speech reading session. This provides the user with on-screen playback controls (play, pause, progress bar, and speed controls) directly over the article they are reading.'
      },
      {
        name: 'Host Permissions',
        badge: 'https://api.elevenlabs.io/* & <all_urls>',
        justification: 'https://api.elevenlabs.io/* is required to make secure outbound API requests from the extension\'s background script to the ElevenLabs Text-to-Speech API in order to synthesize high-quality audio streams from the user\'s selected text. <all_urls> (Content Script Access) is required so that users can highlight text and use the floating audio playback widget on any website, news article, or blog they are reading.'
      }
    ]
  },
  {
    id: 'data-usage',
    title: '3. Declarations & Data Usage',
    iconName: 'Database',
    summary: 'How your data is handled, processed, and safeguarded.',
    content: [
      'Remote Code Execution: No, remote code is not used. All extension logic is bundled inside the verified Chrome Web Store package or verifiable via our open-source GitHub repository.',
      'Data Collected: Website content (text, images, sounds, videos, or hyperlinks). Specifically, only the exact text snippets or article paragraphs that the user explicitly selects or highlights for text-to-speech narration are processed in ephemeral memory.',
      'Processing Pipeline: Selected text is either sent directly to the local browser speech synthesis engine (Eco-TTS mode) or securely transmitted over encrypted HTTPS directly to ElevenLabs (if the user configured their personal API key). Text is never routed through intermediary servers owned by Read Aloud AI.'
    ]
  },
  {
    id: 'certifications',
    title: '4. Compliance & Certifications',
    iconName: 'Award',
    summary: 'Our binding legal pledges regarding third-party transfers and monetization.',
    content: [
      'We officially certify that all data collected or processed by Read Aloud AI complies with the following strict standards:',
      '• No Third-Party Sales or Transfers: Data is never sold, leased, or transferred to third parties outside of approved, user-selected TTS processing providers (e.g., ElevenLabs API).',
      '• No Non-Single-Purpose Usage: Data is never used or analyzed for any function unrelated to text-to-speech audio synthesis.',
      '• No Profiling or Lending: Data is strictly prohibited from being used for creditworthiness evaluation, lending decisions, behavioral advertising, or personal identification profiling.',
      '• Open Source Verification: Because our codebase is completely open source under MIT license on GitHub (github.com/adamclasic/read-aloud-extension), any researcher, developer, or user can independently audit our network requests and manifest compliance.'
    ]
  },
  {
    id: 'contact',
    title: '5. Contact & Open Source Auditing',
    iconName: 'Github',
    summary: 'Get in touch with the maintainer or inspect our codebase.',
    content: [
      'Read Aloud AI is maintained by Adam Clasic and a community of open-source contributors.',
      'If you have questions regarding this privacy policy, security disclosures, or wish to review the extension\'s source code, please visit our official repository at https://github.com/adamclasic/read-aloud-extension or open an issue on our GitHub issue tracker.',
      'Last Updated: July 2026 • Policy Version: 1.2.0 • Chrome Web Store Compliance Verified'
    ]
  }
];
