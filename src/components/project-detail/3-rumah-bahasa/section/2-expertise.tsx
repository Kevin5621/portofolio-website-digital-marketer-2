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

  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 1)} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-green-500 uppercase tracking-widest mb-3 text-sm">Expertise</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                    Skills Applied
                    <span className={`block absolute -bottom-2 left-0 h-px bg-green-500 transition-all duration-700 delay-300 ${sectionViewed[1] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
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
                    <div className={`absolute inset-0 bg-green-500 transition-all duration-0 ${hoveredSkill === index ? 'opacity-100' : 'opacity-0'}`}></div>
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
  );
};