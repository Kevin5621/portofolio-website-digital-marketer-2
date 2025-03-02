"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we've scrolled down enough to apply the background
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Handle nav visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Preload fonts
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 py-4 px-6 flex justify-between items-center transition-colors duration-300 ${
          scrolled ? 'bg-white/50 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
        initial="visible"
        animate={navVisible ? "visible" : "hidden"}
        variants={navVariants}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className={`text-xl font-bold ${scrolled ? 'text-black' : 'text-white'}`}>
            <span className="text-2xl">adhara.</span>
          </Link>
        </motion.div>
        
        <div className="hidden md:flex space-x-6">
          {[
            { path: '/', name: 'Home' },
            { path: '/about', name: 'About' },
            { path: '/work', name: 'Work' },
            { path: '/contact', name: 'Contact' }
          ].map((item) => (
            <motion.div
              key={item.name.toLowerCase()}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link 
                href={item.path} 
                className={`font-medium text-sm ${scrolled ? 'text-gray-800 hover:text-black' : 'text-gray-200 hover:text-white'}`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.button 
          onClick={toggleMenu}
          className={`menu-button ${isOpen ? "open" : ""} ${scrolled ? "dark" : "light"} md:hidden`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`menu-line ${scrolled ? 'bg-black' : 'bg-white'}`}></span>
          <span className={`menu-line ${scrolled ? 'bg-black' : 'bg-white'}`}></span>
          <span className={`menu-line ${scrolled ? 'bg-black' : 'bg-white'}`}></span>
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
            ref={menuRef}
          >
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            ></motion.div>
            
            <motion.div 
              className="grid-background absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>
            
            <div className="menu-container">
              <div className="py-4 px-6 flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                </motion.div>
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
                  <div className="space-y-8 px-6">
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
                          onClick={() => {
                            setActiveItem(null);
                            setIsOpen(false);
                          }} 
                          className="block"
                          onMouseEnter={() => setActiveItem(item.id)}
                          onMouseLeave={() => setActiveItem(null)}
                          onFocus={() => setActiveItem(item.id)}
                          onBlur={() => setActiveItem(null)}
                        >
                          <div className="flex items-baseline group relative overflow-hidden">
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
                            <motion.span 
                              className="absolute bottom-0 left-8 w-0 h-0.5 bg-white"
                              animate={{ 
                                width: activeItem === item.id ? "80%" : "0%" 
                              }}
                              transition={{ 
                                duration: 0.3
                              }}
                            />
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
                      <motion.p 
                        className="text-gray-300 font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Book a consultation →
                      </motion.p>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <div className="mb-6">
                      <motion.a 
                        href="mailto:hey@adhara.com" 
                        className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
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
                          delay: 0.1,
                          ariaLabel: "Visit our Instagram"
                        },
                        { 
                          name: 'LinkedIn', 
                          svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </svg>,
                          delay: 0.2,
                          ariaLabel: "Visit our LinkedIn"
                        },
                        { 
                          name: 'Twitter', 
                          svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>,
                          delay: 0.3,
                          ariaLabel: "Visit our Twitter"
                        }
                      ].map((item, index) => (
                        <motion.a 
                          key={index}
                          href="#" 
                          aria-label={item.ariaLabel}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
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
                            rotate: 5
                          }}
                        >
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