"use client"

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const CertificateAndExperience = () => {
  const scrollRef = useRef(null);
  
  // Certificate data
  const certificates = [
    {
      logo: "/videolabs-logo.png",
      title: "Videolabs",
      description: "Videography & Video Editing Course"
    },
    {
      logo: "/kelasbos-logo.png",
      title: "Kelasbos",
      description: "Digital Marketing Bootcamp"
    },
    {
      logo: "/syca-logo.png",
      title: "Syca Academy",
      description: "Content Marketer Course"
    }
  ];
  
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

  // For subtle parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="font-sans bg-white" ref={scrollRef}>
        {/* Certificate Section */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.h2 
              className="text-3xl md:text-4xl font-normal tracking-tight text-center text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Certifications
            </motion.h2>
            
            <motion.div
              className="w-16 h-px bg-gray-400 mx-auto mb-16"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-100 p-6 rounded-sm hover:shadow-sm transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-5 relative h-12 w-full flex items-center justify-start">
                    <div className="relative h-10 w-10">
                      <Image
                        src={cert.logo}
                        alt={`${cert.title} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1 text-gray-900">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="bg-gray-50 py-20 md:py-24 relative overflow-hidden">
          {/* Subtle background with minimal parallax effect */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 opacity-50"></div>
          </motion.div>

          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-normal tracking-tight text-center text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Work Experience
            </motion.h2>
            
            <motion.div
              className="w-16 h-px bg-gray-400 mx-auto mb-16"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
            
            <div className="relative">
              {/* Timeline line - more subtle */}
              <div className="absolute left-0 md:left-1/2 h-full w-px bg-gray-300 transform -translate-x-1/2"></div>
              
              {/* Experience items */}
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col md:flex-row mb-16 relative ${index % 2 === 0 ? 'md:text-right' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot - smaller and more subtle */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-gray-400 rounded-full transform -translate-x-1/2 z-10 mt-1"></div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pl-6 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{exp.period}</p>
                    <h3 className="text-lg font-medium mb-1 text-gray-900">{exp.role}</h3>
                    <p className="text-base mb-3 text-gray-700">{exp.company}</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex">
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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