"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Head from 'next/head';

const AboutMe = () => {
  // Generate fixed random values that will be consistent between server and client
  const generateFixedRandomValues = () => {
    // Pre-computed random values for paths, animations, etc.
    return {
      paths: Array(12).fill(0).map((_, i) => ({
        d: `M${30 + i * 5} ${20 + i * 6} Q${100 + i * 10} ${150 - i * 5} ${200 + i * 8} ${250 - i * 7}`,
        strokeWidth: 0.5 + (i * 0.1),
        animationDuration: `${5 + (i * 0.5)}s`,
        animationDelay: `${0.2 + (i * 0.25)}s`
      })),
      nodes: Array(8).fill(0).map((_, i) => ({
        width: `${50 + (i * 15)}px`,
        height: `${50 + (i * 15)}px`,
        top: `${10 + (i * 10)}%`,
        left: `${5 + (i * 12)}%`,
        animation: `pulse ${5 + (i * 0.6)}s infinite alternate`
      }))
    };
  };

  // Create the fixed random values
  const fixedRandomValues = generateFixedRandomValues();

  return (
    <ReactLenis root>
      <main>
        {/* First Section - AboutMe (Sticky) - Now with responsive mobile layout */}
        <section id="about-section" className="relative bg-white sticky top-0 h-screen overflow-hidden">
          {/* Flex container for mobile responsiveness */}
          <div className="relative h-full w-full flex flex-col md:block">
            {/* Text content - Full width on mobile, positioned normally on desktop */}
            <motion.div 
              className="relative z-10 flex-1 md:absolute md:inset-0 flex items-center p-8 sm:p-12 md:p-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full max-w-7xl" style={{ 
                transform: 'scale(1)',
                transformOrigin: 'left center',
                textSizeAdjust: '100%'
              }}>
                <div className="text-left">
                  <h2 className="font-extrabold tracking-tight leading-[0.9] text-neutral-900" style={{
                    fontSize: 'clamp(2.5rem, 7vw, 7rem)'
                  }}>
                    <span className="text-primary">CREATIVITY</span> <br className="hidden sm:block" />
                    ALONE CAPTURE <br className="hidden sm:block" />
                    THE EYE. <br className="hidden sm:block" />
                    <span className="text-primary">CREATIVITY</span> <br className="hidden sm:block" />
                    WITH <span className="text-primary">STRATEGY</span> <br className="hidden sm:block" />
                    CAPTURES THE <br className="hidden sm:block" />
                    <span className="text-primary">MARKET.</span>
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* Image Container - Below text on mobile, right side on desktop */}
            <motion.div 
              className="relative flex-1 md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full z-0 md:z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full">
                <Image
                  src="/placeholder2.png" 
                  alt="Profile portrait"
                  fill
                  className="object-cover object-center md:object-right filter grayscale hover:grayscale-0 transition duration-500 ease-in-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Second Section - Innovative - Unchanged */}
        <section className="relative">
          {/* Sticky Background */}
          <div className="sticky top-0 h-screen w-full bg-[#0A0C10] rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            {/* Layered Neural Network Visualization */}
            <div className="absolute inset-0 opacity-30 mix-blend-screen">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="100%" 
                height="100%" 
                className="absolute"
              >
                <defs>
                  {/* Gradient for Neural Connection Effect */}
                  <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>

                {/* Complex Neural Network Paths - Using fixed values */}
                {fixedRandomValues.paths.map((path, i) => (
                  <path
                    key={i}
                    d={path.d}
                    fill="none"
                    stroke="url(#neuralGradient)"
                    strokeWidth={path.strokeWidth}
                    className="opacity-50 animate-pulse"
                    style={{
                      animationDuration: path.animationDuration,
                      animationDelay: path.animationDelay
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Glowing Neuromorphic Nodes - Using fixed values */}
            <div className="absolute inset-0 pointer-events-none">
              {fixedRandomValues.nodes.map((node, i) => (
                <div
                  key={i}
                  className="absolute bg-blue-600/20 rounded-full blur-2xl"
                  style={{
                    width: node.width,
                    height: node.height,
                    top: node.top,
                    left: node.left,
                    animation: node.animation,
                  }}
                />
              ))}
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0C10] via-[#141824] to-[#0A0C10] opacity-90"></div>
          </div>

          {/* Scrollable Content - Unchanged */}
          <div className="relative mt-[-100vh]">
            <Head>
              <title>Agency Experience</title>
              <meta name="description" content="3+ Years of Experience" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* First content block - positioned at the start of section 2 */}
            <div className="h-screen flex items-center justify-center">
              <main className="relative z-10 px-6 max-w-5xl mx-auto text-center">
                <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl">
                  <span className="text-secondary">3+ Years</span> <span className="text-white">of Experience</span> <br className="hidden sm:block" />
                </h1>
              </main>
            </div>

            {/* Second content block - shows when scrolling down */}
            <div className="h-screen flex items-center justify-center">
              <main className="relative z-10 px-6 max-w-5xl mx-auto text-center">
                <h2 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl">
                  <span className="text-white">Over</span> <span className="text-secondary">10+</span> <br className="hidden sm:block" />
                  <span className="text-white"><span className="text-secondary">High-Impact</span> Campaigns</span>
                </h2>
              </main>
            </div>
          </div>
        </section>

      </main>
    </ReactLenis>
  );
};

export default AboutMe;