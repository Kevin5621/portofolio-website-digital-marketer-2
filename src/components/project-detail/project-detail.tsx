'use client';

import { useState, useRef, useEffect } from 'react';
import { getProjectData } from './data';
import { BrandData } from './common/types';
import './common/styles.css';

// Import modular section components
import { IntroSection } from './common/sections/intro';
import { NextProjectSection } from './common/sections/next-project';
import ReactLenis from 'lenis/react';
import { ExpertiseSection } from './common/sections/expertise';
import { StrategySection } from './common/sections/strategy';
import { ResultsSection } from './common/sections/results';
import { ApproachSection } from './common/sections/approach';
import { VideoShowcaseSection } from './common/sections/video-showcase';
import { GallerySection } from './common/sections/gallery';

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  // Get project data based on ID
  const brandData = getProjectData(projectId) as BrandData;
  
  // Move all hooks before any conditional returns
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragThreshold] = useState(50);
  const coverflowRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionTitles = ["Intro", "Expertise", "Strategy", "Results", "Approach", "Gallery", "Video", "Next"];
  const [nextProjectHovered, setNextProjectHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // Will be set properly if brandData exists
  const [sectionViewed, setSectionViewed] = useState<boolean[]>(
    Array(sectionTitles.length).fill(false)
  );
  
  // Move all useEffect hooks before conditional return
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
  }, []);

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Find the current section based on scroll position
      let newCurrentSection = 0;
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            newCurrentSection = index;
            
            // Mark this section and all previous sections as viewed
            setSectionViewed(prev => {
              const newState = [...prev];
              for (let i = 0; i <= index; i++) {
                newState[i] = true;
              }
              return newState;
            });
          }
        }
      });
      
      setCurrentSection(newCurrentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // If project not found, show error or redirect
  if (!brandData) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  // Now we can safely use brandData
  const projects = brandData.projects;
  const medianIndex = Math.floor(projects.length / 2);
  
  // Update activeSlide based on medianIndex if it's the initial render
  if (activeSlide === 0 && medianIndex > 0) {
    setActiveSlide(medianIndex);
  }
  
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

  // Function to register section refs
  const registerSection = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  // Function to navigate to a specific section
  const navigateToSection = (index: number) => {
    if (sectionsRef.current[index]) {
      const sectionTop = sectionsRef.current[index]?.offsetTop || 0;
      window.scrollTo({
        top: sectionTop - 50, // Offset for header
        behavior: 'smooth'
      });
    }
  };

  return (
    <ReactLenis root>
      <div className="relative">
        {/* Fixed navigation dots */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="flex flex-col items-center space-y-4">
            {sectionTitles.map((title, index) => (
              <button
                key={index}
                onClick={() => navigateToSection(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? `bg-${brandData.primaryColor}-500 scale-125` 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Navigate to ${title} section`}
              />
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <main>
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
            activeSlide={activeSlide}
            handleDragStart={handleDragStart}
            handleDragMove={handleDragMove}
            handleDragEnd={handleDragEnd}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            handleSlideClick={handleSlideClick}
            coverflowRef={coverflowRef}
          />
          
          <VideoShowcaseSection 
            brandData={brandData} 
            sectionViewed={sectionViewed} 
            registerSection={registerSection}
          />
          
          <NextProjectSection 
            brandData={brandData}
            sectionViewed={sectionViewed} 
            registerSection={registerSection}
            nextProjectHovered={nextProjectHovered}
            setNextProjectHovered={setNextProjectHovered}
          />
        </main>
      </div>
    </ReactLenis>
  );
}