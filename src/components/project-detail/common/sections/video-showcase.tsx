import React, { useState, useRef } from 'react';
import { BrandData } from '../types';

interface VideoShowcaseProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const VideoShowcaseSection = ({ brandData, sectionViewed, registerSection }: VideoShowcaseProps) => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class
  
  // Handle video selection
  const handleVideoSelect = (index: number) => {
    setActiveVideo(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Get current video data
  const currentVideo = brandData.videoShowcase.videos[activeVideo];

  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 6)} 
      className="py-24 px-6 bg-stone-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className={`md:col-span-4 transition-all duration-700 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className={`text-${colorClass} uppercase tracking-widest mb-3 text-sm`}>Content</p>
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
              {brandData.videoShowcase.title}
              <span className={`block absolute -bottom-2 left-0 h-px bg-${colorClass} transition-all duration-700 delay-300 ${sectionViewed[6] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {brandData.videoShowcase.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Video Thumbnails - left side desktop */}
          <div className={`lg:col-span-3 order-2 lg:order-1 transition-all duration-700 delay-300 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-4 lg:pr-4">
              <h4 className="text-lg font-medium text-stone-800 mb-4 hidden lg:block">More Videos</h4>
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                {brandData.videoShowcase.videos.map((video, index) => (
                  <div 
                    key={index}
                    onClick={() => handleVideoSelect(index)}
                    className={`cursor-pointer group transition-all duration-300 flex-shrink-0 lg:flex-shrink ${
                      activeVideo === index 
                        ? `border-b-2 lg:border-b-0 lg:border-l-4 border-${colorClass} pb-2 lg:pb-0 lg:pl-3` 
                        : 'pb-2 lg:pb-0 lg:pl-4'
                    }`}
                  >
                    <div className="flex lg:flex-row space-x-3 items-center">
                      <div className="relative w-20 lg:w-16 flex-shrink-0 overflow-hidden rounded-sm" style={{ aspectRatio: '9/16' }}>
                        <video
                          src={video.videoUrl}
                          className="object-cover w-full h-full"
                          muted
                          playsInline
                        />
                        <div className={`absolute inset-0 bg-${colorClass} bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300`}></div>
                      </div>
                      <div className="w-24 lg:w-auto">
                        <h4 className={`font-medium text-sm transition-colors duration-300 ${activeVideo === index ? `text-${colorClass}` : 'text-stone-800 group-hover:text-stone-900'}`}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-1">
                          {video.metrics.plays} plays
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Video Player - Using TikTok-like aspect ratio (9:16) */}
          <div className={`lg:col-span-5 order-1 lg:order-2 transition-all duration-700 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative max-w-xs mx-auto bg-black overflow-hidden rounded-md shadow-lg" style={{ aspectRatio: '9/16' }}>
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                className="w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-20"
                style={{ opacity: isPlaying ? 0 : 1 }}
              >
                <div className={`w-16 h-16 rounded-full bg-${colorClass} flex items-center justify-center transition-transform duration-300 hover:scale-110`}>
                  {isPlaying ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
          
          {/* Video Info - Now on the right side */}
          <div className={`lg:col-span-4 order-3 transition-all duration-700 delay-150 ${sectionViewed[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="lg:pl-4 lg:border-l border-stone-200">
              <h3 className="text-2xl font-light text-stone-900 mb-3">{currentVideo.title}</h3>
              <p className="text-stone-600 font-light mb-6 text-sm lg:text-base">{currentVideo.description}</p>
              
              {/* Metrics */}
              {currentVideo.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 mt-4">
                  {currentVideo.metrics.plays && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-sm text-stone-600">{currentVideo.metrics.plays} plays</span>
                    </div>
                  )}
                  
                  {currentVideo.metrics.likes && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                      </svg>
                      <span className="text-sm text-stone-600">{currentVideo.metrics.likes} likes</span>
                    </div>
                  )}
                  
                  {currentVideo.metrics.comments && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                      </svg>
                      <span className="text-sm text-stone-600">{currentVideo.metrics.comments} comments</span>
                    </div>
                  )}
                  
                  {currentVideo.metrics.shares && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                      </svg>
                      <span className="text-sm text-stone-600">{currentVideo.metrics.shares} shares</span>
                    </div>
                  )}
                  
                  {currentVideo.metrics.saves && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                      </svg>
                      <span className="text-sm text-stone-600">{currentVideo.metrics.saves} saves</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};