import React from 'react';
import Image from 'next/image';
import { BrandData } from '../types';

interface ApproachProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ApproachSection = ({ brandData, sectionViewed, registerSection }: ApproachProps) => {
  // Reference to check if this section is currently in view
  const isVisible = sectionViewed[3];
  
  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 4)} 
      className="min-h-screen flex flex-col md:flex-row bg-stone-100"
    >
    {/* Image Section - Left on desktop, Top on mobile */}
    <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative">
        <Image
          src="/project/cover4.jpg"
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
        <p className={`text-purple-500 uppercase tracking-widest mb-3 text-sm transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          Method
        </p>
        
        {/* Using title from brandData with animation */}
        <h2 className={`text-3xl md:text-4xl font-light text-stone-900 mb-6 relative transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {brandData.marketingMethod.title}
          <span className="block absolute -bottom-2 left-0 h-px bg-purple-500 w-16"></span>
        </h2>

        {/* Using description from brandData with animation */}
        <p className={`text-stone-600 font-light leading-relaxed mb-12 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {brandData.marketingMethod.description}
        </p>

        {/* Mapping steps from brandData with staggered animations */}
        <div className="space-y-12">
          {brandData.marketingMethod.steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative pl-8 md:pl-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: `${300 + (index * 100)}ms` }}
            >
              <div className="absolute left-0 top-0 w-4 md:w-6 h-px bg-purple-500"></div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">{step.title}</h3>
              <p className="text-stone-600 font-light text-sm md:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};