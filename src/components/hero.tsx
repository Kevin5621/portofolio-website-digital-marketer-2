"use client"

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const Hero = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  // Using scroll progress to create the parallax effect
  const { scrollYProgress } = useScroll();
  
  // This will make the background scroll at a slower rate than the content
  // Creating the "lagging behind" effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);
  
  // Maintain the existing opacity effect but tie it to scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 0.8, 0.6, 0.4]);

  // For the second section animations
  const { scrollYProgress: section2Progress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for the left side content based on scroll
  const leftContentY = useTransform(section2Progress, [0, 0.2], [50, 0]);
  const leftContentOpacity = useTransform(section2Progress, [0, 0.2], [0, 1]);

  // Simplified text alternatives for brutalist style
  const portfolioItems = [
    {
      image: "/filler/filler-1.jpg",
      description: "BRAND AWARENESS ENHANCEMENT",
      alt: "Portfolio image 1"
    },
    {
      image: "/filler/filler-2.jpg",
      description: "AUDIENCE ENGAGEMENT FOCUSED",
      alt: "Portfolio image 2"
    },
    {
      image: "/filler/filler-3.jpg",
      description: "STORYTELLING WITH PURPOSE",
      alt: "Portfolio image 3"
    },
    {
      image: "/filler/filler-4.jpg",
      description: "DATA-DRIVEN APPROACH",
      alt: "Portfolio image 4"
    }
  ];

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2, smoothWheel: true }}>
      <main className="font-sans" ref={containerRef}>
        {/* Hero section container */}
        <section className="relative min-h-screen overflow-hidden bg-zinc-900">
          {/* Background image with parallax effect - Responsive positioning */}
          <motion.div 
            className="absolute inset-0 md:left-[-90px] md:top-[-100px]"
            style={{ y: backgroundY }} // This creates the lag effect
          >
            <Image 
              src="/placeholder.png" 
              alt="Profile portrait" 
              fill
              className="object-cover md:object-top object-center filter grayscale brightness-75"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80"></div>
          </motion.div>
          
          {/* Text content that scrolls normally */}
          <motion.div 
            className="relative z-10 h-screen w-full flex flex-col items-center justify-end pb-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div 
              className="text-center"
              style={{ opacity }}
            >
              {/* Name with refined typography */}
              <motion.h1 
                className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-none"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                Adhara<span className="text-white opacity-80">,</span>
              </motion.h1>
              
              <motion.div 
                className="flex justify-end mt-2 mr-4 sm:mr-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              >
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl italic font-extralight">Eka</h2>
              </motion.div>
              
              <motion.div 
                className="mt-8 text-white uppercase tracking-widest text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <p className="font-light text-xs sm:text-sm mb-1 tracking-[0.3em]">Social Media</p>
                <p className="font-light text-xs sm:text-sm tracking-[0.3em]">Marketing</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Second Section - Modified Version with Sticky Left Side */}
        <section className="relative" ref={scrollContainerRef}>
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side - Sticky Content */}
            <div className="md:w-1/2 relative bg-white md:sticky md:top-0 md:h-screen">
              <div className="h-full flex items-center">
                <motion.div 
                  className="p-8 md:p-16 max-w-xl"
                  style={{ 
                    y: leftContentY,
                    opacity: leftContentOpacity
                  }}
                >
                  {/* Certificate section instead of horizontal line */}
                  <motion.div className="flex items-center gap-3 mb-8">
                    <p className="text-neutral-500 text-xs uppercase tracking-wider font-medium">
                      Certificate
                    </p>
                    {/* Small certificate images row */}
                    <div className="flex items-center gap-2">
                      {/* laurel left side */}
                      <div className="h-8 w-8 md:h-10 md:w-10 relative">
                        <Image 
                          src="/laurel.png" 
                          alt="Laurel certificate" 
                          width={40} 
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="h-8 w-8 md:h-10 md:w-10 relative">
                        <Image 
                          src="/certificate/1.png" 
                          alt="" 
                          width={40} 
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="h-8 w-8 md:h-10 md:w-10 relative">
                        <Image 
                          src="/certificate/2.png" 
                          alt="" 
                          width={40} 
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="h-8 w-8 md:h-10 md:w-10 relative">
                        <Image 
                          src="/certificate/3.png" 
                          alt="" 
                          width={40} 
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      {/* laurel right side */}
                      <div className="h-8 w-8 md:h-10 md:w-10 relative">
                        <Image 
                          src="/laurel.png" 
                          alt="" 
                          width={40} 
                          height={40}
                          className="object-contain scale-x-[-1]"
                        />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Main Headline */}
                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space text-neutral-900 leading-tight font-bold">
                      Turning <span className="text-primary">Vision</span>
                    </h2>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space text-neutral-900 leading-tight font-bold">
                      Into <span className="text-primary">Motion</span>
                    </h2>
                  </div>
                  
                  {/* Added description */}
                  <motion.p 
                    className="mt-8 text-neutral-600 max-w-md text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Creating impactful digital marketing strategies that convert vision into tangible results.
                  </motion.p>
                </motion.div>
              </div>
            </div>
            
            {/* Right Side - Scrollable Content */}
            <div className="md:w-1/2 bg-white relative">
              <div className="py-8 sm:py-16 px-4 sm:px-8 md:px-12">
                <div className="grid grid-cols-1 border-[12px] sm:border-[24px] border-black">
                  {portfolioItems.map((item, index) => (
                    <div key={index} className="relative group film-strip">
                      {/* Film Roll Border Effect */}
                      <div className="absolute inset-0 pointer-events-none z-10 film-perforations">
                        {/* Left Side Perforations */}
                        <div className="absolute left-[-6px] sm:left-[-12px] top-0 bottom-0 w-2 sm:w-3 bg-black flex flex-col justify-between py-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-2 sm:w-3 h-3 sm:h-6 bg-white border-black"
                            ></div>
                          ))}
                        </div>
                        
                        {/* Right Side Perforations */}
                        <div className="absolute right-[-6px] sm:right-[-12px] top-0 bottom-0 w-2 sm:w-3 bg-black flex flex-col justify-between py-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-2 sm:w-3 h-3 sm:h-6 bg-white border-black"
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Image Container with film-like border */}
                      <div className="relative overflow-hidden border-[6px] sm:border-[12px] border-black">
                        <motion.div
                          className="aspect-[16/9] overflow-hidden"
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={item.image}
                            alt={item.alt}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover transition-transform"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Brutalist Text Container */}
                      <div className="bg-black flex items-center justify-center">
                        <h3 className="text-white font-mono font-bold text-xs sm:text-base md:text-xl lg:text-4xl tracking-wider text-center leading-none p-2 sm:p-4">
                          {item.description}
                        </h3>
                      </div>
                      
                      {/* No extra spacing between items */}
                      {index < portfolioItems.length - 1 && <div className="h-0"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
};

export default Hero;