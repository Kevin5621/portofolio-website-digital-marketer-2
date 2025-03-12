import React from 'react';
import CountUp from 'react-countup';
import { BrandData } from '../types';

interface ResultsProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ResultsSection = ({ brandData, sectionViewed, registerSection }: ResultsProps) => {
  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 3)} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-red-500 uppercase tracking-widest mb-3 text-sm">Impact</p>
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
              Campaign Results
              <span className={`block absolute -bottom-2 left-0 h-px bg-red-500 transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Precise, measurable outcomes achieved through strategic implementation and rigorous analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-16">
          {brandData.achievements.map((item, index) => (
            <div
              key={index}
              className={`group bg-white border border-stone-100 hover:border-red-500 transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${4 + (index * 1)}ms` }}
            >
              <div className="p-12 flex flex-col h-full min-h-64 justify-between">
                <div className="text-5xl font-light text-stone-900 mb-6 transition-colors duration-300 group-hover:text-red-500 flex items-center">
                  {sectionViewed[3] ? (
                    <>
                      <CountUp
                        start={0}
                        end={parseInt(item.metric.replace(/[^0-9]/g, ''))}
                        duration={2.5}
                        separator=","
                        suffix={item.metric.includes('%') ? '%' : (item.metric.includes('$') ? '$' : '')}
                        prefix={item.metric.includes('$') ? '$' : ''}
                        delay={0.5 + index * 0.2}
                      />
                      <svg className="w-6 h-6 ml-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : item.metric}
                </div>
                <div className="text-sm text-stone-600 uppercase tracking-widest">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`border-t border-stone-200 pt-16 transition-all duration-700 delay-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {brandData.results.map((result, index) => (
              <div 
                key={index} 
                className={`group flex items-start transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${800 + (index * 100)}ms` }}
              >
                <div className="mr-6 w-8 h-8 flex-shrink-0 border border-stone-200 flex items-center justify-center text-sm text-stone-400 group-hover:border-red-500 group-hover:text-red-500 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                <p className="text-stone-600 font-light">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};