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
        <section className="relative bg-white sticky top-0 h-screen">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Side - Bold Typography */}
            <div className="md:w-1/2 relative bg-white z-10 flex items-center">
              <motion.div 
                className="p-8 md:p-16 max-w-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6 text-neutral-900">
                  {Array.from("SHAPING THE FUTURE.").map((char, index) => (
                    <span key={index} className="transition duration-300 hover:text-primary">{char}</span>
                  ))}
                </h2>

                <p className="mt-8 text-neutral-700 text-xl">
                  {Array.from("Digital Innovator, Visual Storyteller, and Marketing Strategist. Transforming brands through bold creativity and cutting-edge design.").map((char, index) => (
                    <span key={index} className="transition duration-300 hover:text-primary">{char}</span>
                  ))}
                </p>
              </motion.div>
            </div>


            {/* Right Side - Large Image */}
            <div className="md:w-1/2 relative">
              <motion.div 
                className="h-full"
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
                    className="object-cover object-center filter grayscale"
                    sizes="50vw"
                    priority
                  />
                </div>
              </motion.div>
            </div>
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
                  <span className="text-secondary">3+ Years</span> <span className="text-white">of Strategic</span> <br className="hidden sm:block" />
                  <span className="text-white">Agency Excellence</span>
                </h1>
              </main>
            </div>

            {/* Second content block - shows when scrolling down */}
            <div className="h-screen flex items-center justify-center">
              <main className="relative z-10 px-6 max-w-5xl mx-auto text-center">
                <h2 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl">
                  <span className="text-white">Delivering</span> <span className="text-secondary">10+</span> <br className="hidden sm:block" />
                  <span className="text-white">High-Impact Campaigns</span>
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