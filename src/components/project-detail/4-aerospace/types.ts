export interface Project {
  image: string;
  title?: string;
  description?: string;
}

export interface VideoMetrics {
  plays: string;
  likes?: string;
  comments?: string;
  shares?: string;
  saves?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  metrics: VideoMetrics;
}

export interface MarketingMethodStep {
  title: string;
  description: string;
}

export interface MarketingMethod {
  title: string;
  description: string;
  steps: MarketingMethodStep[];
}

export interface Achievement {
  metric: string;
  description: string;
}

export interface VideoShowcase {
  title: string;
  description: string;
  videos: VideoItem[];
}

export interface BrandData {
  name: string;
  tagline: string;
  description: string;
  timeframe: string;
  fullDescription: string;
  achievements: Achievement[];
  objectives: string[];
  campaignStrategy: string[];
  executionHighlights: string[];
  results: string[];
  skills: string[];
  marketingMethod: MarketingMethod;
  projects: Project[];
  videoShowcase: VideoShowcase;
}