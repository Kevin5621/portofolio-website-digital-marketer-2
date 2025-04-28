import React, { useState } from 'react';
import Image from 'next/image';
import { BrandData } from '../types';

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
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const colorClass = `${brandData.primaryColor}-500`;
  const projects = brandData.projects;

  const handleMouseEnter = (index: number) => {
    setHoveredSlide(index); // Set the hover state to the image index
  };

  const slideToShow = hoveredSlide !== null ? hoveredSlide : activeSlide; // Use hoveredSlide if set, else fallback to activeSlide

  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 5)} 
      className="py-24 px-6 min-h-screen flex flex-col justify-center bg-gray-dark overflow-visible"
    >
      <div className="max-w-6xl mx-auto w-full overflow-visible">
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
        
        {/* Cover Flow Gallery */}
        <div 
          className={`relative h-96 w-full perspective-1000 transition-all duration-1000 overflow-visible ${sectionViewed[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`coverflow-container flex justify-center items-center overflow-visible ${isDragging ? 'dragging' : ''}`} 
            ref={coverflowRef}
          >
            {projects.map((project, index) => {
              const position = index - slideToShow;
              let zIndex = 10 - Math.abs(position);
              const translateX = position * 200;
              const maxRotation = 35;
              const rotateY = position > 0 
                ? -Math.min(position * 35, maxRotation) 
                : Math.min(Math.abs(position) * 35, maxRotation);
              const translateZ = position === 0 ? 180 : -Math.abs(position) * 15;
              let opacity = 1 - (Math.abs(position) * 0.15);
              opacity = Math.max(opacity, 0.6);

              if (position === 0) {
                zIndex = 20;
                opacity = 1;
              }

              return (
                <div 
                  key={index}
                  className="coverflow-item overflow-visible"
                  onClick={() => handleSlideClick(index)} 
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity,
                    transition: isDragging ? 'none' : `all 0.5s ${index * 0.05}s`,
                    width: '260px',
                    height: '260px',
                    cursor: 'pointer'
                  }}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center relative" 
                    onMouseEnter={() => handleMouseEnter(index)} 
                    style={{
                      transition: 'transform 0.3s ease-out', 
                      display: 'inline-block',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title || `Project image ${index + 1}`}
                      width={260}
                      height={260}
                      className={`rounded shadow-lg transition-all duration-500 ${sectionViewed[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                      style={{ 
                        transitionDelay: `${0.3 + index * 0.1}s`,
                        objectFit: 'contain',
                        maxHeight: '260px',
                        width: 'auto',
                        height: 'auto',
                        border: 'none',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                        display: 'block', 
                        cursor: 'pointer',
                      }}
                      loading='lazy'
                    />
                    {/* Hover effect area */}
                    <div 
                      className="absolute inset-0 bg-transparent"
                      style={{
                        transition: 'background-color 0.2s ease-out', 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
