import React, { useEffect, useRef } from 'react';
import { BrandData } from '../types';
import { motion, useInView, useScroll } from 'framer-motion';

interface ApproachProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ApproachSection = ({ brandData, sectionViewed, registerSection }: ApproachProps) => {
  const sectionRef = useRef(null);
  const methodRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isMethodInView = useInView(methodRef, { once: true, amount: 0.5 });
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class
  
  // Register this section with parent component
  useEffect(() => {
    if (sectionRef.current) {
      registerSection(sectionRef.current, 4);
    }
  }, [registerSection]);

  // Check if section 3 is viewed to trigger result showcase rendering
  const shouldRenderMethodShowcase = sectionViewed && sectionViewed[3];
  
  // Scroll animation values
  useScroll({
        target: methodRef,
        offset: ["start end", "end start"]
    });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-stone-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className={`md:col-span-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className={`text-${colorClass} uppercase tracking-widest mb-3 text-sm`}>Process</p>
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
              Marketing Method
              <span className={`block absolute -bottom-2 left-0 h-px bg-${colorClass} transition-all duration-700 delay-300 ${isInView ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
            </h2>
          </div>
          <p className={`text-stone-600 font-light leading-relaxed md:col-span-6 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {brandData.marketingMethod.description}
          </p>
        </div>
        
        {/* Marketing Method Steps */}
        <div ref={methodRef} className="mt-16">
          {shouldRenderMethodShowcase && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isMethodInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {brandData.marketingMethod.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 shadow-sm"
                >
                  <div className={`text-${colorClass} text-5xl font-light mb-6`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-medium text-stone-900 mb-4">{step.title}</h3>
                  <p className="text-stone-600 font-light">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Challenges and Solutions (if available) */}
        {brandData.challenges && brandData.solutions && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Challenges */}
            <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className={`text-2xl font-light text-stone-900 mb-6 flex items-center`}>
                <svg className={`w-6 h-6 mr-2 text-${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Challenges
              </h3>
              <ul className="space-y-4">
                {brandData.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`inline-block w-2 h-2 rounded-full bg-${colorClass} mt-2 mr-3 flex-shrink-0`}></span>
                    <span className="text-stone-600 font-light">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Solutions */}
            <div className={`transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className={`text-2xl font-light text-stone-900 mb-6 flex items-center`}>
                <svg className={`w-6 h-6 mr-2 text-${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Solutions
              </h3>
              <ul className="space-y-4">
                {brandData.solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`inline-block w-2 h-2 rounded-full bg-${colorClass} mt-2 mr-3 flex-shrink-0`}></span>
                    <span className="text-stone-600 font-light">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};