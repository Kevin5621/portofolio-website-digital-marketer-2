import React from 'react';
import Image from 'next/image';
import { BrandData, Project } from '../types';

interface GalleryProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
  isDragging: boolean;
  handleDragStart: (e: React.MouseEvent) => void;
  handleDragMove: (e: React.MouseEvent) => void;
  handleDragEnd: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleSlideClick: (index: number) => void;
  activeSlide: number;
  coverflowRef: React.RefObject<HTMLDivElement>;
}

export const GallerySection = ({ 
  brandData, 
  sectionViewed, 
  registerSection,
  isDragging,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleSlideClick,
  activeSlide,
  coverflowRef
}: GalleryProps) => {
  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 5)} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-red-500 uppercase tracking-widest mb-3 text-sm">Creative Work</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                  Design Gallery
                  <span className={`block absolute -bottom-2 left-0 h-px bg-red-500 transition-all duration-700 delay-300 ${sectionViewed[5] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
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
  );
};