'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { brandData } from './data';
import './kronju.css';

// Define proper types for the project items
interface Project {
  image: string;
  title?: string;
  description?: string;
}

export default function Kronju() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragThreshold] = useState(50);
  const coverflowRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const sectionTitles = ["Intro", "Expertise", "Strategy", "Results", "Approach", "Gallery", "Next"];
  const projects = brandData.projects as Project[];
  const medianIndex = Math.floor(projects.length / 2);
  const [activeSlide, setActiveSlide] = useState(medianIndex);
  
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
    
    const dragOffset = (currentX - startX) / 4; // Reduced effect for smoother feel
    coverflowRef.current.style.transform = `translateX(${dragOffset}px)`;
    
    return () => {
      if (coverflowRef.current) {
        coverflowRef.current.style.transform = '';
      }
    };
  }, [isDragging, currentX, startX]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Determine active section based on scroll position
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop - 300 && scrollY < sectionTop + sectionHeight - 300) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to register section refs
  const registerSection = (el: HTMLDivElement | null, index: number) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <div className="bg-stone-50 text-stone-900 font-sans overflow-hidden">
      {/* Fixed side navigation - Vertical line with dots */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="relative h-96">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-stone-300"></div>
          {sectionTitles.map((title, i) => (
            <button 
              key={i}
              onClick={() => {
                if (sectionsRef.current[i]) {
                  window.scrollTo({
                    top: sectionsRef.current[i].offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
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
      <section ref={(el) => registerSection(el, 0)} className="min-h-screen flex flex-col relative">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          {/* Left Side Content */}
          <div className="md:col-span-5 flex items-center p-8 md:pl-24 md:pr-12 relative">
            <div className="space-y-8 max-w-md">
              <div className="space-y-4">
                <div className="inline-block py-1 px-2 border border-amber-500 text-amber-500 text-xs uppercase tracking-widest">
                  Digital Marketing Campaign
                </div>
                
                <h1 className="text-6xl md:text-7xl font-light text-stone-900 leading-none">
                  <span className="block">{brandData.name}</span>
                  <span className="relative inline-block">
                    <span className="block absolute -bottom-2 left-0 w-16 h-1 bg-amber-500"></span>
                  </span>
                </h1>
                
                <p className="text-sm text-stone-500 uppercase tracking-widest">
                  {brandData.timeframe}
                </p>
              </div>
              
              <p className="text-stone-600 font-light leading-relaxed">
                A revolutionary digital marketing campaign for Kronju premium cheese snacks. Elevating brand presence across multiple digital channels with a bold, minimalist approach.
              </p>
              
              <div className="pt-6">
                <button className="group relative inline-flex items-center text-sm font-medium uppercase tracking-widest">
                  <span className="text-stone-900 group-hover:text-amber-500 transition-colors duration-300">View Case Study</span>
                  <span className="ml-3 w-8 h-px bg-stone-900 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-300"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Asymmetric Grid */}
          <div className="md:col-span-7 grid grid-cols-12 grid-rows-6 h-screen">
            <div className="col-span-12 row-span-4 relative bg-stone-200">
              <div className="h-full w-full relative overflow-hidden">
                <Image
                  src="/project/cover1.jpg"
                  alt="Kronju Hero"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-amber-500 mix-blend-multiply opacity-10"></div>
              </div>
            </div>
            <div className="col-span-6 row-span-2 relative bg-amber-500">
              <div className="h-full w-full flex items-center justify-center">
                <div className="font-light text-white text-3xl tracking-widest">KRONJU</div>
              </div>
            </div>
            <div className="col-span-6 row-span-2 relative bg-stone-800">
              <div className="h-full w-full relative overflow-hidden">
                <Image
                  src="/project/cover2.jpg"
                  alt="Kronju Product"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Minimal scroll indicator */}
        <div className="absolute bottom-8 right-8 flex items-center text-stone-500 text-xs uppercase tracking-widest">
          <span className="mr-2">Scroll</span>
          <div className="w-8 h-px bg-stone-300"></div>
        </div>
      </section>

      {/* Expertise Section - Grid Layout with Hover Effects */}
      <section ref={(el) => registerSection(el, 1)} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Expertise</p>
              <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                Skills Applied
                <span className="block absolute -bottom-2 left-0 w-16 h-px bg-amber-500"></span>
              </h2>
            </div>
            <p className="text-stone-600 font-light leading-relaxed md:col-span-6">
              Applying cutting-edge digital marketing methodologies with precise German execution to deliver exceptional campaign outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5">
            {brandData.skills.map((skill, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className={`absolute inset-0 bg-amber-500 transform scale-0 transition-transform duration-500 ease-out ${hoveredSkill === index ? 'scale-100' : ''}`}></div>
                <div className="relative border border-stone-200 h-32 p-6 flex items-center justify-center overflow-hidden transition-colors duration-300">
                  <span className={`text-sm font-medium uppercase tracking-wider text-center z-10 transition-colors duration-300 ${hoveredSkill === index ? 'text-white' : 'text-stone-800'}`}>
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Section - Numbered Cards with Clean Lines */}
      <section ref={(el) => registerSection(el, 2)} className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Methodology</p>
              <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                Campaign Strategy
                <span className="block absolute -bottom-2 left-0 w-16 h-px bg-amber-500"></span>
              </h2>
            </div>
            <p className="text-stone-600 font-light leading-relaxed md:col-span-6">
              Precision-engineered approach to elevate Kronju's digital presence through systematic implementation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {brandData.objectives.map((objective, index) => (
              <div 
                key={index} 
                className="group relative bg-white"
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

      {/* Results Section - Elegant Metrics Display */}
      <section ref={(el) => registerSection(el, 3)} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Impact</p>
              <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                Campaign Results
                <span className="block absolute -bottom-2 left-0 w-16 h-px bg-amber-500"></span>
              </h2>
            </div>
            <p className="text-stone-600 font-light leading-relaxed md:col-span-6">
              Precise, measurable outcomes achieved through strategic implementation and rigorous analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-16">
            {brandData.achievements.map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-stone-100 hover:border-amber-500 transition-all duration-300"
              >
                <div className="p-12 flex flex-col h-full min-h-64 justify-between">
                  <div className="text-5xl font-light text-stone-900 mb-6 transition-colors duration-300 group-hover:text-amber-500">
                    {item.metric}
                  </div>
                  <div className="text-sm text-stone-600 uppercase tracking-widest">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-stone-200 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {brandData.results.map((result, index) => (
                <div 
                  key={index} 
                  className="group flex items-start"
                >
                  <div className="mr-6 w-8 h-8 flex-shrink-0 border border-stone-200 flex items-center justify-center text-sm text-stone-400 group-hover:border-amber-500 group-hover:text-amber-500 transition-all duration-300">
                    {index + 1}
                  </div>
                  <p className="text-stone-600 font-light">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section - Minimal Split */}
      <section ref={(el) => registerSection(el, 4)} className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Method</p>
              <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                Marketing Approach
                <span className="block absolute -bottom-2 left-0 w-16 h-px bg-amber-500"></span>
              </h2>
              
              <p className="text-stone-600 font-light leading-relaxed mb-12">
                Systematically developed strategy with German precision to elevate Kronju&apos;s digital presence, emphasizing quality and authenticity.
              </p>
              
              <div className="space-y-12">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-6 h-px bg-amber-500"></div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">Research</h3>
                  <p className="text-stone-600 font-light">Methodical audience analysis and competitor research</p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-6 h-px bg-amber-500"></div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">Strategy</h3>
                  <p className="text-stone-600 font-light">Integrated multi-channel approach with consistent messaging</p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-6 h-px bg-amber-500"></div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">Execution</h3>
                  <p className="text-stone-600 font-light">Data-driven implementation with systematic A/B testing</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7 relative">
              <div className="aspect-4/3 w-full relative">
                <div className="absolute bottom-8 left-8 right-8 top-8 border border-amber-500"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/project/reveal-cover/reveal-cover1.png"
                    alt="Marketing Campaign Preview"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Clean Horizontal Slider */}
<section ref={(el) => registerSection(el, 5)} className="py-24 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-4">
        <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Creative Work</p>
        <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
          Design Gallery
          <span className="block absolute -bottom-2 left-0 w-16 h-px bg-amber-500"></span>
        </h2>
      </div>
      <p className="text-stone-600 font-light leading-relaxed md:col-span-6">
        Strategic visual assets developed with German precision for maximum impact across digital channels.
      </p>
    </div>
    
    {/* True Cover Flow Gallery with Drag Scrolling */}
    <div 
      className="relative h-96 w-full perspective-1000"
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
          const medianIndex = Math.floor(projects.length / 2);
          
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
                  opacity
                }}
              >
                <Image
                  src={project.image}
                  alt={`Album cover ${index + 1}`}
                  width={240}
                  height={240}
                  className="rounded shadow-lg"
                />
              </div>
            );
          });
        })()}
      </div>
    
    </div>
  </div>
</section>

      {/* Next Project with Minimal Aesthetic */}
      <section 
        ref={(el) => registerSection(el, 6)}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block bg-stone-100"></div>
          <div className="relative">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/project/cover2.jpg"
                alt="Next Project"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-stone-900/20"></div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="flex flex-col justify-center">
            <p className="text-amber-500 uppercase tracking-widest mb-3 text-sm">Next Case</p>
            <h2 className="text-5xl font-light text-stone-900 mb-8 max-w-md">
              Discover Our Next Project
            </h2>
            <Link 
              href="/project/2-ortist-specialist" 
              className="group inline-flex items-center text-sm font-medium uppercase tracking-widest"
            >
              <span className="text-stone-900 group-hover:text-amber-500 transition-colors duration-300">Ortist Specialist</span>
              <span className="ml-3 w-8 h-px bg-stone-900 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-300"></span>
            </Link>
          </div>
          <div className="md:hidden aspect-video relative overflow-hidden">
            <Image
              src="/project/cover2.jpg"
              alt="Next Project"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-stone-900/20"></div>
          </div>
        </div>
      </section>
    </div>
  );
}