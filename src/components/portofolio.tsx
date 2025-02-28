'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ProjectData {
  title: string;
  image: string;
}

const projects: ProjectData[] = [
  { title: 'Aerospace', image: '/project/cover1.jpg' },
  { title: 'Binjasimen Samapta', image: '/project/cover2.jpg' },
  { title: 'Kronju', image: '/project/cover3.jpg' },
  { title: 'Ortist Specialist', image: '/project/cover4.jpg' },
  { title: 'Rumah Bahasa Asing', image: '/project/cover5.jpg' },
  { title: 'Shinji Film', image: '/project/cover6.jpg' },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [totalScrollHeight, setTotalScrollHeight] = useState(0);
  
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

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full"
      style={{ height: `${totalScrollHeight}px` }}
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
              className="relative w-screen h-screen flex-shrink-0"
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <h2 className="project-title text-[8vw] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {project.title}
                </h2>
              </div>
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
        </div>
      </div>
    </section>
  );
}