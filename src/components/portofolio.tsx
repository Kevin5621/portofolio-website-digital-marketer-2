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
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const slidesContainer = slidesRef.current;
    
    if (!container || !slidesContainer) return;
    
    // Handle wheel event for horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Update current slide with boundaries
      setCurrentSlide(prev => {
        const next = prev + direction;
        return Math.max(0, Math.min(projects.length - 1, next));
      });
    };

    // Apply wheel event listener to container
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Update slide position when currentSlide changes
  useEffect(() => {
    const slidesContainer = slidesRef.current;
    if (!slidesContainer) return;
    
    const slideWidth = window.innerWidth;
    const translateX = -currentSlide * slideWidth;
    
    slidesContainer.style.transform = `translateX(${translateX}px)`;
  }, [currentSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Fixed height container */}
      <div ref={containerRef} className="relative w-full h-screen">
        {/* Slides container */}
        <div 
          ref={slidesRef}
          className="absolute top-0 left-0 w-full h-screen flex will-change-transform"
          style={{ transition: 'transform 0.5s ease-out' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="relative w-screen h-screen flex-shrink-0"
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <h2 className="text-[8vw] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
        
        {/* Navigation indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        body {
          overflow: hidden;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}