import React from 'react';
import CountUp from 'react-countup';
import { BrandData } from '../types';

interface ResultsProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ResultsSection = ({ brandData, sectionViewed, registerSection }: ResultsProps) => {
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class

  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 3)} className="py-24 px-6 bg-gray-dark">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className={`text-${colorClass} uppercase tracking-widest mb-3 text-sm`}>Impact</p>
            <h2 className="text-4xl font-light text-white mb-6 relative">
              Campaign Results
              <span className={`block absolute -bottom-2 left-0 h-px bg-${colorClass} transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <p className={`text-gray-300 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Precise, measurable outcomes achieved through strategic implementation and rigorous analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-16">
          {brandData.achievements.map((item, index) => (
            <div
              key={index}
              className={`group bg-gray-800 border border-gray-700 hover:border-${colorClass} transition-all duration-700 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${4 + (index * 1)}ms` }}
            >
              <div className="p-12 flex flex-col h-full min-h-64 justify-between">
                <div className={`text-5xl font-light text-white mb-6 transition-colors duration-300 group-hover:text-${colorClass} flex items-center`}>
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
                      <svg className={`w-6 h-6 ml-2 text-${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : item.metric}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-widest">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Platform-specific results */}
        {brandData.results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Instagram Results */}
            <div className={`transition-all duration-700 delay-300 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gray-800 p-8 border border-gray-700">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram Results
                </h3>
                
                <div className="space-y-6">
                  {brandData.results.instagram.map((result, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-700 pb-4">
                      <div>
                        <div className={`text-3xl font-light text-${colorClass}`}>
                          {sectionViewed[3] ? (
                            <CountUp
                              start={0}
                              end={parseInt(result.metric.replace(/[^0-9]/g, ''))}
                              duration={2.5}
                              separator=","
                              prefix={result.metric.includes('+') ? '+' : ''}
                              delay={0.8 + idx * 0.3}
                            />
                          ) : result.metric}
                        </div>
                        <div className="text-sm text-gray-300 mt-1">{result.description}</div>
                      </div>
                      <div className="text-sm text-gray-400">{result.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* TikTok Results */}
            <div className={`transition-all duration-700 delay-500 ${sectionViewed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gray-800 p-8 border border-gray-700">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44.02c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  TikTok Results
                </h3>
                
                <div className="space-y-6">
                  {brandData.results.tiktok.map((result, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-700 pb-4">
                      <div>
                        <div className={`text-3xl font-light text-${colorClass}`}>
                          {sectionViewed[3] ? (
                            <CountUp
                              start={0}
                              end={parseInt(result.metric.replace(/[^0-9]/g, ''))}
                              duration={2.5}
                              separator=","
                              prefix={result.metric.includes('+') ? '+' : ''}
                              delay={1 + idx * 0.3}
                            />
                          ) : result.metric}
                        </div>
                        <div className="text-sm text-gray-300 mt-1">{result.description}</div>
                      </div>
                      <div className="text-sm text-gray-400">{result.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};