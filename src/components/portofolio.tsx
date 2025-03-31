'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RevealImage } from './hooks/RevealImage';
import { projects } from '../data/projects-portofolio';
import { ContactPage } from './ContactPage';

export interface ProjectData {
  title: string;
  image: string;
  revealImage: string;
  route: string;
}

export function Portfolio() {
  const router = useRouter();
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
  
  // Setup intersection observer
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
    
    const sectionHeight = window.innerHeight * (projects.length + 2);
    setTotalScrollHeight(sectionHeight);
    
    sectionRef.current.style.height = `${sectionHeight}px`;
  }, []);
  
  // Handle scroll behavior
  useEffect(() => {
    if (!slidesRef.current || !containerRef.current || !sectionRef.current) return;
    
    const handleScroll = () => {
      if (!isInView || !sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - viewportHeight)));
      
      const totalSlides = projects.length + 1;
      const targetSlide = Math.min(
        totalSlides - 1,
        Math.floor(scrollProgress * totalSlides)
      );
      
      if (targetSlide !== currentSlide) {
        setCurrentSlide(targetSlide);
        
        // Hide the RevealImage when on contact slide
        if (targetSlide === projects.length) {
          setHoveredProject(null);
        }
      }
      
      const slideWidth = window.innerWidth;
      const exactProgress = scrollProgress * (totalSlides - 1);
      const translateX = -exactProgress * slideWidth;
      
      slidesRef.current!.style.transform = `translateX(${translateX}px)`;
      
      if (!slidesRef.current || !containerRef.current || !sectionRef.current) return;
      
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
    if (index < projects.length) {
      router.push(projects[index].route);
    }
  }, [router]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full"
      style={{ height: `${totalScrollHeight}px` }}
      onMouseLeave={handleMouseLeave}
      data-portfolio="true"
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
          {/* Project slides */}
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
            </div>
          ))}

          <ContactPage />
        </div>
        
        <RevealImage 
          isVisible={hoveredProject !== null && currentSlide < projects.length}
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