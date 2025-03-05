'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectData {
  title: string;
  image: string;
  revealImage: string;
  route: string; // Add route property for navigation
}

const projects: ProjectData[] = [
  { 
    title: 'Kronju', 
    image: '/project/cover1.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover1.png',
    route: '/project/1-kronju'
  },
  { 
    title: 'Ortist Specialist', 
    image: '/project/cover2.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover2.png',
    route: '/project/2-ortist-specialist'
  },
  { 
    title: 'Rumah Bahasa Asing', 
    image: '/project/cover3.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover3.png',
    route: '/project/3-rumah-bahasa-asing'
  },
  { 
    title: 'Aerospace', 
    image: '/project/cover4.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover4.png',
    route: '/project/4-aerospace'
  },
  { 
    title: 'Benjasimen Samapta', 
    image: '/project/cover5.jpg', 
    revealImage: '/project/reveal-cover/reveal-cover5.png',
    route: '/project/5-benjasimen-samapta'
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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  
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

  // Mouse movement handling with easing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;

    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    
    // Initialize cursor position to avoid jumpy start
    prevCursorPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove]);

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
        
        {/* Floating reveal image that follows cursor */}
        {hoveredProject !== null && (
          <div
            className="fixed pointer-events-none z-20"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
              width: '200px',
              height: '200px',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <Image
              src={projects[hoveredProject].revealImage}
              alt={`${projects[hoveredProject].title} Reveal`}
              className="w-full h-full object-cover rounded-lg"
              fill
            />
          </div>
        )}
      </div>
    </section>
  );
}