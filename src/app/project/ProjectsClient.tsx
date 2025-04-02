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

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [, setHoveredLetter] = useState<number | null>(null);
  
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
        
        {/* Preloaded and visible reveal images remain the same */}
        {preloadedRevealImages}
        
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
        
        {/* BOLD EXPERIMENTAL Header */}
        <section className="pt-36 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Number indicator */}
            <motion.div 
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }
              }}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{projects.length}</span>
                </div>
                <div className="ml-4 hidden md:block">
                  <span className="text-primary uppercase tracking-widest">Projects</span>
                  <span className="block text-xs text-stone-500 mt-1">Showcase</span>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="relative w-32 h-8">
                  <motion.div 
                    className="absolute inset-0 bg-primary"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ 
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center text-white font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: {
                        delay: 0.5,
                        duration: 0.5
                      }
                    }}
                  >
                    PORTFOLIO
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Rest of your existing UI code... */}
            {/* Experimental title with interactive letters */}
            <div className="relative">
              {/* Background decorative element */}
              <motion.div 
                className="absolute -left-8 md:-left-16 top-1/4 w-16 h-16 md:w-32 md:h-32 rounded-full border-8 border-black bg-transparent opacity-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: 0.1,
                  transition: {
                    duration: 1.2,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }}
              />
              
              <motion.div 
                className="relative z-10 flex flex-col md:flex-row items-start md:items-end"
                initial="hidden"
                animate="visible"
                variants={headingVariants}
              >
                {/* MY text with interactive letters */}
                <motion.div className="overflow-hidden">
                  <motion.div
                    className="flex items-center"
                    initial={{ y: 60 }}
                    animate={{ 
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }
                    }}
                  >
                    {['M', 'Y'].map((letter, index) => (
                      <motion.span
                        key={`my-${index}`}
                        className="text-[12vw] md:text-[14vw] font-bold text-black leading-none tracking-tighter inline-block"
                        onMouseEnter={() => setHoveredLetter(index)}
                        onMouseLeave={() => setHoveredLetter(null)}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ 
                          y: 0, 
                          opacity: 1,
                          transition: {
                            duration: 0.7,
                            delay: index * 0.15,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }
                        }}
                        whileHover={{
                          y: -10,
                          color: '#6676a3',
                          transition: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
                
                {/* Vertical line separator - only on medium screens and up */}
                <motion.div 
                  className="hidden md:block h-24 w-1 bg-black mx-6 mb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 100,
                    opacity: 0.6,
                    transition: {
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }
                  }}
                />
                
                {/* WORK. text with dot */}
                <motion.div className="overflow-hidden relative">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }
                    }}
                  >
                    {['W', 'O', 'R', 'K', '.'].map((letter, index) => (
                      <motion.span
                        key={`work-${index}`}
                        className="text-[12vw] md:text-[14vw] font-bold text-black leading-none tracking-tighter inline-block"
                        onMouseEnter={() => setHoveredLetter(index + 2)}
                        onMouseLeave={() => setHoveredLetter(null)}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ 
                          y: 0, 
                          opacity: 1,
                          transition: {
                            duration: 0.7,
                            delay: (index + 2) * 0.15, // Continue the sequence after "MY"
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }
                        }}
                        whileHover={{
                          y: -10,
                          color: '#6676a3',
                          transition: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  {/* Animated dot */}
                  <motion.div
                    className="absolute -right-3 -bottom-3 w-6 h-6 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      transition: {
                        duration: 0.8,
                        delay: 0.8,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Description section with diagonal element */}
            <div className="mt-12 md:mt-16 relative">
              <div className="md:pl-32">
                <motion.p 
                  className="text-lg text-stone-600 max-w-lg font-light leading-relaxed relative"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.6,
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                >
                  <motion.span 
                    className="absolute -left-6 top-0 text-xl font-bold opacity-40"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 0.4,
                      x: 0,
                      transition: {
                        delay: 0.7,
                        duration: 0.5
                      }
                    }}
                  >
                    &quot;
                  </motion.span>
                  Explore our portfolio of creative work across various industries. Each project represents our commitment to excellence and innovative solutions.
                </motion.p>
              </div>
            </div>
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