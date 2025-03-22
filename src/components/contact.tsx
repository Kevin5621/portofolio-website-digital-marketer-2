"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const contactItems = [
  {
    title: "EMAIL",
    value: "ekaadharabusiness@gmail.com",
    displayValue: <>ekaadharabusiness<br/>@gmail.com</>,
    href: "mailto:ekaadharabusiness@gmail.com",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "from-blue-500 to-indigo-600",
    lightColor: "bg-blue-50",
    hoverColor: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    title: "WHATSAPP",
    value: "+62 896-9734-6868",
    displayValue: "+62 896-9734-6868",
    href: "https://api.whatsapp.com/send?phone=6289697346868",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </svg>
    ),
    bgColor: "from-green-500 to-emerald-600",
    lightColor: "bg-green-50",
    hoverColor: "bg-green-100",
    iconColor: "text-green-500"
  },
  {
    title: "INSTAGRAM",
    value: "@adhara.eka",
    displayValue: "@adhara.eka",
    href: "https://www.instagram.com/adhara.eka",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="6" r="1" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-pink-500 to-rose-600",
    lightColor: "bg-pink-50",
    hoverColor: "bg-pink-100",
    iconColor: "text-pink-500"
  }
];

const Contact = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <Head>
        <title>Contact | Eka Adhara</title>
        <meta name="description" content="Get in touch with Eka Adhara" />
      </Head>
      
      <div className="min-h-screen relative bg-gray-50 flex flex-col">
        {/* Enhanced background glow effect with radial gradient and animation */}
        {activeItem !== null && (
          <motion.div 
            className="absolute inset-0 transition-opacity duration-700 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${contactItems[activeItem].bgColor} opacity-5`}
            />
            <div 
              className={`absolute w-full h-full top-0 left-0 opacity-10`}
              style={{
                background: `radial-gradient(circle at 50% 50%, ${activeItem === 0 ? 'rgba(59, 130, 246, 0.3)' : 
                  activeItem === 1 ? 'rgba(16, 185, 129, 0.3)' : 
                  'rgba(236, 72, 153, 0.3)'} 0%, transparent 70%)`
              }}
            />
          </motion.div>
        )}
        
        <div className="flex-1 flex items-center justify-center p-4 relative z-10">
          <div className="w-full max-w-4xl">
            <div className="mb-16 text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Let&apos;s Connect
              </motion.h1>
              <motion.p 
                className="text-gray-600 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Feel free to reach out through any of these channels
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <motion.div
                    className={`
                      border border-gray-200 rounded-xl overflow-hidden
                      p-6 h-64 flex flex-col items-center justify-center
                      transition-all relative z-10 bg-white
                      ${activeItem === index ? 'shadow-lg' : 'shadow-sm'}
                    `}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                    }}
                    onHoverStart={() => setActiveItem(index)}
                    onHoverEnd={() => setActiveItem(null)}
                  >
                    <motion.div 
                      className={`
                        absolute w-full h-full top-0 left-0 z-0
                        bg-gradient-to-br ${item.bgColor} rounded-xl transition-opacity duration-300
                      `}
                      animate={{ 
                        opacity: activeItem === index ? 0.15 : 0.1 
                      }}
                    />
                    
                    <div className={`
                      mb-4 transition-all duration-300 relative z-10
                      ${activeItem === index ? item.iconColor : 'text-gray-400'}
                    `}>
                      {item.icon}
                    </div>
                    
                    <h3 className="text-sm font-medium tracking-widest mb-2 text-gray-700 relative z-10">
                      {item.title}
                    </h3>
                    
                    <p className="text-lg font-light text-center mb-6 text-gray-800 relative z-10">
                      {item.displayValue}
                    </p>
                    
                    <div className="flex space-x-2 mt-auto relative z-10">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          py-2 px-4 rounded-md text-sm font-medium text-white
                          bg-gradient-to-r ${item.bgColor} hover:opacity-90 transition-opacity
                        `}
                      >
                        Connect
                      </a>
                      
                      <button
                        onClick={() => handleCopy(item.value, index)}
                        className={`
                          py-2 px-4 rounded-md text-sm font-medium
                          ${item.lightColor} hover:${item.hoverColor} transition-colors
                          relative text-gray-700
                        `}
                      >
                        {copied === index ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 md:mt-24 text-center text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p>Let&apos;s create something amazing together</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;