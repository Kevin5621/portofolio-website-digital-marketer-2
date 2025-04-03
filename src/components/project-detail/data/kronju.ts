import { BrandData } from '../common/types';

export const kronjuData: BrandData = {
  id: "kronju",
  name: "Kronju",
  tagline: "Cheese Snack Experience",
  description: "A revolutionary digital marketing campaign for Kronju premium cheese snacks. Elevating brand presence across multiple digital channels with a bold, minimalist approach.",
  timeframe: "April 2023 - May 2023",
  fullDescription: "Kronju is a healthy macaroni snack made from tapioca flour and real cheese. It offers a delightful yet healthy snacking experience anytime.",
  achievements: [
    { metric: "42%", description: "Sales growth" },
    { metric: "162%", description: "Social Media Reach" },
    { metric: "3.2M", description: "Total Interactions" },
  ],

  objectives: [
    "Make Kronju's brand look special and fun.",
    "Create pictures and videos that show how tasty and healthy the snacks are.",
    "Make sure everything looks the same across Instagram"
  ],

  campaignStrategy: [
    "Precision-engineered approach to elevate Kronju's digital presence through systematic implementation."
  ],

  executionHighlights: [
    "Created a consistent brand identity with vibrant colors and playful elements",
    "Designed educational content for Instagram that matched the brand's healthy image",
    "Developed colorful and simple designs that attract attention"
  ],

  results: {
    instagram: [
      { metric: "+42%", description: "Sales growth", percentage: "42% increase" },
      { metric: "+162%", description: "Social Media Reach", percentage: "162% increase" },
      { metric: "+3.2M", description: "Total Interactions", percentage: "320% increase" }
    ],
    tiktok: []
  },

  skills: ["CONTENT STRATEGY", "SCHEDULING", "GRAPHIC DESIGN"],

  marketingMethod: {
    title: "Marketing Approach",
    description: "Systematically developed strategy with profesional precision to elevate Kronju's digital presence, emphasizing quality and authenticity.",
    steps: [
      {
        title: "Research",
        description: "Methodical audience analysis and competitor research"
      },
      {
        title: "Strategy",
        description: "Integrated multi-channel approach with consistent messaging"
      },
      {
        title: "Execution",
        description: "Data-driven implementation with systematic A/B testing"
      }
    ]
  },

  projects: [
    { image: "/project/project-detail/1-kronju/foto-1-1.png" },
    { image: "/project/project-detail/1-kronju/foto-1-2.png" },
    { image: "/project/project-detail/1-kronju/foto-1-3.png" },
    { image: "/project/project-detail/1-kronju/foto-1-4.png" },
    { image: "/project/project-detail/1-kronju/foto-1-5.png" },
  ],
  
  videoShowcase: {
    title: "Top Performing Content",
    description: "The most successful content created for Ortist's social media platforms to drive awareness and patient inquiries.",
    videos: [
      {
        id: "video1",
        title: "Invisible Aligner Benefits",
        description: "Educational content explaining the benefits of invisible aligners compared to traditional braces.",
        videoUrl: "/project/project-detail/2-ortist/video-1.mp4",
        metrics: {
          plays: "72.5K",
          likes: "3.8K",
          comments: "12", 
          shares: "156",
          saves: "1.8K"
        }
      },
      {
        id: "video2",
        title: "Patient Transformation",
        description: "Before and after showcase of a patient's smile transformation with Ortist's treatment.",
        videoUrl: "/project/project-detail/2-ortist/video-2.mp4",
        metrics: {
          plays: "48K",
          likes: "2.2K",
          comments: "8",
          shares: "32",
          saves: "420"
        }
      },
      {
        id: "video3",
        title: "Treatment Process Explained",
        description: "Step-by-step explanation of the orthodontic treatment process at Ortist.",
        videoUrl: "/project/project-detail/2-ortist/video-3.mp4",
        metrics: {
          plays: "36.2K"
        }
      }
    ]
  },
  
  challenges: [
    "Creating a distinctive brand identity in a competitive snack market",
    "Communicating the health benefits without compromising on the fun aspect",
    "Maintaining consistent brand messaging across all platforms"
  ],
  
  solutions: [
    "Developed a vibrant and playful visual identity that stands out",
    "Created educational content that balances health information with appealing visuals",
    "Implemented a systematic content calendar to ensure consistency"
  ],
  
  primaryColor: "amber",
  coverImage: "/project/cover1.jpg",
  revealImage: "/project/reveal-cover/reveal-cover1.png",
  nextProject: {
    id: "ortist",
    name: "Ortist",
    coverImage: "/project/cover2.jpg",
    revealImage: "/project/reveal-cover/reveal-cover2.png"
  }
};