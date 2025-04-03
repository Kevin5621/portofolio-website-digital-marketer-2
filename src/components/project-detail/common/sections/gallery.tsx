import React from 'react';
import Image from 'next/image';
import { BrandData } from '../types';

// Update the interface for GallerySectionProps
interface GallerySectionProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
  isDragging: boolean;
  activeSlide: number;
  handleDragStart: (e: React.MouseEvent) => void;
  handleDragMove: (e: React.MouseEvent) => void;
  handleDragEnd: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleSlideClick: (index: number) => void;
  coverflowRef: React.RefObject<HTMLDivElement | null>;
}

export const GallerySection = ({ 
  brandData,
  sectionViewed,
  registerSection,
  isDragging,
  activeSlide,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleSlideClick,
  coverflowRef
}: GallerySectionProps) => {
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class
  const projects = brandData.projects;

  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 5)} 
      className="py-24 px-6 min-h-screen flex flex-col justify-center bg-gray-dark"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className={`text-${colorClass} uppercase tracking-widest mb-3 text-sm`}>Showcase</p>
            <h2 className="text-4xl font-light text-white mb-6 relative">
              Project Gallery
              <span className={`block absolute -bottom-2 left-0 h-px bg-${colorClass} transition-all duration-700 delay-300 ${sectionViewed[5] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <p className={`text-gray-300 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Visual showcase of the campaign&apos;s creative assets and design elements.
          </p>
        </div>
        
        {/* True Cover Flow Gallery with Drag Scrolling */}
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
          <div className={`coverflow-container flex justify-center items-center ${isDragging ? 'dragging' : ''}`} ref={coverflowRef}>
            {(() => {
              return projects.map((project, index) => {
                // Calculate the position based on the active slide
                const position = index - activeSlide;
                let zIndex = 10 - Math.abs(position);
                
                // Adjust spacing for better arrangement
                const translateX = position * 160;
                
                // Invert the rotation direction to make cards face inward
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
                    <div className="w-[240px] h-[240px] flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title || `Project image ${index + 1}`}
                        width={240}
                        height={240}
                        className={`rounded shadow-lg transition-all duration-500 ${sectionViewed[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{ 
                          transitionDelay: `${0.3 + index * 0.1}s`,
                          objectFit: 'contain',
                          maxHeight: '240px',
                          width: 'auto',
                          height: 'auto'
                        }}
                        loading='lazy'
                      />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSlide === index 
                  ? `bg-${colorClass} scale-150` 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};