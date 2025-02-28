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
        <section className="bg-light min-h-screen sticky top-0 relative font-sans">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          
          <div className="container mx-auto px-10 md:px-16 py-24 md:py-32 relative z-10">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Left Column - Photo */}
              <div className="relative h-full overflow-hidden flex justify-center">
                <Image 
                  src="/placeholder.png" 
                  alt="Profile Photo" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Right Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="px-4 md:px-8"
              >
                {/* Section Label */}
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-8 h-px bg-neutral-400"></div>
                  <p className="text-neutral-500 uppercase tracking-widest text-xs font-medium">
                    About Me
                  </p>
                </motion.div>
                
                {/* Name/Title */}
                <h1 className="text-5xl md:text-6xl font-extralight text-neutral-900 mb-8 leading-tight tracking-tight">
                  <span className="font-medium tracking-normal">Hello,</span> I&apos;m
                  <br />
                  <span className="text-primary relative inline-block mt-3 font-normal">
                    Adhara Eka Sakti
                    <span className=" w-full h-px bg-primary opacity-40"></span>
                  </span>
                </h1>
                
                {/* Bio */}
                <div className="space-y-5 text-neutral-600 text-base md:text-lg max-w-xl font-light">
                  <p className="leading-relaxed">
                    A <span className="font-medium text-neutral-800">Social Media Marketer</span>, <span className="font-medium text-neutral-800">Video Editor</span>, and <span className="font-medium text-neutral-800">Freelance Graphic Designer</span> based in Indonesia.
                  </p>
                  <p className="leading-relaxed">
                    I&apos;m highly motivated to help businesses thrive through innovative marketing strategies.
                  </p>
                  <p className="leading-relaxed">
                   I believe the combination of my analytical skills and creativity will be an asset in crafting innovative and successful marketing strategies.
                  </p>
                </div>
              
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decorative corner lines */}
          <div className="absolute top-8 right-8 w-16 h-16">
            <div className="absolute top-0 right-0 w-px h-16 bg-neutral-300 opacity-20"></div>
            <div className="absolute top-0 right-0 w-16 h-px bg-neutral-300 opacity-20"></div>
          </div>
          <div className="absolute bottom-8 left-8 w-16 h-16">
            <div className="absolute bottom-0 left-0 w-px h-16 bg-neutral-300 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-px bg-neutral-300 opacity-20"></div>
          </div>
        </section>

        {/* Second Section - Filler1 (With sticky background and scrolling content) */}
        <section className="relative">
          {/* Sticky background */}
          <div className="sticky top-0 h-screen w-full bg-dark rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-dark to-dark opacity-80"></div>
            
            {/* Subtle texture */}
            <div className="absolute inset-0 opacity-30" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23333' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: '150px 150px'
                }}>
            </div>
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