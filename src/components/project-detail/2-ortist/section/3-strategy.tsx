import React from 'react';
import { BrandData } from '../types';

interface StrategyProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const StrategySection = ({ brandData, sectionViewed, registerSection }: StrategyProps) => {
  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 2)} className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
            <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-blue-500 uppercase tracking-widest mb-3 text-sm">Methodology</p>
                <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                    Campaign Strategy
                    <span className={`block absolute -bottom-2 left-0 h-px bg-blue-500 transition-all duration-700 delay-300 ${sectionViewed[2] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
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
                    <div className="absolute top-0 left-0 w-full h-px bg-stone-200 transition-all duration-300 group-hover:bg-blue-500"></div>
                    <div className="absolute top-0 right-0 w-px h-full bg-stone-200 transition-all duration-300 group-hover:bg-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-full h-px bg-stone-200 transition-all duration-300 group-hover:bg-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-px h-full bg-stone-200 transition-all duration-300 group-hover:bg-blue-500"></div>
                    
                    <div className="p-8 flex flex-col h-full min-h-64">
                    <div className="text-5xl font-light text-stone-200 mb-6 transition-colors duration-300 group-hover:text-blue-200">
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
  );
};