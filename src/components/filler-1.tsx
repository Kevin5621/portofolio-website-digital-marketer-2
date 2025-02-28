"use client"

import React from 'react';
import { motion } from 'framer-motion';

const Filler1 = () => {
  
  return (
    <div className="bg-light min-h-screen relative">
      
      {/* Main Hero Content */}
      <motion.div 
        className="pt-32 pb-16 px-6 md:px-12 lg:px-24 flex flex-col min-h-screen justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl">
          {/* Tagline with line */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-neutral-400"></div>
            <p className="text-neutral-500 md:text-lg font-bold">
              Digital Marketing Strategist
            </p>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-space text-neutral-900 mb-6 leading-tight font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>Turning Vision</p>
            <span className="font-space text-primary font-bold">Into Motion</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-neutral-600 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Filler1;
