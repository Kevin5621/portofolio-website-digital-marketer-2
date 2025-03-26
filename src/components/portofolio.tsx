'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RevealImage } from './hooks/RevealImage';

interface ProjectData {
  title: string;
  image: string;
  revealImage: string;
  route: string; // Add route property for navigation
}

const projects: ProjectData[] = [
  { 
    title: 'Binjasiimen Samapta', 
    image: '/project/cover5.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover5.png',
    route: '/project/binjasiimen-samapta'
  },
  { 
    title: 'Ortist Specialist', 
    image: '/project/cover2.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover2.png',
    route: '/project/ortist'
  },
  { 
    title: 'Kronju', 
    image: '/project/cover1.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover1.png',
    route: '/project/kronju'
  },
  { 
    title: 'Rumah Bahasa Asing', 
    image: '/project/cover3.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover3.png',
    route: '/project/rumah-bahasa-asing'
  },
];

export function Portfolio() {
  const router = useRouter(); // Add router for navigation
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [totalScrollHeight, setTotalScrollHeight] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [, setOpacity] = useState(0);
  const [, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Setup intersection observer to detect when portfolio section is in view
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Calculate scroll heights
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Set section height based on number of projects
    const sectionHeight = window.innerHeight * (projects.length + 1);
    setTotalScrollHeight(sectionHeight);
    
    // Update section height
    sectionRef.current.style.height = `${sectionHeight}px`;
  }, []);
  
  // Handle scroll behavior
  useEffect(() => {
    if (!slidesRef.current || !containerRef.current || !sectionRef.current) return;
    
    const handleScroll = () => {
      if (!isInView || !sectionRef.current) return;
      
      // Get section position
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress through section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - viewportHeight)));
      
      // Calculate which slide we should be on
      const targetSlide = Math.min(
        projects.length - 1,
        Math.floor(scrollProgress * projects.length)
      );
      
      // Update current slide if needed
      if (targetSlide !== currentSlide) {
        setCurrentSlide(targetSlide);
      }
      
      // Calculate smooth transition between slides
      const slideWidth = window.innerWidth;
      const exactProgress = scrollProgress * (projects.length - 1);
      const translateX = -exactProgress * slideWidth;
      
      // Apply transform to slides container
      slidesRef.current!.style.transform = `translateX(${translateX}px)`;
      
      if (!slidesRef.current || !containerRef.current || !sectionRef.current) return;
      
      // Add parallax effect to titles
      const titles = document.querySelectorAll('.project-title');
      titles.forEach((title, index) => {
        const titleEl = title as HTMLElement;
        const distanceFromCurrent = exactProgress - index;
        
        // Apply parallax movement
        titleEl.style.transform = `translateX(${-distanceFromCurrent * 200}px)`;
        
        // Fade titles in/out based on current position
        const opacityValue = 1 - Math.min(1, Math.abs(distanceFromCurrent) * 2);
        titleEl.style.opacity = opacityValue.toString();
      });
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set positions
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSlide, isInView]);

  // Handle project hover
  const handleImageHover = useCallback((index: number) => {
    setHoveredProject(index);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 50);
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
    }, 300);
  }, []);

  // Handle project click for navigation
  const handleProjectClick = useCallback((index: number) => {
    router.push(projects[index].route);
  }, [router]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full"
      style={{ height: `${totalScrollHeight}px` }}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef} 
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div 
          ref={slidesRef}
          className="absolute top-0 left-0 w-full h-screen flex will-change-transform"
          style={{ transition: 'transform 0.05s ease-out' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="relative w-screen h-screen flex-shrink-0 cursor-pointer"
              onMouseEnter={() => handleImageHover(index)}
              onClick={() => handleProjectClick(index)}
            >
              {/* Project title overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <h2 className={`project-title text-[8vw] font-bold ${hoveredProject === index ? 'mix-blend-difference z-20 text-gray-300' : 'text-white'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                  {project.title}
                </h2>
              </div>
              
              {/* Base image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index < 2}
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </div>
              
              {/* Bottom line indicator */}
              <div
                className="h-[2px] bg-white absolute bottom-0 left-0 transition-all duration-300 ease-linear"
                style={{
                  width: hoveredProject === index ? '100%' : '0'
                }}
              />
            </div>
          ))}
        </div>
        
        <RevealImage 
          isVisible={hoveredProject !== null}
          imageSrc={hoveredProject !== null ? projects[hoveredProject].revealImage : ''}
          imageAlt={hoveredProject !== null ? `${projects[hoveredProject].title} Reveal` : ''}
          initialScale={0.5}
          finalScale={1}
          width="200px"
          height="200px"
          transitionDuration={0.3}
        />
      </div>
    </section>
  );
}