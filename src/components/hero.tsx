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
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);
  
  // Maintain the existing opacity effect but tie it to scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 0.8, 0.6, 0.4]);

  // For the second section animations
  const { scrollYProgress: section2Progress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for the typography content based on scroll
  const textScale = useTransform(section2Progress, [0, 0.2], [0.9, 1]);
  const textOpacity = useTransform(section2Progress, [0, 0.2], [0, 1]);

  const textRows = [
    [
      { text: "Turning", isDark: true },
      { text: "Vision", isDark: false }
    ],
    [
      { text: "Into", isDark: true },
      { text: "Motion", isDark: false }
    ]
  ];

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2, smoothWheel: true }}>
      <main className="font-poppins" ref={containerRef}>
        {/* Hero section container */}
        <section className="relative min-h-screen overflow-hidden bg-zinc-900">
          {/* Background image with parallax effect - Responsive positioning */}
          <motion.div 
            className="absolute inset-0 md:left-[-90px] md:top-[-100px]"
            style={{ y: backgroundY }}
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
                className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-poppins font-bold tracking-tighter leading-none"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                ADHARA<span className="text-white opacity-80">,</span>
              </motion.h1>
              
              <motion.div 
                className="flex justify-end mt-2 mr-4 sm:mr-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              >
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-extralight">EKA</h2>
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
        
        {/* Second Section - Bold Typography with Working Video Text Fill */}
        <section 
          className="relative min-h-screen bg-white" 
          ref={scrollContainerRef}
        >
          {/* Bold Typography Container */}
          <motion.div 
            className="relative z-10 w-full h-screen flex items-center justify-center"
            style={{ 
              scale: textScale,
              opacity: textOpacity
            }}
          >
            <div className="text-center px-4 md:px-8">
              {/* Laurel badges moved above the text */}
              <motion.div 
                className="flex justify-center items-center gap-4 opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="h-8 w-8 md:h-10 md:w-10 relative">
                  <Image 
                    src="/laurel.png" 
                    alt="Laurel certificate" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
                <a 
                  href="https://drive.google.com/file/d/15FzNgVMhH2zgLhve8aKIqYRv5OC2-Ki7/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 md:h-10 md:w-10 relative"
                >
                  <Image 
                    src="/certificate/1.png" 
                    alt="" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </a>
                <a 
                  href="https://drive.google.com/file/d/19lkvbcmCJdqCP8r7qiGSCoywqiIvgk9g/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 md:h-10 md:w-10 relative"
                >
                  <Image 
                    src="/certificate/2.png" 
                    alt="" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </a>
                <a 
                  href="https://drive.google.com/file/d/1uingymnbEReMJEeBORdtlvSLag3b0Yz8/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 md:h-10 md:w-10 relative"
                >
                  <Image 
                    src="/certificate/3.png" 
                    alt="" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </a>
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
              </motion.div>
              
              {/* Fixed Typography Section */}
              <div className="relative mx-auto mt-8 overflow-visible" style={{ maxWidth: '1600px' }}>
                <h2 className="font-poppins font-black tracking-tighter uppercase text-[8vw] leading-[1.2]">
                  {textRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center items-center my-4 md:my-6">
                      {row.map((word, index) => (
                        <div key={index} className="relative mx-2 md:mx-4 flex items-center">
                          {word.isDark ? (
                            // Dark text with same styling as video text
                            <span 
                              className="inline-block" 
                              style={{ 
                                color: "#18181b",
                                lineHeight: "1",
                                fontSize: "8vw",
                                fontWeight: "900"
                              }}
                            >
                              {word.text}
                            </span>
                          ) : (
                            // Video text container
                            <div className="relative" style={{ fontSize: "8vw", lineHeight: "1" }}>
                              {/* Hidden text for layout */}
                              <span 
                                className="invisible"
                                style={{ 
                                  fontSize: "8vw",
                                  fontWeight: "900",
                                  lineHeight: "1"
                                }}
                              >
                                {word.text}
                              </span>
                              
                              {/* SVG mask for video */}
                              <div className="absolute inset-0 flex items-center justify-center" style={{ height: "100%" }}>
                                <svg width="100%" height="100%" style={{ overflow: "visible" }}>
                                  <defs>
                                    <mask id={`text-mask-${rowIndex}-${index}`}>
                                      <rect width="100%" height="100%" fill="black" />
                                      <text
                                        x="50%"
                                        y="50%"
                                        dominantBaseline="central"
                                        textAnchor="middle"
                                        fill="white"
                                        style={{ 
                                          fontSize: "8vw", 
                                          fontWeight: "900",
                                          fontFamily: "Poppins, sans-serif",
                                          letterSpacing: "-0.05em",
                                          textTransform: "uppercase"
                                        }}
                                      >
                                        {word.text}
                                      </text>
                                    </mask>
                                  </defs>
                                  <foreignObject
                                    width="100%"
                                    height="100%"
                                    mask={`url(#text-mask-${rowIndex}-${index})`}
                                  >
                                    <div style={{ width: "100%", height: "100%" }}>
                                      <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                      >
                                        <source src="/filler/filler.mp4" type="video/mp4" />
                                      </video>
                                    </div>
                                  </foreignObject>
                                </svg>
                              </div>
                              
                              {/* Fallback for video background */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span
                                  style={{
                                    background: `url('/filler/poster-frame.jpg')`,
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    fontSize: "8vw",
                                    fontWeight: "900",
                                    lineHeight: "1"
                                  }}
                                >
                                  {word.text}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </ReactLenis>
  );
};

export default Hero;