"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <div className="bg-light min-h-screen relative">
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 z-0 opacity-5">
        {Array(12).fill(0).map((_, i) => (
          <div key={i} className="h-full border-r border-neutral-300"></div>
        ))}
      </div>
      
      {/* Minimal Horizontal Line */}
      <div className="absolute top-20 left-0 w-full h-px bg-neutral-200 opacity-30"></div>
      <div className="absolute bottom-20 left-0 w-full h-px bg-neutral-200 opacity-30"></div>
      
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Column - Photo */}
          <div className="relative h-full overflow-hidden">
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
          >
            {/* Section Label */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px bg-neutral-400"></div>
              <p className="text-neutral-500 uppercase tracking-widest text-xs font-light">
                About Me
              </p>
            </motion.div>
            
            {/* Name/Title */}
            <h1 className="text-5xl md:text-6xl font-light text-neutral-900 mb-6 leading-tight tracking-wide">
              <span className="font-medium tracking-normal">Hello,</span> I&apos;m
              <br />
              <span className="text-primary relative inline-block mt-2">
                Sarah Chen
                <span className="absolute -bottom-1 h-px bg-primary opacity-40"></span>
              </span>
            </h1>
            
            {/* Bio */}
            <div className="space-y-4 text-neutral-600 md:text-lg max-w-xl">
              <p className="leading-relaxed">
                A strategic digital marketing specialist with over 8 years of experience transforming brands through storytelling and data-driven campaigns.
              </p>
              <p className="leading-relaxed">
                I blend creativity with analytical thinking to develop marketing strategies that connect with audiences and deliver measurable results.
              </p>
              <p className="leading-relaxed">
                When I&apos;m not optimizing campaigns or crafting content, you&apos;ll find me exploring photography, practicing yoga, or experimenting with new recipes.
              </p>
            </div>
            
            {/* Stats/Highlights */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-4xl font-light text-neutral-900 mb-1">8+</div>
                <div className="text-sm text-neutral-500">Years Experience</div>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-4xl font-light text-neutral-900 mb-1">50+</div>
                <div className="text-sm text-neutral-500">Projects</div>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-4xl font-light text-neutral-900 mb-1">12</div>
                <div className="text-sm text-neutral-500">Awards</div>
              </div>
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
    </div>
  );
};

export default AboutMe;