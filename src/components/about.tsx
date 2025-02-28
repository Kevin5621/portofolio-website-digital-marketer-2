"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Head from 'next/head';

const AboutMe = () => {
  return (
    <ReactLenis root>
      <main>
        {/* First Section - AboutMe (Sticky) */}
        <section className="bg-light min-h-screen sticky top-0 relative">
          {/* Very subtle background texture - almost invisible */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f05_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f05_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          
          <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 h-screen flex items-center">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:col-span-7 space-y-8"
              >
                {/* Section Label - No line */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-neutral-500 uppercase tracking-widest text-xs font-medium font-space">
                    About Me
                  </p>
                </motion.div>
                
                {/* Name/Title - No underline */}
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-space font-light text-neutral-600">
                    Hello, I&apos;m
                  </h2>
                  <h1 className="text-4xl md:text-6xl font-space font-medium text-neutral-900 tracking-tight">
                    Adhara Eka Sakti
                  </h1>
                </div>
                
                {/* Role */}
                <h3 className="text-xl md:text-2xl font-space font-normal text-primary">
                  Social Media Marketer & Graphic Designer
                </h3>
                
                {/* Bio */}
                <div className="text-neutral-600 text-base md:text-lg max-w-2xl font-light font-space leading-relaxed">
                  <p>
                    A <span className="font-medium text-neutral-800">Social Media Marketer</span>, <span className="font-medium text-neutral-800">Video Editor</span>, and <span className="font-medium text-neutral-800">Freelance Graphic Designer</span> based in Indonesia. I&apos;m highly motivated to help businesses thrive through innovative marketing strategies.
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Photo */}
              <motion.div 
                className="md:col-span-4 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                >
                <motion.div className="md:col-span-4 relative overflow-hidden h-96 w-96">
                  <Image 
                    src="/placeholder2.png" 
                    alt="Profile Photo" 
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Second Section - Filler1 (With sticky background and scrolling content) */}
        <section className="relative">
          {/* Sticky background */}
          <div className="sticky top-0 h-screen w-full bg-dark rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            {/* Top-down water ripple animation container */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Ripple 1 - Slowest and largest */}
              <div className="absolute w-full h-full flex items-center justify-center">
                <div 
                  className="absolute w-[200%] h-[200%] rounded-full border-4 border-slate-800 opacity-30"
                  style={{
                    animation: 'ripple 10s linear infinite',
                  }}
                />
              </div>
              
              {/* Ripple 2 - Medium speed */}
              <div className="absolute w-full h-full flex items-center justify-center">
                <div 
                  className="absolute w-[150%] h-[150%] rounded-full border-4 border-slate-700 opacity-20"
                  style={{
                    animation: 'ripple 8s linear infinite',
                    animationDelay: '2s',
                  }}
                />
              </div>
              
              {/* Ripple 3 - Fast speed */}
              <div className="absolute w-full h-full flex items-center justify-center">
                <div 
                  className="absolute w-[100%] h-[100%] rounded-full border-4 border-slate-600 opacity-15"
                  style={{
                    animation: 'ripple 6s linear infinite',
                    animationDelay: '1s',
                  }}
                />
              </div>
              
              {/* Ripple 4 - Fastest and smallest */}
              <div className="absolute w-full h-full flex items-center justify-center">
                <div 
                  className="absolute w-[50%] h-[50%] rounded-full border-4 border-slate-500 opacity-10"
                  style={{
                    animation: 'ripple 4s linear infinite',
                    animationDelay: '0.5s',
                  }}
                />
              </div>
            </div>
            
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-dark to-dark opacity-80"></div>
          </div>

          {/* Scrollable content */}
          <div className="relative mt-[-100vh]">
            <Head>
              <title>Agency Experience</title>
              <meta name="description" content="3+ Years of Agency Experience" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* First content block - positioned at the start of section 2 */}
            <div className="h-screen flex items-center justify-center">
              <main className="relative z-10 px-6 max-w-5xl mx-auto text-center">
                <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl">
                  <span className="text-secondary">3+ Year</span> <span className="text-white">of Agency</span> <br className="hidden sm:block" />
                  <span className="text-white">Experience</span>
                </h1>
              </main>
            </div>

            {/* Second content block - shows when scrolling down */}
            <div className="h-screen flex items-center justify-center">
              <main className="relative z-10 px-6 max-w-5xl mx-auto text-center">
                <h2 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl">
                  <span className="text-white">Over</span> <span className="text-secondary">10+</span> <br className="hidden sm:block" />
                  <span className="text-white">Completed Projects</span>
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