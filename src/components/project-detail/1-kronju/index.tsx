'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { brandData } from './data';
import './kronju.css';
import CountUp from 'react-countup';
import { Project } from './types';
import ReactLenis from 'lenis/react';
import { RevealImage } from '@/components/hooks/RevealImage';
import { useRouter } from 'next/navigation';

export default function Kronju() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragThreshold] = useState(50);
  const coverflowRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionTitles = ["Intro", "Expertise", "Strategy", "Results", "Approach", "Gallery", "Next"];
  const projects = brandData.projects as Project[];
  const medianIndex = Math.floor(projects.length / 2);
  const [activeSlide, setActiveSlide] = useState(medianIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [bottomImageHovered, setBottomImageHovered] = useState(false);
  const [nextProjectHovered, setNextProjectHovered] = useState(false);
  
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
      } else if (dragDistance < 0 && activeSlide < (brandData.projects as Project[]).length - 1) {
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
    const newIndex = Math.max(0, Math.min(index, (brandData.projects as Project[]).length - 1));
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
  
    // Simpan referensi saat ini ke variabel lokal
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
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset;
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
                  currentSection === i ? 'bg-amber-500 border-amber-500' : 'bg-white border-stone-300'
                } transition-all duration-300`}></div>
                <span className={`ml-4 text-xs font-medium uppercase tracking-widest ${
                  currentSection === i ? 'text-amber-500' : 'text-stone-400'
                } transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0`}>
                  {title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Intro Section - Asymmetric Split */}
        <section 
          ref={(el) => registerSection(el as HTMLDivElement | null, 0)} 
          className="min-h-screen flex flex-col relative"
          id="intro-section"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
            {/* Left Side Content */}
            <div className={`md:col-span-5 flex items-center p-8 md:pl-24 md:pr-12 relative transition-all duration-1000 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-8 max-w-md">
                <div className="space-y-4">
                  <div className={`inline-block py-1 px-2 border border-amber-500 text-amber-500 text-xs uppercase tracking-widest transition-all duration-700 delay-300 ${sectionViewed[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    Digital Marketing Campaign
                  </div>
                  
                  <h1 className={`text-6xl md:text-7xl font-light text-stone-900 leading-none transition-all duration-700 delay-500 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="block">{brandData.name}</span>
                    <span className="relative inline-block">
                      <span className={`block absolute -bottom-2 left-0 w-16 h-1 bg-amber-500 transition-all duration-700 delay-700 ${sectionViewed[0] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                    </span>
                  </h1>
                  
                  <p className={`text-sm text-stone-500 uppercase tracking-widest transition-all duration-700 delay-700 ${sectionViewed[0] ? 'opacity-100' : 'opacity-0'}`}>
                    {brandData.timeframe}
                  </p>
                </div>
                
                <p className={`text-stone-600 font-light leading-relaxed transition-all duration-700 delay-900 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {brandData.description}
                </p>
                
                <div className={`pt-6 transition-all duration-700 delay-1000 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button 
                    className="group relative inline-flex items-center text-sm font-medium uppercase tracking-widest"
                    onClick={() => navigateToSection(1)}
                  >
                    <span className="text-stone-900 group-hover:text-amber-500 transition-colors duration-300">View Case Study</span>
                    <span className="ml-3 w-8 h-px bg-stone-900 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-300"></span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Asymmetric Grid */}
            <div className="md:col-span-7 grid grid-cols-12 grid-rows-6 h-screen">
              <div 
                className={`col-span-12 row-span-4 relative bg-stone-200 transition-all duration-1000 overflow-hidden ${sectionViewed[0] ? 'opacity-100' : 'opacity-0'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="h-full w-full relative overflow-hidden">
                  <Image
                    src="/project/cover1.jpg"
                    alt="Kronju Hero"
                    fill
                    className={`object-cover object-center transition-transform duration-1500 ${sectionViewed[0] ? 'scale-100' : 'scale-110'}`}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-amber-500 mix-blend-multiply opacity-10"></div>
                </div>
                
                {/* Reveal image on hover */}
                <RevealImage 
                  isVisible={isHovered}
                  imageSrc="/project/reveal-cover/reveal-cover1.png"
                  imageAlt="Kronju Hero Reveal"
                  initialScale={0.5}
                  finalScale={1}
                  width="200px"
                  height="200px"
                  transitionDuration={0.3}
                  className="z-50"
                />
              </div>
              <div className={`col-span-6 row-span-2 relative bg-amber-500 transition-all duration-700 delay-300 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="h-full w-full flex items-center justify-center">
                  <div className="font-light text-white text-3xl tracking-widest">{brandData.name}</div>
                </div>
              </div>
              <div 
                className={`col-span-6 row-span-2 relative bg-stone-800 transition-all duration-700 delay-500 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} cursor-pointer`}
                onMouseEnter={() => setBottomImageHovered(true)}
                onMouseLeave={() => setBottomImageHovered(false)}
                onClick={() => router.push('/project/rumah-bahasa-asing')}
              >
                <div className="h-full w-full relative overflow-hidden">
                  <Image
                    src="/project/cover3.jpg"
                    alt="RBA Product"
                    fill
                    className={`object-cover transition-all duration-500 ${bottomImageHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`}
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Minimal scroll indicator */}
          <div className={`absolute bottom-8 right-8 flex items-center text-stone-500 text-xs uppercase tracking-widest transition-all duration-700 delay-1200 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="mr-2">Scroll</span>
            <div className="w-8 h-px bg-stone-300"></div>
          </div>
        </section>

        {/* Expertise Section - Grid Layout with Hover Effects */}
        <section ref={(el) => registerSection(el as HTMLDivElement | null, 1)} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Expertise</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                  Skills Applied
                  <span className={`block absolute -bottom-2 left-0 h-px bg-amber-500 transition-all duration-700 delay-300 ${sectionViewed[1] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </h2>
              </div>
              <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Applying cutting-edge digital marketing methodologies with precise profesional execution to deliver exceptional campaign outcomes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5">
              {brandData.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`relative transition-all duration-700 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className={`absolute inset-0 bg-amber-500 transition-all duration-0 ${hoveredSkill === index ? 'opacity-100' : 'opacity-0'}`}></div>
                  <div className="relative border border-stone-200 h-32 p-6 flex items-center justify-center overflow-hidden transition-colors duration-0">
                    <span className={`text-sm font-medium uppercase tracking-wider text-center z-10 transition-colors duration-0 ${hoveredSkill === index ? 'text-white' : 'text-stone-800'}`}>
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section - Numbered Cards with Clean Lines */}
        <section ref={(el) => registerSection(el as HTMLDivElement | null, 2)} className="py-24 px-6 bg-stone-100">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Methodology</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                  Campaign Strategy
                  <span className={`block absolute -bottom-2 left-0 h-px bg-amber-500 transition-all duration-700 delay-300 ${sectionViewed[2] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </h2>
              </div>
              <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {brandData.campaignStrategy}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
              {brandData.objectives.map((objective, index) => (
                <div 
                  key={index} 
                  className={`group relative bg-white transition-all duration-700 ${sectionViewed[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${400 + (index * 150)}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-stone-200 transition-all duration-300 group-hover:bg-amber-500"></div>
                  <div className="absolute top-0 right-0 w-px h-full bg-stone-200 transition-all duration-300 group-hover:bg-amber-500"></div>
                  <div className="absolute bottom-0 right-0 w-full h-px bg-stone-200 transition-all duration-300 group-hover:bg-amber-500"></div>
                  <div className="absolute bottom-0 left-0 w-px h-full bg-stone-200 transition-all duration-300 group-hover:bg-amber-500"></div>
                  
                  <div className="p-8 flex flex-col h-full min-h-64">
                    <div className="text-5xl font-light text-stone-200 mb-6 transition-colors duration-300 group-hover:text-amber-200">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <p className="text-stone-700 font-light transition-colors duration-300 group-hover:text-stone-900">
                      {objective}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section - Elegant Metrics Display with Number Counting */}
        <section ref={(el) => registerSection(el as HTMLDivElement | null, 3)} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Impact</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                  Campaign Results
                  <span className={`block absolute -bottom-2 left-0 h-px bg-amber-500 transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </h2>
              </div>
              <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Precise, measurable outcomes achieved through strategic implementation and rigorous analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-16">
              {brandData.achievements.map((item, index) => (
                <div
                  key={index}
                  className={`group bg-white border border-stone-100 hover:border-amber-500 transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${4 + (index * 1)}ms` }}
                >
                  <div className="p-12 flex flex-col h-full min-h-64 justify-between">
                    <div className="text-5xl font-light text-stone-900 mb-6 transition-colors duration-300 group-hover:text-amber-500 flex items-center">
                      {sectionViewed[3] ? (
                        <>
                          <CountUp
                            start={0}
                            end={parseInt(item.metric.replace(/[^0-9]/g, ''))}
                            duration={2.5}
                            separator=","
                            suffix={item.metric.includes('%') ? '%' : (item.metric.includes('$') ? '$' : '')}
                            prefix={item.metric.includes('$') ? '$' : ''}
                            delay={0.5 + index * 0.2}
                          />
                          <svg className="w-6 h-6 ml-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : item.metric}
                    </div>
                    <div className="text-sm text-stone-600 uppercase tracking-widest">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`border-t border-stone-200 pt-16 transition-all duration-700 delay-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {brandData.results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-start transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${800 + (index * 100)}ms` }}
                  >
                    <div className="mr-6 w-8 h-8 flex-shrink-0 border border-stone-200 flex items-center justify-center text-sm text-stone-400 group-hover:border-amber-500 group-hover:text-amber-500 transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                    <p className="text-stone-600 font-light">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section - Minimal Split */}
        <section 
          ref={(el) => registerSection(el as HTMLDivElement | null, 4)} 
          className="min-h-screen flex flex-col md:flex-row bg-stone-100"
        >
        {/* Image Section - Left on desktop, Top on mobile */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative">
            <Image
              src="/project/project-detail/1-kronju/cover-produk.jpg"
              alt="Marketing Campaign Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority={false}
            />
            {/* Mobile overlay gradient for better text contrast when scrolling */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/30 md:hidden"></div>
          </div>

          {/* Text Section - Responsive (full width on mobile, half width on desktop) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-12 md:py-0">
            <p className={`text-amber-500 uppercase tracking-widest mb-3 text-sm transition-all `}>
              Method
            </p>
            
            {/* Using title from brandData with animation */}
            <h2 className={`text-3xl md:text-4xl font-light text-stone-900 mb-6 relative transition-all `}>
              {brandData.marketingMethod.title}
              <span className="block absolute -bottom-2 left-0 h-px bg-amber-500 w-16"></span>
            </h2>

            {/* Using description from brandData with animation */}
            <p className={`text-stone-600 font-light leading-relaxed mb-12 transition-all `}>
              {brandData.marketingMethod.description}
            </p>

            {/* Mapping steps from brandData with staggered animations */}
            <div className="space-y-12">
              {brandData.marketingMethod.steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative pl-8 md:pl-12 transition-all `}
                  style={{ transitionDelay: `${300 + (index * 100)}ms` }}
                >
                  <div className="absolute left-0 top-0 w-4 md:w-6 h-px bg-amber-500"></div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">{step.title}</h3>
                  <p className="text-stone-600 font-light text-sm md:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section - Clean Horizontal Slider with */}
        <section ref={(el) => registerSection(el as HTMLDivElement | null, 5)} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Creative Work</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                  Design Gallery
                  <span className={`block absolute -bottom-2 left-0 h-px bg-amber-500 transition-all duration-700 delay-300 ${sectionViewed[5] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </h2>
              </div>
              <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Strategic visual assets developed with profesional precision for maximum impact across digital channels.
              </p>
            </div>
            
            {/* True Cover Flow Gallery with Drag Scrolling ands */}
            <div 
              className={`relative h-96 w-full perspective-1000 transition-all duration-1000 ${sectionViewed[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              
              <div className={`coverflow-container ${isDragging ? 'dragging' : ''}`} ref={coverflowRef}>
                {(() => {
                  // Calculate the median index
                  const projects = brandData.projects as Project[];
                  
                  return projects.map((project, index) => {
                    // Calculate the position based on the median initially
                    const position = index - activeSlide;
                    let zIndex = 10 - Math.abs(position);
                    
                    // Adjust spacing for better arrangement
                    const translateX = position * 160;
                    
                    // Invert the rotation direction to make cards face inward
                    // Negative value for cards on the right, positive for cards on the left
                    const maxRotation = 45;
                    const rotateY = position > 0 
                      ? -Math.min(position * 45, maxRotation) 
                      : Math.min(Math.abs(position) * 45, maxRotation);
                    
                    // Enhance the z-position to create more depth
                    const translateZ = position === 0 ? 150 : -Math.abs(position) * 20;
                    
                    // Adjust opacity for a more dramatic fade effect
                    let opacity = 1 - (Math.abs(position) * 0.25);
                    opacity = Math.max(opacity, 0.5);  // Keep minimum opacity at 0.5
                    
                    // Center item is facing front
                    if (position === 0) {
                      zIndex = 20;
                      opacity = 1;
                    }
                    
                    return (
                      <div 
                        key={index}
                        className="coverflow-item"
                        onClick={() => handleSlideClick(index)}
                        style={{
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                          zIndex,
                          opacity,
                          transition: `all 0.5s ${index * 0.1}s`, // Staggered
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={`Album cover ${index + 1}`}
                          width={240}
                          height={240}
                          className={`rounded shadow-lg transition-all duration-500 ${sectionViewed[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                          style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                          loading='lazy'
                        />
                      </div>
                    );
                  });
                })()}
              </div>
            
            </div>
          </div>
        </section>

      {/* next project */}
      <section 
        ref={(el) => registerSection(el as HTMLDivElement | null, 6)}
        className="min-h-screen flex items-center justify-center relative"
      >
        {/* Desktop background layout */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block bg-stone-100"></div>
          <div 
            className="relative cursor-pointer hidden md:block"
            onMouseEnter={() => setNextProjectHovered(true)}
            onMouseLeave={() => setNextProjectHovered(false)}
            onClick={() => router.push('/project/rumah-bahasa-asing')}
          >
            <div className="z-10 absolute inset-0 overflow-hidden">
              <Image
                src="/project/cover3.jpg"
                alt="Next Project"
                fill
                className={`object-cover object-center transition-all duration-1000`}
                priority
              />
              <div className={`absolute inset-0 bg-stone-900/20 transition-opacity duration-700 `}></div>
            </div>
            
            {/* Reveal image on hover */}
            <RevealImage 
              isVisible={nextProjectHovered}
              imageSrc="/project/reveal-cover/reveal-cover3.png"
              imageAlt="RBA"
              initialScale={0.5}
              finalScale={1}
              width="200px"
              height="200px"
              transitionDuration={0.3}
              className="z-50"
            />
          </div>
        </div>
        
        {/* Mobile background with overlay */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/project/cover3.jpg"
              alt="Next Project Background"
              fill
              className={`object-cover object-center transition-all duration-1000 `}
              priority
            />
            {/* Gradient overlay to make text readable */}
            <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20 transition-opacity duration-700`}></div>
          </div>
        </div>
        
        {/* Content container */}
        <div className="relative max-w-6xl w-full px-6 grid md:grid-cols-2 gap-24">
          <div className="flex flex-col justify-center md:order-1">
            <p className={`text-amber-500 md:text-amber-500 uppercase tracking-widest mb-3 text-sm transition-all duration-500 `}>Next Case</p>
            <h2 className={`text-4xl md:text-5xl font-light text-white md:text-stone-900 mb-6 md:mb-8 max-w-md transition-all duration-500 delay-100 `}>
              Discover Our Next Project
            </h2>
            <Link 
              href="/project/rumah-bahasa-asing" 
              className={`group inline-flex items-center text-sm font-medium uppercase tracking-widest transition-all duration-500 delay-200 `}
            >
              <span className="text-white md:text-stone-900 group-hover:text-amber-500 transition-colors duration-300">Rumah Bahasa Asing</span>
              <span className="ml-3 w-8 h-px bg-white md:bg-stone-900 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-300"></span>
            </Link>
          </div>
          
          {/* Mobile interactive element */}
          <div className="md:hidden flex justify-center items-center mt-8">
            <div 
              className={`relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/50 transition-all duration-500`}
              onMouseEnter={() => setNextProjectHovered(true)}
              onMouseLeave={() => setNextProjectHovered(false)}
              onClick={() => router.push('/project/rumah-bahasa-asing')}
            >
              <Image
                src="/project/reveal-cover/reveal-cover3.png"
                alt="RBA Project"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900/30 hover:bg-stone-900/10 transition-all duration-300">
                <span className="text-white text-xs font-medium uppercase tracking-wider">View</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </ReactLenis>
  );
}