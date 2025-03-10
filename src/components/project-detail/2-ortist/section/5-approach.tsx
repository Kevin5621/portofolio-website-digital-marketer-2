import React, { useRef } from 'react';
import Image from 'next/image';
import { BrandData } from '../types';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ApproachProps {
  brandData: BrandData;
}

export const ApproachSection = ({ brandData }: ApproachProps) => {
  const sectionRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isBeforeAfterInView = useInView(beforeAfterRef, { once: true, amount: 0.5 });
  
  // Scroll animation values
  const { scrollYProgress } = useScroll({
    target: beforeAfterRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for before image (outside left to final position)
  const beforeX = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["-100%", "-80%"]
  );
  
  // Transform values for after image (outside right to final position)
  const afterX = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["100%", "80%"]
  );
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-neutral-50 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="md:col-span-4 transition-all duration-700"
          >
            <motion.p 
              variants={itemVariants} 
              className="text-blue-500 uppercase tracking-widest mb-3 text-sm"
            >
              Method
            </motion.p>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-light text-stone-900 mb-6 relative">
              {brandData.marketingMethod.title}
              <span className={`block absolute -bottom-2 left-0 h-px bg-blue-500 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </motion.h2>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300"
          >
            {brandData.marketingMethod.description}
          </motion.p>
        </div>

        {/* Steps Grid - Alternative Clean Design with Vertical Flow */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-16 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brandData.marketingMethod.steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  className="group relative overflow-hidden"
                >
                  {/* Top Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-50 opacity-0 
                                group-hover:opacity-100 transition-all duration-700 transform rotate-45"></div>
                  
                  {/* Card with Border Animation */}
                  <div className="bg-white p-8 h-full flex flex-col rounded-lg relative
                                before:absolute before:inset-0 before:rounded-lg
                                before:border before:border-gray-100
                                after:absolute after:inset-0 after:rounded-lg
                                after:border after:border-blue-300 after:scale-105 after:opacity-0
                                group-hover:after:scale-100 group-hover:after:opacity-100
                                after:transition-all after:duration-700">
                    
                    {/* Step Number */}
                    <div className="inline-flex items-center mb-6">
                      <span className="text-4xl font-extralight text-blue-400 mr-2 transition-all duration-500
                                      group-hover:text-blue-500">{index + 1}</span>
                      <div className="h-px w-0 bg-blue-200 transition-all duration-700 group-hover:w-16"></div>
                    </div>
                    
                    <h3 className="text-xl font-medium text-gray-800 mb-4 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 font-light leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Hidden Icon that Appears on Hover */}
                    <div className="mt-6 overflow-hidden h-8">
                      <motion.div 
                        initial={{ y: 40 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center text-blue-500"
                      >
                        <span className="text-sm font-medium mr-2">Learn more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Subtle Dots Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #4B5563 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>
          </div>
        </motion.div>

        {/* Before/After Comparison with 3D effect and scroll animation */}
        <motion.div
          ref={beforeAfterRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={` border-stone-200 pt-16 transition-all duration-700 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl font-light text-neutral-800 mb-12 text-center">Results Showcase</h3>
          
          <div className="relative h-96 md:h-112 mx-auto">
            {/* Before Card - Left side with 20-degree inward tilt + scroll animation */}
            <motion.div 
              className="absolute left-1/2 md:left-1/3 transform -translate-x-full perspective-1000 w-56 md:w-64"
              style={{ 
                x: isBeforeAfterInView ? beforeX : "-100%",
                opacity: isBeforeAfterInView ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div 
                className="relative w-full h-80 md:h-96 shadow-xl rounded-xl overflow-hidden"
                style={{ transform: 'rotateY(20deg)', transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/project/project-detail/2-Ortist/Before.jpg"
                  alt="Before Implementation"
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0"></div>
              </div>
              <div 
                className="mt-4 text-center"
                style={{ transform: 'rotateY(20deg)', transformStyle: 'preserve-3d' }}
              >
                <span className="text-sm font-medium uppercase tracking-wider text-neutral-800">Before</span>
              </div>
            </motion.div>
            
            {/* After Card - Right side with 20-degree inward tilt + scroll animation */}
            <motion.div 
              className="absolute right-1/2 md:right-1/3 transform translate-x-full perspective-1000 w-56 md:w-64"
              style={{ 
                x: isBeforeAfterInView ? afterX : "100%",
                opacity: isBeforeAfterInView ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div 
                className="relative w-full h-50 md:h-96 shadow-xl rounded-xl overflow-hidden"
                style={{ transform: 'rotateY(-20deg)', transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/project/project-detail/2-Ortist/After.jpg"
                  alt="After Implementation"
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0"></div>
              </div>
              <div 
                className="mt-4 text-center"
                style={{ transform: 'rotateY(-20deg)', transformStyle: 'preserve-3d' }}
              >
                <span className="text-sm font-medium uppercase tracking-wider text-neutral-800">After</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};