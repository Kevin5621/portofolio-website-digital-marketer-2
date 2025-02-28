"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const Hero = () => {
  return (
    <ReactLenis root>
      <main>
        {/* First Section - Hero (Sticky) */}
        <section className="bg-zinc-900 min-h-screen sticky top-0 relative">
          <div className="absolute inset-0 z-0 left-[-90px] top-[-100px]">
            <Image 
              src="/placeholder.png" 
              alt="Profile portrait" 
              fill
              className="object-cover object-top grayscale opacity-90"
              sizes="100vw"
              priority
            />
            {/* Darkening overlay */}
            <div className="absolute inset-0 bg-dark bg-opacity-30"></div>
          </div>
          
          {/* Centered content overlay */}
          <motion.div 
            className="relative z-10 h-screen w-full flex flex-col items-center justify-end pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              {/* Large AUST, text */}
              <motion.h1 
                className="text-white text-8xl md:text-9xl font-serif tracking-tight leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Adhara<span className="text-white">,</span>
              </motion.h1>
              
              <motion.div 
                className="flex justify-end mt-4 mr-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-white text-3xl italic font-light mt-4">Eka</h2>
              </motion.div>
              
              <motion.div 
                className="mt-6 text-white uppercase tracking-widest text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="font-light text-sm">Digital</p>
                <p className="font-light text-sm">Marketing</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Second Section - Filler1 with Split Layout */}
        <section className="relative">
          {/* Sticky background */}
          <div className="sticky top-0 h-screen w-full bg-light rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            {/* Very subtle background texture - almost invisible */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f05_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f05_1px,transparent_1px)] bg-[size:80px_80px]"></div>
            
            {/* Left Side - Static Content "Turning Vision Into Motion"*/}
            <div className="absolute left-0 top-0 md:w-1/2 h-full flex items-center justify-center">
              <div className="pt-32 pb-16 px-6 md:px-6 lg:px-12 flex flex-col min-h-screen justify-center relative z-10">
                <div className="max-w-xl">
                  {/* Tagline with line */}
                  <motion.div
                    className="flex items-center gap-3 mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-px bg-neutral-400"></div>
                    <p className="text-neutral-500 md:text-lg font-bold">
                      Digital Marketing Strategist
                    </p>
                  </motion.div>
                  
                  {/* Main Headline */}
                  <motion.h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-space text-neutral-900 mb-6 leading-tight font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <p>Turning Vision</p>
                    <span className="font-space text-primary font-bold">Into Motion</span>
                  </motion.h2>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="relative mt-[-100vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
              {/* Left Side - Empty space to maintain layout */}
              <div className="md:block"></div>
              
              {/* Right Side - Scrollable Content */}
              <div className="relative z-10">
                <div className="grid gap-8 pt-24 pb-24 px-6">
                  {/* Scrollable images */}
                  <figure className="grid place-content-center -skew-x-12">
                    <Image
                      src="/filler/filler-1.jpg"
                      alt="Portfolio image 1"
                      width={320}
                      height={384}
                      className="transition-all duration-300 w-80 h-96 align-bottom object-cover"
                    />
                  </figure>
                  <figure className="grid place-content-center skew-x-12">
                    <Image
                      src="/filler/filler-2.jpg"
                      alt="Portfolio image 2"
                      width={320}
                      height={384}
                      className="transition-all duration-300 w-80 h-96 align-bottom object-cover"
                    />
                  </figure>
                  <figure className="grid place-content-center -skew-x-12">
                    <Image
                      src="/filler/filler-3.jpg"
                      alt="Portfolio image 3"
                      width={320}
                      height={384}
                      className="transition-all duration-300 w-80 h-96 align-bottom object-cover"
                    />
                  </figure>
                  <figure className="grid place-content-center skew-x-12">
                    <Image
                      src="/filler/filler-4.jpg"
                      alt="Portfolio image 4"
                      width={320}
                      height={384}
                      className="transition-all duration-300 w-80 h-96 align-bottom object-cover"
                    />
                  </figure>
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