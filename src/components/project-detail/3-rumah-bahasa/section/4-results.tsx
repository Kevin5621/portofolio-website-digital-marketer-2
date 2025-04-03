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
            <p className="text-green-500 uppercase tracking-widest mb-3 text-sm">Impact</p>
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
              Campaign Results
              <span className={`block absolute -bottom-2 left-0 h-px bg-green-500 transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
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
              className={`group bg-white border border-stone-100 hover:border-green-500 transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${4 + (index * 1)}ms` }}
            >
              <div className="p-12 flex flex-col h-full min-h-64 justify-between">
                <div className="text-5xl font-light text-stone-900 mb-6 transition-colors duration-300 group-hover:text-green-500 flex items-center">
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
                      <svg className="w-6 h-6 ml-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          <div className="mb-12">
            <h3 className={`text-2xl font-light text-stone-900 mb-8 flex items-center transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Instagram Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {brandData.results.instagram.map((result, index) => (
                <div 
                  key={index} 
                  className={`group flex items-start transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${800 + (index * 100)}ms` }}
                >
                  <div className="mr-6 w-8 h-8 flex-shrink-0 border border-stone-200 flex items-center justify-center text-sm text-stone-400 group-hover:border-green-500 group-hover:text-green-500 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-600 font-light">
                      <span className="font-medium text-stone-900">{result.metric}</span> {result.description}
                    </p>
                    <p className="text-sm text-green-500 mt-1">{result.percentage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className={`text-2xl font-light text-stone-900 mb-8 flex items-center transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              TikTok Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {brandData.results.tiktok.map((result, index) => (
                <div 
                  key={index} 
                  className={`group flex items-start transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${1400 + (index * 100)}ms` }}
                >
                  <div className="mr-6 w-8 h-8 flex-shrink-0 border border-stone-200 flex items-center justify-center text-sm text-stone-400 group-hover:border-green-500 group-hover:text-green-500 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-600 font-light">
                      <span className="font-medium text-stone-900">{result.metric}</span> {result.description}
                    </p>
                    <p className="text-sm text-green-500 mt-1">{result.percentage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};