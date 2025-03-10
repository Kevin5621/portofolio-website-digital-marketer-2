'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { RevealImage } from '@/components/hooks/RevealImage';

// Dynamically import ReactLenis with no SSR to improve initial load time
const ReactLenis = dynamic(() => import('lenis/react'), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-white overflow-hidden"></div>
});

interface Project {
  title: string;
  route: string;
  image: string;
  backgroundImage: string;
  description: string;
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  // Add preload for fonts
  useEffect(() => {
    // Create link for preloading Google Fonts
    const fontPreloadLink = document.createElement('link');
    fontPreloadLink.rel = 'preload';
    fontPreloadLink.as = 'style';
    fontPreloadLink.href = 'https://fonts.googleapis.com/css2?family=Your+Font+Family&display=swap';
    document.head.appendChild(fontPreloadLink);
    
    // Add the actual stylesheet with font-display: swap
    const fontStyleLink = document.createElement('link');
    fontStyleLink.rel = 'stylesheet';
    fontStyleLink.href = 'https://fonts.googleapis.com/css2?family=Your+Font+Family&display=swap&font-display=swap';
    document.head.appendChild(fontStyleLink);
    
    return () => {
      document.head.removeChild(fontPreloadLink);
      document.head.removeChild(fontStyleLink);
    };
  }, []);
  
  // Memoize projects array to prevent unnecessary re-renders
  const projects: Project[] = [
    {
      title: 'Aerospace',
      route: '/project/aerospace',
      image: '/project/cover4.jpg',
      backgroundImage: '/project/cover4.jpg',
      description: 'Premium men\'s underwear brand focusing on comfort and style'
    },
    {
      title: 'Benjasimen Samapta',
      route: '/project/benjasimen-samapta',
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

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <main className="min-h-screen bg-white overflow-hidden">
        <Navbar variant="dark" />
        
        {/* Only render RevealImage when needed */}
        {activeProject !== null && (
          <RevealImage
            isVisible={activeProject !== null}
            imageSrc={projects[activeProject]?.image}
            imageAlt={projects[activeProject]?.title}
            initialScale={0.8}
            finalScale={1}
            width="340px"
            height="240px"
            transitionDuration={0.4}
            className="shadow-lg"
          />
        )}
        
        {/* Header with bold typography - Optimized for LCP */}
        <section className="pt-36 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0.8 }} // Start with higher opacity
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }} // Faster animation
              className="relative"
            >
              <h1 className="text-[8vw] md:text-[10vw] font-bold text-black leading-none tracking-tighter overflow-hidden">
                <span className="block">MY</span>
                <span className="block -mt-4">WORK.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-lg text-stone-600 max-w-lg font-light leading-relaxed"
              initial={{ opacity: 0.8, y: 10 }} // Less movement, higher initial opacity
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }} // Faster animation with less delay
            >
              Explore our portfolio of creative work across various industries. Each project represents our commitment to excellence and innovative solutions.
            </motion.p>
          </div>
        </section>
        
        {/* Projects section - List view only */}
        <AnimatePresence>
          <motion.section 
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-8 pb-24"
          >
            <div className="max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <ListProjectItem 
                  key={`list-${project.title}`}
                  project={project}
                  index={index}
                  onHover={() => setActiveProject(index)}
                  onLeave={() => setActiveProject(null)}
                />
              ))}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>
    </ReactLenis>
  );
}
// List view project item
const ListProjectItem = ({ 
  project, 
  index, 
  onHover, 
  onLeave 
}: { 
  project: Project; 
  index: number; 
  onHover: () => void; 
  onLeave: () => void; 
}) => {
  const [, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  
  // Map the project title to the appropriate reveal cover image
  const getRevealCoverImage = (title: string) => {
    switch(title) {
      case 'Aerospace':
        return '/project/reveal-cover/reveal-cover4.png';
      case 'Benjasimen Samapta':
        return '/project/reveal-cover/reveal-cover5.png';
      case 'Ortist Specialist':
        return '/project/reveal-cover/reveal-cover2.png';
      case 'Kronju':
        return '/project/reveal-cover/reveal-cover1.png';
      case 'Rumah Bahasa Asing':
        return '/project/reveal-cover/reveal-cover3.png';
      default:
        return project.image;
    }
  };
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, 40]);
  
  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y: translateY }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave();
      }}
      className="border-b border-gray-200 group"
    >
      <Link href={project.route}>
        <div className="py-6 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-3xl md:text-5xl font-bold text-black/20 group-hover:text-black transition-colors duration-300">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <div>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight transform group-hover:translate-x-2 transition-transform duration-300">
                {project.title}
              </h2>
              {/* Show description on mobile */}
              <p className="text-sm text-stone-600 mt-1 pr-6 md:hidden">
                {project.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-0">
            {/* Hidden on mobile, visible on larger screens */}
            <p className="text-stone-600 max-w-md hidden md:block">
              {project.description}
            </p>
            
            {/* Optimized logo image */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:opacity-100 transition-opacity">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={getRevealCoverImage(project.title)}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  sizes="(max-width: 768px) 40px, 48px"
                  className="object-cover"
                  priority={index < 2} // Only prioritize first two images
                  quality={75}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
