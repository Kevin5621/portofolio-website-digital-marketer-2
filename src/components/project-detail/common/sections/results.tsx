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

  // Fungsi untuk mendapatkan icon berdasarkan jenis metrik
  const getMetricIcon = (metricType: string) => {
    // Lowercase untuk memudahkan pencocokan
    const type = metricType.toLowerCase();
    
    if (type.includes('reach')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z" />
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24C14.5 5.27 15 6.58 15 8s-.5 2.73-1.33 3.76c.42.14.86.24 1.33.24z" />
          <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
          <path d="M9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z" />
        </svg>
      );
    } else if (type.includes('followers') || type.includes('profile visits')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
          <path d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z" />
        </svg>
      );
    } else if (type.includes('interactions') || type.includes('likes')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
        </svg>
      );
    } else if (type.includes('click links')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
      );
    } else if (type.includes('views')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      );
    } else if (type.includes('comments')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
        </svg>
      );
    } else if (type.includes('shares')) {
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
      );
    } else {
      // Icon default jika tidak ada yang cocok
      return (
        <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
          <path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
        </svg>
      );
    }
  };

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
                        <div className="flex items-center">
                          {getMetricIcon(result.description)}
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
                        </div>
                        <div className="text-sm text-gray-300 mt-1 ml-7">{result.description}</div>
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
                        <div className="flex items-center">
                          {getMetricIcon(result.description)}
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
                        </div>
                        <div className="text-sm text-gray-300 mt-1 ml-7">{result.description}</div>
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