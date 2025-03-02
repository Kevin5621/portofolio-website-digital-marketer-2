'use client';

import { ReactLenis } from 'lenis/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const brandData = {
  name: "Kronju",
  tagline: "Cheese Snack Experience",
  description: "A premium cheese snack brand.",
  achievements: [
    { metric: "156%", description: "Social engagement" },
    { metric: "42%", description: "Sales growth" },
    { metric: "12", description: "Awards" },
    { metric: "3.2M", description: "Impressions" },
  ],
  projects: [
    { image: "/project/project-detail/foto-1-1.png" },
    { image: "/project/project-detail/foto-1-2.png" },
    { image: "/project/project-detail/foto-1-3.png" },
    { image: "/project/project-detail/foto-1-4.png" },
    { image: "/project/project-detail/foto-1-5.png" },
  ]
};

export default function Kronju() {
  const [scrollY, setScrollY] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const finalSectionRef = useRef<HTMLDivElement>(null);
  const finalSectionBgRef = useRef<HTMLDivElement>(null);

  // Update scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Handle reveal effect for sections
      if (wrapperRef.current && sectionsRef.current.length) {
        const windowHeight = window.innerHeight;
        
        sectionsRef.current.forEach((section, index) => {
          if (!section) return;
          
          // Skip the last section, it's our next project section
          if (index === sectionsRef.current.length - 1) return;
          
          // Calculate the point where the next section should start revealing this one
          const revealPoint = section.offsetTop;
          const scrollProgress = Math.max(0, Math.min(1, (scrollY - revealPoint) / windowHeight));
          
          // Use translateY to make the section move naturally upward
          // Multiply by negative viewport height to ensure it moves completely out of view
          section.style.transform = `translateY(${-scrollProgress * 100}vh)`;
        });
      }

      // Handle zoom effect for the final section
      if (finalSectionRef.current && finalSectionBgRef.current) {
        const sectionTop = finalSectionRef.current.offsetTop;
        const viewportHeight = window.innerHeight;
        
        // Check if we're approaching the final section (start effect slightly before)
        const distanceFromSection = sectionTop - scrollY;
        
        // Calculate zoom factor when scrolling close to and within the section
        // Start the effect when we're within 50% of a viewport height to the section
        if (distanceFromSection < viewportHeight * 0.5 && distanceFromSection > -viewportHeight) {
          // Calculate how far we are into this trigger zone (0 to 1)
          const progress = Math.max(0, Math.min(1, 1 - (distanceFromSection / (viewportHeight * 0.5))));
          
          // Apply a subtle zoom - starting at 1 (normal) and going up to 1.1 (10% zoom)
          const zoomFactor = 1 + (progress * 0.1); 
          finalSectionBgRef.current.style.transform = `scale(${zoomFactor})`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <ReactLenis root>
      <main className="bg-amber-50 text-gray-800 font-space" ref={wrapperRef}>
        {/* Hero Section - Split Layout */}
        <section className="min-h-screen flex flex-col md:flex-row">
          {/* Left Side - Brand Info */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-gray-50 relative overflow-hidden">
            {/* Diagonal Background for Visual Interest */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-50 transform -rotate-12"></div>

            <div className="relative max-w-xl z-10 space-y-4">
              {/* Brand Name with Gradient and Hover Animation */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-300 hover:scale-105">
                {brandData.name}
              </h1>

              {/* Brand Type with Subtle Highlight */}
              <h2 className="text-lg md:text-xl text-gray-700 font-medium tracking-wide border-b-2 border-yellow-500 inline-block pb-1">
                A Premium Snack Brand
              </h2>
            </div>
          </div>

          {/* Right Side - Brand Image */}
          <div className="w-full md:w-1/2 h-screen relative overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/project/cover1.jpg')`,
                transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.00015})`,
              }}
            />

            {/* Overlay Gradient for Visual Depth */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"
            />

          </div>
        </section>

        {/* Compact Achievements Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Judul dengan teks yang lebih kecil namun tetap menarik */}
            <h2 className="text-lg md:text-xl font-semibold mb-6 text-center text-gray-700 tracking-wide">
              Brand Highlights
            </h2>

            {/* Grid dengan elemen yang lebih ramping */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brandData.achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg transition-transform duration-300 hover:scale-105"
                >
                  {/* Metric dengan ukuran teks yang lebih kecil */}
                  <div className="text-base md:text-lg font-bold text-yellow-600 mb-1">
                    {item.metric}
                  </div>
                  {/* Deskripsi dengan teks yang lebih ringkas */}
                  <div className="text-xs text-gray-500 leading-tight">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Summary Section - with Parallax */}
        <section className="py-24 px-4 md:px-8 bg-white relative">
          <div className="max-w-6xl mx-auto">
            {/* Minimalist container with more whitespace */}
            <div className="flex flex-col md:flex-row md:items-center gap-16">
              
              {/* Left Column - Direct Parallax Image without container */}
              <div className="w-full h-[60vh] relative top-[-150px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/project/reveal-cover/reveal-cover1.png')`,
                    transform: `translateY(${scrollY * 0.16}px)`,
                  }}
                />
              </div>
              
              {/* Right Column - Minimalist Content */}
              <div className="w-full md:w-1/2 space-y-6">
                {/* Minimalist heading with thin weight and no gradient */}
                <h2 className="text-2xl md:text-3xl font-light text-gray-800">
                  The Essence of Kronju
                </h2>
                
                {/* Simple thin divider */}
                <div className="w-12 h-px bg-yellow-500"></div>
                
                {/* Clean typography */}
                <p className="text-gray-600 leading-relaxed">
                  Kronju represents simplicity and quality. Our cheese snacks are crafted with carefully selected ingredients, allowing the natural flavors to speak for themselves.
                </p>
                
                {/* Minimalist feature highlight */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Origin</span>
                    <p className="text-sm text-gray-600">Artisanal</p>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Process</span>
                    <p className="text-sm text-gray-600">Traditional</p>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Taste</span>
                    <p className="text-sm text-gray-600">Distinctive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery with Enhanced Grid Layout */}
        <section className="bg-white py-24">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Sticky Header */}
            <div className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
                Product Gallery
              </h2>
              <div className="w-20 h-1 bg-yellow-500 mt-4 mb-6"></div>
              <p className="text-sm md:text-base text-gray-700 max-w-md">
                Explore our premium cheese snack collection, crafted with the finest ingredients for an unforgettable tasting experience.
              </p>
            </div>
            
            {/* Right Side - Dynamic Staggered Grid */}
            <div className="py-16 px-4 md:px-8">
              {brandData.projects.map((project, index) => (
                <figure 
                  key={index} 
                  className={`grid place-content-center mb-24 ${
                    index % 3 === 0 ? 'ml-0' : 
                    index % 3 === 1 ? 'ml-12' : 
                    'ml-24'
                  } ${
                    index % 2 === 0 ? '-rotate-3' : 'rotate-3'
                  }`}
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                    opacity: scrollY > 500 ? 1 : 0,
                    transform: scrollY > 500 ? 
                      `translateY(0) ${index % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)'}` : 
                      `translateY(50px) ${index % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)'}`
                  }}
                >
                  <div className="relative group">
                    <Image
                      src={project.image}
                      alt=""
                      width={400}
                      height={500}
                      className="transition-all duration-500 w-72 h-96 object-cover shadow-xl rounded-md group-hover:scale-105 border-4 border-white"
                    />
                    {/* Optional subtle overlay */}
                    <div className="absolute inset-0 bg-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Full Screen Image Section with Next Project Text */}
        <section 
          ref={finalSectionRef}
          className="h-screen relative z-0 flex items-end justify-start overflow-hidden"
        >
          <div 
            ref={finalSectionBgRef}
            className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-700 ease-out origin-center"
            style={{
              backgroundImage: `url('/project/cover2.jpg')`,
              // Start with no transform to ensure the ref-based transform works properly
            }}
          >
            {/* Optional dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          <div className="relative p-8 md:p-16 lg:p-24 mb-8 md:mb-16 z-10">
            <Link href="/project/2-ortist-specialist" className="flex flex-col items-start group">
              <p className="text-xs uppercase tracking-widest text-white mb-2 font-light">
                Next Project
              </p>
              <h3 className="text-lg md:text-xl font-medium text-white">
                <span className="border-b border-white pb-1 group-hover:border-yellow-500 transition-colors">Ortist Specialist</span>
              </h3>
            </Link>
          </div>
        </section>

      </main>
    </ReactLenis>
  );
}