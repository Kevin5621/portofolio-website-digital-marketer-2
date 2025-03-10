'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Navbar from '@/components/navbar';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
  
  // Text for animation
  const text404 = "404";
  const textNotFound = "PAGE NOT FOUND";
  
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-zinc-900 text-white overflow-hidden">
        <Navbar variant="light" />
        
        {/* Background grid pattern */}
        <div className="fixed inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
          {Array.from({ length: 12 }).map((_, rowIndex) => (
            Array.from({ length: 12 }).map((_, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className="border border-white/20"
              />
            ))
          ))}
        </div>
        
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
          {/* Interactive 404 text */}
          <div className="relative mb-8">
            <motion.div 
              className="text-[12rem] md:text-[20rem] font-serif tracking-tighter leading-none text-center"
              style={{
                textShadow: isHovering ? `${(mousePosition.x - window.innerWidth / 2) / 30}px ${(mousePosition.y - window.innerHeight / 2) / 30}px 10px rgba(255,255,255,0.1)` : 'none',
              }}
            >
              {text404.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Glitch effect overlay */}
            <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
              <motion.div 
                className="text-[12rem] md:text-[20rem] font-serif tracking-tighter leading-none text-center text-blue-500 mix-blend-exclusion"
                animate={{ 
                  x: [0, -3, 5, -2, 0],
                  opacity: [0, 1, 0.5, 0.8, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  times: [0, 0.2, 0.4, 0.6, 1],
                  repeatDelay: 5,
                }}
              >
                {text404}
              </motion.div>
            </div>
          </div>
          
          {/* "PAGE NOT FOUND" text */}
          <div className="mb-12">
            <div className="overflow-hidden">
              <motion.h2 
                className="text-xl md:text-3xl uppercase tracking-[0.3em] text-center"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {textNotFound.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h2>
            </div>
          </div>
          
          {/* Back to home button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link 
              href="/" 
              className="group relative inline-flex items-center overflow-hidden border border-white/30 bg-transparent px-8 py-3 text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              <span className="relative z-10 text-sm uppercase tracking-widest">
                Return Home
              </span>
              <motion.span 
                className="absolute inset-0 bg-white z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </Link>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none opacity-20"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 150, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full border border-white/10 rounded-full" style={{ width: '100%', height: '100%' }}></div>
            <div className="absolute top-10% left-10% w-80% h-80% border border-white/10 rounded-full" style={{ width: '80%', height: '80%', top: '10%', left: '10%' }}></div>
            <div className="absolute top-20% left-20% w-60% h-60% border border-white/10 rounded-full" style={{ width: '60%', height: '60%', top: '20%', left: '20%' }}></div>
            <div className="absolute top-30% left-30% w-40% h-40% border border-white/10 rounded-full" style={{ width: '40%', height: '40%', top: '30%', left: '30%' }}></div>
            <div className="absolute top-40% left-40% w-20% h-20% border border-white/10 rounded-full" style={{ width: '20%', height: '20%', top: '40%', left: '40%' }}></div>
          </motion.div>
        </div>
      </main>
    </ReactLenis>
  );
}