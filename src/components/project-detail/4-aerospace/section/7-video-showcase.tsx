import React, { useState, useRef, useEffect } from 'react';
import { BrandData } from '../types';

interface VideoShowcaseProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const VideoShowcaseSection = ({ 
  brandData, 
  registerSection 
}: VideoShowcaseProps) => {
  // State to track which videos are playing
  const [playingVideos, setPlayingVideos] = useState<{[key: string]: boolean}>({});
  // State to track which videos are loaded and ready to be displayed
  const [loadedVideos, setLoadedVideos] = useState<{[key: string]: boolean}>({});
  // State to track which video items should be visible (for staggered animation)
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  // Refs for videos
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  // Section ref to detect when user has scrolled to this section
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Force immediate rendering for header when section becomes visible
  const [headerVisible, setHeaderVisible] = useState(false);

  // Function to toggle video play state
  const toggleVideo = (videoId: string) => {
    const videoElement = videoRefs.current[videoId];
    if (!videoElement) return;

    if (playingVideos[videoId]) {
      videoElement.pause();
      setPlayingVideos(prev => ({ ...prev, [videoId]: false }));
    } else {
      videoElement.play().catch(e => console.error("Could not play video:", e));
      setPlayingVideos(prev => ({ ...prev, [videoId]: true }));
    }
  };

  // Initialize visibility state for staggered animation
  useEffect(() => {
    if (brandData?.videoShowcase?.videos) {
      setVisibleItems(Array(brandData.videoShowcase.videos.length).fill(false));
    }
  }, [brandData?.videoShowcase?.videos]);

  // Intersection Observer for the entire section - with lower threshold for faster rendering
  useEffect(() => {
    if (!sectionRef.current) return;

    const sectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05, // Reduced threshold to detect earlier
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Make header immediately visible
        setHeaderVisible(true);
        // Start loading videos gradually when section is visible
        startStaggeredLoading();
        sectionObserver.disconnect();
      }
    }, sectionOptions);

    sectionObserver.observe(sectionRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, [sectionRef.current]);

  // Function to start staggered loading of videos
  const startStaggeredLoading = () => {
    if (!brandData?.videoShowcase?.videos?.length) return;
    
    // Load each video with a delay
    brandData.videoShowcase.videos.forEach((video, index) => {
      setTimeout(() => {
        // Mark this video as loaded
        setLoadedVideos(prev => ({ ...prev, [video.id]: true }));
        
        // After a short delay, make it visible (triggers animation)
        setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 100);
      }, index * 300); // 300ms delay between each video loading
    });
  };

  // Video loaded handler
  const handleVideoLoaded = (videoId: string) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      // Set the first frame as the thumbnail by seeking to time 0
      videoElement.currentTime = 0;
    }
  };

  return (
    <section 
      ref={(el) => {
        const divElement = el as HTMLDivElement | null;
      
        if (divElement) {
          registerSection(divElement, 6);
          sectionRef.current = divElement;
        } else {
          registerSection(null, 6);
          sectionRef.current = null;
        }
      }}    
      className="py-28 px-6 bg-gradient-to-b from-white to-stone-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Asymmetrical Header Layout - Using headerVisible state for immediate visibility */}
        <div className="mb-20 grid grid-cols-12 gap-8">
          <div className={`col-span-12 md:col-span-5 md:col-start-2 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-purple-500 uppercase tracking-widest mb-3 text-sm">Video Content</p>
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
              Organic Strategies & Result Details
              <span className={`block absolute -bottom-2 left-0 h-px bg-purple-500 transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <div className={`col-span-12 md:col-span-4 transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-xl font-medium text-stone-800 mb-4">Best Organic Content:</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              The best content that was really successful was a <strong>language based content</strong> that 
              <strong> encouraged</strong> people to <strong>learn Korean language</strong>. Another viral video was 
              an <strong>informative content</strong> about reasons to study at Seoul National University.
            </p>
          </div>
        </div>
        
        {/* Zigzag Layout - Video | Description, Description | Video */}
        <div className="relative">
          {brandData.videoShowcase.videos.map((video, index) => (
            <div 
              key={video.id}
              className={`grid grid-cols-12 gap-8 mb-24 transition-all duration-1000 ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${400 + (index * 200)}ms` }}
            >
              {/* For even indices: Video on left, Description on right */}
              {index % 2 === 0 ? (
                <>
                  {/* Video Component - Left side for even indices */}
                  <div className="col-span-12 md:col-span-6">
                    <div className="group relative transform transition-all duration-500 hover:-translate-y-2 aspect-[9/16] max-w-xs mx-auto">
                      {/* Subtle floating shadow */}
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-100 to-stone-100 opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500"></div>
                      
                      {/* Main video card */}
                      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden h-full">
                        {/* TikTok vertical video container */}
                        <div className="relative aspect-[9/16] overflow-hidden">
                          {loadedVideos[video.id] ? (
                            <>
                              {/* Video element */}
                              <video
                                ref={ref => {
                                  videoRefs.current[video.id] = ref;
                                }}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={video.videoUrl}
                                playsInline
                                muted
                                preload="metadata"
                                onLoadedData={() => handleVideoLoaded(video.id)}
                              />
                              
                              {/* Play/Pause button - Only visible on hover */}
                              <button
                                onClick={() => toggleVideo(video.id)}
                                className="absolute inset-0 flex items-center justify-center z-20 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                aria-label={playingVideos[video.id] ? 'Pause video' : 'Play video'}
                              >
                                <div className="relative w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center 
                                              before:absolute before:inset-0 before:rounded-full before:border before:border-white/50 before:scale-125 before:opacity-0 
                                              before:transition-all before:duration-700 group-hover:before:scale-100 group-hover:before:opacity-70">
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    {playingVideos[video.id] 
                                      ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path> // Pause icon
                                      : <path d="M8 5v14l11-7z"></path> // Play icon
                                    }
                                  </svg>
                                </div>
                              </button>
                            </>
                          ) : (
                            // Loading placeholder with skeleton animation
                            <div className="flex items-center justify-center h-full bg-stone-100 animate-pulse">
                              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                          
                          {/* Video metrics badge */}
                          <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md rounded-full px-2.5 py-0.5 text-xs text-white z-30">
                            {video.metrics?.plays || "0"} views
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative floating dot elements */}
                      <div className="absolute -right-3 -bottom-3 w-6 h-6 rounded-full bg-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                      <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-stone-100 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                    </div>
                  </div>
                  
                  {/* Description Component - Right side for even indices */}
                  <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                    <div className="relative pl-6 border-l-2 border-purple-100">
                      <h3 className="text-xl font-medium text-stone-800 mb-3">{video.title}</h3>
                      <p className="text-stone-600 font-light leading-relaxed mb-5">{video.description}</p>
                      
                      {/* Video metrics with monospaced minimal styling */}
                      {video.metrics && video.metrics.likes && (
                        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 font-light">
                          <span className="flex items-center">
                            <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                            {video.metrics.plays} Plays
                          </span>
                          <span className="flex items-center">
                            <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                            {video.metrics.likes} Likes
                          </span>
                          {video.metrics.comments && (
                            <span className="flex items-center">
                              <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                              {video.metrics.comments} Comments
                            </span>
                          )}
                          {video.metrics.shares && (
                            <span className="flex items-center">
                              <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                              {video.metrics.shares} Shares
                            </span>
                          )}
                          {video.metrics.saves && (
                            <span className="flex items-center">
                              <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                              {video.metrics.saves} Saves
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Description Component - Left side for odd indices */}
                  <div className="col-span-12 md:col-span-6 flex flex-col justify-center order-2 md:order-1">
                    <div className="relative pr-6 border-r-2 border-purple-100 text-right">
                      <h3 className="text-xl font-medium text-stone-800 mb-3">{video.title}</h3>
                      <p className="text-stone-600 font-light leading-relaxed mb-5">{video.description}</p>
                      
                      {/* Video metrics with monospaced minimal styling */}
                      {video.metrics && video.metrics.likes && (
                        <div className="flex flex-wrap items-center justify-end gap-4 text-sm text-stone-500 font-light">
                          <span className="flex items-center">
                            <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                            {video.metrics.plays} Plays
                          </span>
                          <span className="flex items-center">
                            <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                            {video.metrics.likes} Likes
                          </span>
                          {video.metrics.comments && (
                            <span className="flex items-center">
                              <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                              {video.metrics.comments} Comments
                            </span>
                          )}
                          {video.metrics.shares && (
                            <span className="flex items-center">
                              <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                              {video.metrics.shares} Shares
                            </span>
                          )}
                          {video.metrics.saves && (
                            <span className="flex items-center">
                              <span className="h-1 w-1 bg-purple-400 rounded-full mr-2"></span>
                              {video.metrics.saves} Saves
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Video Component - Right side for odd indices */}
                  <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                    <div className="group relative transform transition-all duration-500 hover:-translate-y-2 aspect-[9/16] max-w-xs mx-auto">
                      {/* Subtle floating shadow */}
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-100 to-stone-100 opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500"></div>
                      
                      {/* Main video card */}
                      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden h-full">
                        {/* TikTok vertical video container */}
                        <div className="relative aspect-[9/16] overflow-hidden">
                          {loadedVideos[video.id] ? (
                            <>
                              {/* Video element */}
                              <video
                                ref={ref => {
                                  videoRefs.current[video.id] = ref;
                                }}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={video.videoUrl}
                                playsInline
                                muted
                                preload="metadata"
                                onLoadedData={() => handleVideoLoaded(video.id)}
                              />
                              
                              {/* Play/Pause button - Only visible on hover */}
                              <button
                                onClick={() => toggleVideo(video.id)}
                                className="absolute inset-0 flex items-center justify-center z-20 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                aria-label={playingVideos[video.id] ? 'Pause video' : 'Play video'}
                              >
                                <div className="relative w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center 
                                              before:absolute before:inset-0 before:rounded-full before:border before:border-white/50 before:scale-125 before:opacity-0 
                                              before:transition-all before:duration-700 group-hover:before:scale-100 group-hover:before:opacity-70">
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    {playingVideos[video.id] 
                                      ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path> // Pause icon
                                      : <path d="M8 5v14l11-7z"></path> // Play icon
                                    }
                                  </svg>
                                </div>
                              </button>
                            </>
                          ) : (
                            // Loading placeholder with skeleton animation
                            <div className="flex items-center justify-center h-full bg-stone-100 animate-pulse">
                              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                          
                          {/* Video metrics badge */}
                          <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md rounded-full px-2.5 py-0.5 text-xs text-white z-30">
                            {video.metrics?.plays || "0"} views
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative floating dot elements */}
                      <div className="absolute -right-3 -bottom-3 w-6 h-6 rounded-full bg-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                      <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-stone-100 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {/* Subtle section indicator */}
          <div className="mt-8 flex justify-center">
            <div className="h-px w-12 bg-stone-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};