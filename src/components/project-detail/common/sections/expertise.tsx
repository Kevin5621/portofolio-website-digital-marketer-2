import { useState } from 'react';
import { BrandData } from '../types';

interface ExpertiseSectionProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ExpertiseSection = ({ 
  brandData, 
  sectionViewed, 
  registerSection 
}: ExpertiseSectionProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class

  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 1)} className="py-24 px-6 bg-gray-dark">
        <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className={`text-${colorClass} uppercase tracking-widest mb-3 text-sm`}>Expertise</p>
                <h2 className="text-4xl font-light text-white mb-6 relative">
                    Skills Applied
                    <span className={`block absolute -bottom-2 left-0 h-px bg-${colorClass} transition-all duration-700 delay-300 ${sectionViewed[1] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </h2>
                </div>
                <p className={`text-gray-300 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Applying cutting-edge digital marketing methodologies with precise profesional execution to deliver exceptional campaign outcomes.
                </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5">
                {brandData.skills.map((skill, index) => (
                <div 
                    key={index} 
                    className={`relative transition-all duration-700 border border-white-500 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                >
                    <div className={`absolute inset-0 bg-${colorClass} transition-all duration-300 ${hoveredSkill === index ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className="relative z-10 p-8 min-h-40 flex items-center justify-center">
                    <p className={`text-center font-light tracking-wider transition-all duration-300 ${hoveredSkill === index ? 'text-white' : 'text-gray-200'}`}>
                        {skill}
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
  );
};