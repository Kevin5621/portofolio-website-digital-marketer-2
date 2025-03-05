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
                  className="object-cover object-center filter grayscale hover:grayscale-0 transition duration-500 ease-in-out"
                  sizes="50vw"
                  priority
                />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Second Section - Innovative */}
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

                {/* Complex Neural Network Paths */}
                {[...Array(12)].map((_, i) => (
                  <path
                    key={i}
                    d={`
                      M${Math.random() * 100} ${Math.random() * 100} 
                      Q${Math.random() * 200} ${Math.random() * 200} 
                      ${Math.random() * 300} ${Math.random() * 300}
                    `}
                    fill="none"
                    stroke="url(#neuralGradient)"
                    strokeWidth={Math.random() * 2}
                    className="opacity-50 animate-pulse"
                    style={{
                      animationDuration: `${5 + Math.random() * 5}s`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Glowing Neuromorphic Nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-blue-600/20 rounded-full blur-2xl"
                  style={{
                    width: `${50 + Math.random() * 100}px`,
                    height: `${50 + Math.random() * 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `pulse ${5 + Math.random() * 5}s infinite alternate`,
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