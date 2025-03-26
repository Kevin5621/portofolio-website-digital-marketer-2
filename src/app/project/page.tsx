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
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Preload project images after main content is rendered
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100); // Small delay to ensure main content renders first
    
    return () => clearTimeout(timer);
  }, []);
  
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

  // Preload all reveal images
  const preloadedRevealImages = isPageLoaded ? (
    <div className="hidden">
      {projects.map((project, index) => (
        <RevealImage
          key={`preload-reveal-${index}`}
          isVisible={false}
          imageSrc={project.image}
          imageAlt={project.title}
          initialScale={0.8}
          finalScale={1}
          width="340px"
          height="240px"
          transitionDuration={0.4}
          className="shadow-lg"
        />
      ))}
    </div>
  ) : null;

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier easing
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0.4 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.99] // Custom easing for smoother animation
      }
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <main className="min-h-screen bg-white overflow-hidden">
        <Navbar variant="dark" />
        
        {/* Hidden preloaded reveal images */}
        {preloadedRevealImages}
        
        {/* Visible reveal image when active */}
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
              initial="hidden"
              animate="visible"
              variants={headingVariants}
              className="relative"
            >
              <motion.h1 
                className="text-[8vw] md:text-[10vw] font-bold text-black leading-none tracking-tighter overflow-hidden"
              >
                <motion.span 
                  className="block"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }
                  }}
                >
                  MY
                </motion.span>
                <motion.span 
                  className="block -mt-4"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }
                  }}
                >
                  WORK.
                </motion.span>
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-lg text-stone-600 max-w-lg font-light leading-relaxed"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
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
            transition={{ 
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className="px-8 pb-24"
            onAnimationComplete={() => setIsPageLoaded(true)}
          >
            <div className="max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <ListProjectItem 
                  key={`list-${project.title}`}
                  project={project}
                  index={index}
                  onHover={() => setActiveProject(index)}
                  onLeave={() => setActiveProject(null)}
                  isPageLoaded={isPageLoaded}
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
  onLeave,
  isPageLoaded
}: { 
  project: Project; 
  index: number; 
  onHover: () => void; 
  onLeave: () => void;
  isPageLoaded: boolean;
}) => {
  const [, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  
  // Map the project title to the appropriate reveal cover image
  const getRevealCoverImage = (title: string) => {
    switch(title) {
      case 'Binjasiimen Samapta':
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
  
  // Text animation variants
  const titleVariants = {
    initial: { x: 0 },
    hover: { 
      x: 8,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier easing for smooth animation
      }
    }
  };
  
  const numberVariants = {
    initial: { color: 'rgba(0, 0, 0, 0.2)' },
    hover: { 
      color: 'rgba(0, 0, 0, 1)',
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y: translateY }}
      className="border-b border-gray-200 group"
      initial={{ y: 50, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: index * 0.1, // Stagger the entrance of each item
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }}
    >
      <Link href={project.route}>
        <div 
          className="py-6 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between relative"
          onMouseEnter={() => {
            setIsHovered(true);
            onHover();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            onLeave();
          }}
        >
          {/* Invisible overlay for expanded hitbox */}
          <div className="absolute inset-0 w-full h-full cursor-pointer z-10"></div>
          
          <div className="flex items-center gap-4 md:gap-6 relative z-20">
            <motion.div 
              className="text-3xl md:text-5xl font-bold"
              variants={numberVariants}
              initial="initial"
              whileHover="hover"
            >
              {(index + 1).toString().padStart(2, '0')}
            </motion.div>
            <div>
              <motion.h2 
                className="text-xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight"
                variants={titleVariants}
                initial="initial"
                whileHover="hover"
              >
                {project.title}
              </motion.h2>
              {/* Show description on mobile */}
              <motion.p 
                className="text-sm text-stone-600 mt-1 pr-6 md:hidden"
                initial={{ opacity: 0.6 }}
                whileHover={{ 
                  opacity: 1,
                  transition: { 
                    duration: 0.4, 
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }
                }}
              >
                {project.description}
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-0 relative z-20">
            {/* Hidden on mobile, visible on larger screens */}
            <motion.p 
              className="text-stone-600 max-w-md hidden md:block"
              initial={{ opacity: 0.7 }}
              whileHover={{ 
                opacity: 1,
                transition: { 
                  duration: 0.4, 
                  ease: [0.25, 0.1, 0.25, 1.0]
                }
              }}
            >
              {project.description}
            </motion.p>
            
            {/* Optimized logo image */}
            <motion.div 
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  duration: 0.4, 
                  ease: [0.34, 1.56, 0.64, 1] // Spring-like easing
                }
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={getRevealCoverImage(project.title)}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  sizes="(max-width: 768px) 40px, 48px"
                  className="object-cover"
                  priority={isPageLoaded || index < 2} // Prioritize all images once page is loaded
                  quality={75}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};