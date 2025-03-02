"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    // Preload fonts to avoid layout shifting
    if (typeof document !== 'undefined') {
      // Add Google Fonts link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    // Prevent background scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 w-full z-50 py-4 px-6 flex justify-between items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="text-xl font-bold text-black">
            <span className="text-2xl">A</span>
          </Link>
        </motion.div>
        
        <motion.button 
          onClick={toggleMenu}
          className={`menu-button ${isOpen ? "open" : ""}`}
          aria-label="Menu"
          whileTap={{ scale: 0.95 }}
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </motion.button>
      </motion.nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 menu-background text-white z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="grid-background absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>
            
            <div className="menu-container">
              <div className="py-4 px-6 flex justify-between items-center">
                <div className="w-10 h-10"></div>
                <motion.button 
                  onClick={toggleMenu}
                  className="close-button"
                  aria-label="Close menu"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* X icon is created with CSS */}
                </motion.button>
              </div>
              
              <div className="menu-content">
                <div className="w-full lg:w-3/4 flex flex-col justify-center">
                  <div className="space-y-6 px-6">
                    {[
                      { path: '/', name: 'HOME', index: '01', delay: 0.1, id: 'home' },
                      { path: '/about', name: 'ABOUT', index: '02', delay: 0.2, id: 'about' },
                      { path: '/work', name: 'WORK', index: '03', delay: 0.3, id: 'work' },
                      { path: '/contact', name: 'CONTACT', index: '04', delay: 0.4, id: 'contact' }
                    ].map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: item.delay,
                          ease: "easeOut" 
                        }}
                      >
                        <Link 
                          href={item.path} 
                          onClick={toggleMenu} 
                          className="block"
                          onMouseEnter={() => setActiveItem(item.id)}
                          onMouseLeave={() => setActiveItem(null)}
                        >
                          <div className="flex items-baseline group">
                            <motion.span 
                              className="text-sm text-gray-400 mr-4 transition-all group-hover:text-white"
                              animate={{ 
                                x: activeItem === item.id ? 10 : 0,
                                color: activeItem === item.id ? "#ffffff" : "#9ca3af" 
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.index}
                            </motion.span>
                            <motion.span 
                              className={`menu-item menu-text font-bold tracking-tighter transition-all ${activeItem === item.id ? 'active' : ''}`}
                              animate={{ 
                                scale: activeItem === item.id ? 1.1 : 1,
                                x: activeItem === item.id ? 10 : 0,
                              }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 10 
                              }}
                            >
                              {item.name}
                            </motion.span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <motion.div 
                  className="hidden lg:flex w-1/4 flex-col justify-between border-l border-gray-700"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="mt-20 p-6">
                    <motion.h3 
                      className="text-lg font-bold mb-3 opacity-60"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.6 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      GET IN TOUCH
                    </motion.h3>
                    <motion.div 
                      className="space-y-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <p className="text-gray-400">Let&apos;s create something amazing together.</p>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <div className="mb-4">
                      <motion.a 
                        href="mailto:hey@adhara.com" 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        hey@adhara.com
                      </motion.a>
                    </div>
                    <div className="flex space-x-4">
                      {[
                        { 
                          name: 'Instagram', 
                          svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                              </svg>,
                          delay: 0.1
                        },
                        { 
                          name: 'LinkedIn', 
                          svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </svg>,
                          delay: 0.2
                        },
                        { 
                          name: 'Twitter', 
                          svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>,
                          delay: 0.3
                        }
                      ].map((item, index) => (
                        <motion.a 
                          key={index}
                          href="#" 
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                            delay: 1 + item.delay
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            backgroundColor: "#ffffff",
                            color: "#000000"
                          }}
                        >
                          <span className="sr-only">{item.name}</span>
                          {item.svg}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;