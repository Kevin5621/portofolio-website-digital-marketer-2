export interface BrandData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  timeframe: string;
  fullDescription: string;
  
  achievements: {
    metric: string;
    description: string;
  }[];

  objectives: string[];
  campaignStrategy: string[] | string;
  executionHighlights: string[];

  results: {
    instagram: {
      metric: string;
      description: string;
      percentage: string;
    }[];
    tiktok: {
      metric: string;
      description: string;
      percentage: string;
    }[];
  };

  skills: string[];

  marketingMethod: {
    title: string;
    description: string;
    steps: {
      title: string;
      description: string;
    }[];
  };

  projects: {
    image: string;
    title?: string;
  }[];
  
  videoShowcase: {
    title: string;
    description: string;
    videos: {
      id: string;
      title: string;
      description: string;
      videoUrl: string;
      metrics: {
        plays?: string;
        likes?: string;
        comments?: string;
        shares?: string;
        saves?: string;
      };
    }[];
  };
  
  challenges?: string[];
  solutions?: string[];
  
  primaryColor: string;
  coverImage: string;
  revealImage: string;
  nextProject: {
    id: string;
    name: string;
    coverImage: string;
    revealImage: string;
  };
}