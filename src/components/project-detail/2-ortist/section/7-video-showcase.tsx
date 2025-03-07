import React from 'react';
import Image from 'next/image';
import { BrandData } from '../types';

interface VideoShowcaseProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const VideoShowcaseSection = ({ 
  brandData, 
  sectionViewed, 
  registerSection 
}: VideoShowcaseProps) => {
  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 6)} 
      className="py-28 px-6 bg-gradient-to-b from-white to-stone-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Asymmetrical Header Layout */}
        <div className="mb-20 grid grid-cols-12 gap-8">
          <div className={`col-span-12 md:col-span-5 md:col-start-2 transition-all duration-700 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
              Video Content
              <span className={`block absolute -bottom-2 left-0 h-px bg-blue-500 transition-all duration-700 delay-300 ${sectionViewed[6] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <p className={`col-span-12 md:col-span-4 text-stone-600 font-light leading-relaxed transition-all duration-700 delay-300 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {brandData.videoShowcase.description}
          </p>
        </div>
        
        {/* Staggered asymmetrical video layout */}
        <div className="relative">
          <div className="grid grid-cols-12 gap-y-20 gap-x-6">
            {brandData.videoShowcase.videos.map((video: any, index: number) => {
              // Set different column positions for each video to create asymmetry
              const colPositions = [
                'col-span-12 md:col-span-4 md:col-start-1', 
                'col-span-12 md:col-span-4 md:col-start-5',
                'col-span-12 md:col-span-4 md:col-start-9'
              ];
              
              return (
                <div 
                  key={video.id} 
                  className={`${colPositions[index % colPositions.length]} transition-all duration-700 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${400 + (index * 200)}ms` }}
                >
                  {/* Floating video card design */}
                  <div className="group relative transform transition-all duration-500 hover:-translate-y-2">
                    {/* Subtle floating shadow */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-100 to-stone-100 opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500"></div>
                    
                    {/* Main video card */}
                    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                      {/* TikTok vertical video container */}
                      <div className="relative aspect-[9/16] overflow-hidden">
                        {/* Video thumbnail */}
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          width={540}
                          height={960}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Clean play button with scale effect */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="relative w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center 
                                        before:absolute before:inset-0 before:rounded-full before:border before:border-white/50 before:scale-125 before:opacity-0 
                                        before:transition-all before:duration-700 group-hover:before:scale-100 group-hover:before:opacity-70">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"></path>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Minimal video duration badge */}
                        <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md rounded-full px-2.5 py-0.5 text-xs text-white">
                          {Math.floor(Math.random() * 30) + 20}s
                        </div>
                      </div>
                      
                      {/* Video info with offset design */}
                      <div className="px-6 py-5 relative">
                        {/* Decorative accent element */}
                        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 group-hover:w-8 h-px bg-blue-500 transition-all duration-500"></div>
                        
                        <h3 className="text-stone-800 font-medium mb-2 line-clamp-1">{video.title}</h3>
                        <p className="text-stone-500 text-sm font-light line-clamp-2 mb-3">{video.description}</p>
                        
                        {/* Video metrics with monospaced minimal styling */}
                        <div className="flex items-center space-x-4 text-xs text-stone-400 font-light">
                          <span className="flex items-center">
                            <span className="h-0.5 w-0.5 bg-stone-300 rounded-full mr-1.5"></span>
                            {Math.floor(Math.random() * 10) + 2}M views
                          </span>
                          <span className="flex items-center">
                            <span className="h-0.5 w-0.5 bg-stone-300 rounded-full mr-1.5"></span>
                            {Math.floor(Math.random() * 100) + 50}K likes
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative floating dot elements */}
                    <div className="absolute -right-3 -bottom-3 w-6 h-6 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                    <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-stone-100 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Subtle section indicator */}
          <div className="mt-20 flex justify-center">
            <div className="h-px w-12 bg-stone-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};