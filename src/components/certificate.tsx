"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const CertificateAndExperience = () => {
  const scrollRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const experienceContentRef = useRef(null);
   
  // Work experience data
  const experiences = [
    {
      period: "April 2023 - May 2023",
      role: "Branding Manager & Graphic Designer",
      company: "Kronju & TMI",
      achievements: [
        "Designed brand positioning and storytelling to enhance product differentiation in the market.",
        "Developed a strong brand identity for Kronju."
      ]
    },
    {
      period: "May 2023 - September 2023",
      role: "Social Media Marketing",
      company: "Ortist Spesialist & TMI",
      achievements: [
        "Created and executed social media strategies for Ortist Spesialist.",
        "Managed Instagram and TikTok growth to improve brand awareness and customer engagement."
      ]
    },
    {
      period: "September 2023 - January 2024",
      role: "Social Media Marketing",
      company: "Rumah Bahasa Asing & TMI",
      achievements: [
        "Created and executed social media strategies for Rumah Bahasa Asing.",
        "Managed Instagram and TikTok growth to improve brand awareness and customer engagement."
      ]
    },
    {
      period: "April 2024 - Present",
      role: "Content Creator & Marketing Consultant",
      company: "Binjasiimen Samapta & FiveX Studio",
      achievements: [
        "Leading content creation and marketing consultation for Binjasiimen Samapta.",
        "Designed online strategies to enhance brand visibility."
      ]
    }
  ];

  // For the whole experience section
  const { scrollYProgress } = useScroll({
    target: experienceSectionRef,
    offset: ["start end", "end start"]
  });
  
  // For the content scroll effect
  useScroll({
        target: experienceContentRef,
        offset: ["start end", "end start"]
    });

  // Subtle background parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="font-sans bg-white" ref={scrollRef}>

        {/* Work Experience Section - Modified to have proper sticky header */}
        <section 
          className="bg-gray-50 relative" 
          ref={experienceSectionRef}
        >
          {/* Fixed Sticky Header - This is the key change */}
          <div className="sticky top-0 bg-white shadow-sm z-30 py-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-normal tracking-tight text-center text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Work Experience
            </motion.h2>
            
            <motion.div
              className="w-16 h-px bg-gray-400 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Subtle background with minimal parallax effect */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 opacity-50"></div>
          </motion.div>

          {/* Scrollable timeline content */}
          <div 
            className="container mx-auto px-4 max-w-4xl relative z-10 py-16" 
            ref={experienceContentRef}
          >
            {/* Timeline container */}
            <div className="relative">
              {/* Timeline line - centered for desktop, left-aligned for mobile */}
              <div className="absolute left-4 md:left-1/2 h-full w-px bg-gray-300 transform md:-translate-x-1/2"></div>
              
              {/* Experience items */}
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  className="mb-16 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gray-400 rounded-full transform md:-translate-x-1/2 z-10 mt-1"></div>
                    
                    {/* Date for mobile - always visible */}
                    <div className="pl-10 md:hidden mb-2">
                      <p className="text-sm text-gray-500 uppercase tracking-wider">{exp.period}</p>
                    </div>
                    
                    {/* Left column - only visible on desktop for even items */}
                    <div className={`hidden md:block md:w-1/2 pr-12 text-right ${index % 2 !== 0 ? 'md:invisible' : ''}`}>
                      {index % 2 === 0 && (
                        <>
                          <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{exp.period}</p>
                          <h3 className="text-lg font-medium mb-1 text-gray-900">{exp.role}</h3>
                          <p className="text-base mb-3 text-gray-700">{exp.company}</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex justify-end">
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                    
                    {/* Right column - for odd items on desktop and all items on mobile */}
                    <div className={`pl-10 md:pl-12 md:w-1/2 ${index % 2 === 0 ? 'md:hidden' : ''}`}>
                      {(
                        <>
                          <p className="hidden md:block text-sm text-gray-500 mb-1 uppercase tracking-wider">{exp.period}</p>
                          <h3 className="text-lg font-medium mb-1 text-gray-900">{exp.role}</h3>
                          <p className="text-base mb-3 text-gray-700">{exp.company}</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex">
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
};

export default CertificateAndExperience;