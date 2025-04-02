import { Suspense } from 'react';
import ProjectsClient from './ProjectsClient';

interface Project {
  title: string;
  route: string;
  image: string;
  backgroundImage: string;
  description: string;
}

// This function tells Next.js to pre-render this page at build time
export const generateStaticParams = async () => {
  return [];
};

// Function to fetch projects data
async function getProjects(): Promise<Project[]> {
  // In a real app, this might fetch from an API or database
  // For now, we'll return the hardcoded projects
  return [
    {
      title: 'Binjasiimen Samapta',
      route: '/project/binjasiimen-samapta',
      image: '/project/cover5.jpg',
      backgroundImage: '/project/cover5.jpg', 
      description: 'Military preparation training services for aspiring soldiers'
    },
    {
      title: 'Ortist Specialist',
      route: '/project/ortist',
      image: '/project/cover2.jpg',
      backgroundImage: '/project/cover2.jpg',
      description: 'Professional orthodontic services for all ages'
    },
    {
      title: 'Kronju',
      route: '/project/kronju',
      image: '/project/cover1.jpg',
      backgroundImage: '/project/cover1.jpg',
      description: 'Healthy cheese snacks made with natural ingredients'
    },
    {
      title: 'Rumah Bahasa Asing',
      route: '/project/rumah-bahasa-asing',
      image: '/project/cover3.jpg',
      backgroundImage: '/project/cover3.jpg',
      description: 'Korean language learning services and cultural programs'
    }
  ];
}

export default async function ProjectsPage() {
  // Fetch projects data on the server
  const projects = await getProjects();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-white overflow-hidden"></div>}>
      <ProjectsClient projects={projects} />
    </Suspense>
  );
}