import React from 'react';
import Image from 'next/image';
import { BrandData } from '../types';

interface ApproachProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ApproachSection = ({ brandData, sectionViewed, registerSection }: ApproachProps) => {
  const isVisible = sectionViewed[4];

  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 4)} 
      className="min-h-screen flex flex-col md:flex-row bg-stone-100"
    >
    {/* Image Section - Left on desktop, Top on mobile */}
    <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative">
        <Image
          src="/project/project-detail/2-Ortist/cover-produk.jpg"
          alt="Marketing Campaign Preview"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
          priority={false}
        />
        {/* Mobile overlay gradient for better text contrast when scrolling */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/30 md:hidden"></div>
      </div>

      {/* Text Section - Right on desktop, Bottom on mobile */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 md:py-0">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-blue-500 uppercase tracking-widest mb-3 text-sm">Method</p>
          
          {/* Title with animated underline */}
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-6 relative">
            {brandData.marketingMethod.title}
            <span className={`block absolute -bottom-2 left-0 h-px bg-blue-500 w-0 transition-all duration-1000 ${isVisible ? 'w-16' : 'w-0'}`}></span>
          </h2>

          {/* Description with improved readability */}
          <p className="text-stone-600 font-light leading-relaxed mb-8 md:mb-12">
            {brandData.marketingMethod.description}
          </p>

          {/* Steps with staggered animation */}
          <div className="space-y-8 md:space-y-12">
            {brandData.marketingMethod.steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative pl-12 transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              >
                <div className={`absolute left-0 top-0 w-0 h-px bg-blue-500 transition-all duration-700 delay-${index * 200} ${isVisible ? 'w-6' : 'w-0'}`}></div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">{step.title}</h3>
                <p className="text-stone-600 font-light text-sm md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};