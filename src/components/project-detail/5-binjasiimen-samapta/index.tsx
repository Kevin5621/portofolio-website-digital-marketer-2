'use client';

import { useState, useRef, useEffect } from 'react';
import { brandData } from './data';
import './binjasiimen.css';

// Import modular section components
import { IntroSection } from './section/1-intro';
import { ExpertiseSection } from './section/2-expertise';
import { StrategySection } from './section/3-strategy';
import { ApproachSection } from './section/5-approach';
import { GallerySection } from './section/6-gallery';
import { VideoShowcaseSection } from './section/7-video-showcase';
import { NextProjectSection } from './section/8-next-project';
import ReactLenis from 'lenis/react';
import { ResultsSection } from './section/4-results';

export default function Binjasiimen() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragThreshold] = useState(50);
  const coverflowRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionTitles = ["Intro", "Expertise", "Strategy", "Results", "Approach", "Gallery", "Video", "Next"];
  const projects = brandData.projects;
  const [nextProjectHovered, setNextProjectHovered] = useState(false);
  const medianIndex = Math.floor(projects.length / 2);
  const [activeSlide, setActiveSlide] = useState(medianIndex);
  
  // Track which sections have been viewed
  const [sectionViewed, setSectionViewed] = useState<boolean[]>(
    Array(sectionTitles.length).fill(false)
  );
  
  // Handle mouse drag events
  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const dragDistance = currentX - startX;
    
    // If dragged far enough, change slide
    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0 && activeSlide > 0) {
        // Dragged right, go to previous slide
        handleSlideChange(activeSlide - 1);
      } else if (dragDistance < 0 && activeSlide < projects.length - 1) {
        // Dragged left, go to next slide
        handleSlideChange(activeSlide + 1);
      }
    }
    
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
    
    // Prevent page scrolling when dragging
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Change slide function (improved to handle drag)
  const handleSlideChange = (index: number) => {
    // Ensure index is within bounds
    const newIndex = Math.max(0, Math.min(index, projects.length - 1));
    setActiveSlide(newIndex);
  };

  // Handle direct click on an item (avoid triggering on drag end)
  const handleSlideClick = (index: number) => {
    if (Math.abs(currentX - startX) < 10) { // Only treat as click if barely moved
      handleSlideChange(index);
    }
  };

  useEffect(() => {
    if (!isDragging || !coverflowRef.current) return;
    
    // Store ref value to avoid cleanup issues
    const currentRef = coverflowRef.current;
    const dragOffset = (currentX - startX) / 4; // Reduced effect for smoother feel
    currentRef.style.transform = `translateX(${dragOffset}px)`;
    
    return () => {
      // Use captured ref value in cleanup
      if (currentRef) {
        currentRef.style.transform = '';
      }
    };
  }, [isDragging, currentX, startX]);

  // Function to register section refs
  const registerSection = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  // Scroll to first section when component mounts
  useEffect(() => {
    // Reset navigation to the first section on mount
    if (sectionsRef.current[0]) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
    
    // Mark first section as viewed
    setSectionViewed(prev => {
      const newState = [...prev];
      newState[0] = true;
      return newState;
    });
    
    // Set current section to intro
    setCurrentSection(0);
  }, []);

  // Intersection Observer setup to detect when sections are in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
  
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionIndex = sectionsRef.current.findIndex(section => section === entry.target);
        
        if (entry.isIntersecting && sectionIndex !== -1) {
          // Update current section for nav highlight
          setCurrentSection(sectionIndex);
  
          // Mark section as viewed
          setSectionViewed(prev => {
            const newState = [...prev];
            newState[sectionIndex] = true;
            return newState;
          });
        }
      });
    }, observerOptions);
  
    // Save current refs to local variable
    const sections = sectionsRef.current;
  
    // Register all sections with the observer
    sections.forEach(section => {
      if (section) sectionObserver.observe(section);
    });
  
    // Cleanup
    return () => {
      sections.forEach(section => {
        if (section) sectionObserver.unobserve(section);
      });
    };
  }, []);  
  
  // Function to navigate to a specific section
  const navigateToSection = (index: number) => {
    if (sectionsRef.current[index]) {
      const section = sectionsRef.current[index];
      const targetPosition = section!.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let startTime: number | null = null;
  
      const easeInOutQuad = (t: number) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
  
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollProgress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(scrollProgress);
        window.scrollTo(0, startPosition + distance * ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
  
      requestAnimationFrame(animation);
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="bg-stone-50 text-stone-900 font-sans overflow-hidden">
        {/* Fixed side navigation - Vertical line with dots */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="relative h-96">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-stone-300"></div>
            {sectionTitles.map((title, i) => (
              <button 
                key={i}
                onClick={() => navigateToSection(i)}
                className={`absolute left-0 group flex items-center transition-all duration-300 ease-in-out`}
                style={{ top: `${(i / (sectionTitles.length - 1)) * 100}%` }}
              >
                <div className={`w-4 h-4 rounded-full border ${
                  currentSection === i ? 'bg-red-500 border-red-500' : 'bg-white border-stone-300'
                } transition-all duration-300`}></div>
                <span className={`ml-4 text-xs font-medium uppercase tracking-widest ${
                  currentSection === i ? 'text-red-500' : 'text-stone-400'
                } transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0`}>
                  {title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Render all modular section components */}
        <IntroSection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
          navigateToSection={navigateToSection}
        />
        
        <ExpertiseSection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
        />
        
        <StrategySection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
        />
        
        <ResultsSection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
        />
        
        <ApproachSection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
        />
        
        <GallerySection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
          isDragging={isDragging}
          handleDragStart={handleDragStart}
          handleDragMove={handleDragMove}
          handleDragEnd={handleDragEnd}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          handleSlideClick={handleSlideClick}
          activeSlide={activeSlide}
          coverflowRef={coverflowRef as React.RefObject<HTMLDivElement>}
        />
        
        <VideoShowcaseSection 
          brandData={brandData}
          sectionViewed={sectionViewed}
          registerSection={registerSection}
        />
        
        <NextProjectSection 
          sectionViewed={sectionViewed}
          registerSection={registerSection}
          nextProjectHovered={nextProjectHovered}
          setNextProjectHovered={setNextProjectHovered}
        />
      </div>
    </ReactLenis>
  );
}