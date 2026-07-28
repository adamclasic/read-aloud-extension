export type PageTab = 'home' | 'privacy';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface ComparisonRow {
  feature: string;
  readAloudAi: boolean | string;
  competitor: boolean | string;
  standardTts: boolean | string;
  tooltip?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'privacy' | 'technical' | 'voices';
}

export interface DemoArticle {
  id: string;
  title: string;
  category: string;
  source: string;
  content: string;
  defaultVoice: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  content: string[];
  permissions?: {
    name: string;
    badge: string;
    justification: string;
  }[];
}
