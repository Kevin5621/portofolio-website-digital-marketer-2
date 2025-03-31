"use client"

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Navbar.css";

type NavbarProps = {
  variant?: 'light' | 'dark';
}

const Navbar = ({ variant = 'light' }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [textColor, setTextColor] = useState(variant === 'light' ? "text-white" : "text-gray-800");
  const [, setCurrentPath] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize current path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Handle scroll events for navbar behavior with debounce
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determine if we've scrolled down enough to apply the background
    if (currentScrollY > 20) {
      setScrolled(true);
      // If it's a light variant, text changes to dark on scroll
      // If it's a dark variant, text stays dark
      setTextColor("text-gray-800");
    } else {
      setScrolled(false);
      // Reset to initial state based on variant
      setTextColor(variant === 'light' ? "text-white" : "text-gray-800");
    }
    
    // Handle nav visibility (hide on scroll down, show on scroll up)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, variant]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const debouncedScrollHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debouncedScrollHandler, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, [handleScroll]);

  // Reset text color when variant changes
  useEffect(() => {
    if (!scrolled) {
      setTextColor(variant === 'light' ? "text-white" : "text-gray-800");
    }
  }, [variant, scrolled]);

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

  // Function to handle navigation and scrolling
  const handleNavigation = (e: React.MouseEvent, path: string, elementId?: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // If we're navigating to a section on the home page
    if (path === '/' && elementId) {
      // If we're already on the home page, just scroll to the element
      if (window.location.pathname === '/') {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // If we're on another page, navigate to home first
        window.location.href = path + '#' + elementId;
      }
    } 
    // If we're navigating to a different page (like /project)
    else if (path !== '/') {
      window.location.href = path;
    }
    // If we're navigating to home without a specific section
    else {
      window.location.href = path;
    }
    
    setActiveItem(null);
    setCurrentPath(path);
  };

  // Determine navbar background color based on variant and scroll state
  const navbarBgClass = scrolled 
    ? "bg-transparent"
    : variant === 'dark' 
      ? "bg-transparent" 
      : "bg-transparent";

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 py-6 px-4 sm:px-8 flex justify-between items-center transition-all duration-500 ${navbarBgClass}`}
        initial="visible"
        animate={navVisible ? "visible" : "hidden"}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="overflow-hidden"
        >
          <Link href="/" onClick={(e) => handleNavigation(e, '/')} className={`text-xl font-bold ${textColor} relative group`}>
            <span className="text-2xl inline-block transition-transform duration-500 ease-out">
              adhara<span className="text-indigo-500">.</span>
            </span>
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
            
        <motion.button 
          onClick={toggleMenu}
          className={`menu-button ${isOpen ? "open" : ""} ${scrolled || variant === 'dark' ? "dark" : "light"}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`menu-line ${scrolled || variant === 'dark' ? 'bg-black' : 'bg-white'}`}></span>
          <span className={`menu-line ${scrolled || variant === 'dark' ? 'bg-black' : 'bg-white'}`}></span>
          <span className={`menu-line ${scrolled || variant === 'dark' ? 'bg-black' : 'bg-white'}`}></span>
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            ref={menuRef}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            
            <motion.div 
              className="grid-background absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            
            <div className="menu-container overflow-auto">
              {/* Menu Header */}
              <div className="py-4 px-6 sm:py-6 sm:px-8 flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl font-bold"
                >
                  <span className="text-2xl inline-block">
                    adhara<span className="text-indigo-500">.</span>
                  </span>
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
              
              {/* Menu Content */}
              <div className="menu-content flex flex-col lg:flex-row px-6 sm:px-8 pb-20 lg:pb-0">
                {/* Main Navigation Links */}
                <div className="w-full lg:w-3/4 flex flex-col justify-center">
                  <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                    {[
                      { path: '/', name: 'HOME', index: '01', delay: 0.1, id: 'home' },
                      { path: '/', name: 'ABOUT', index: '02', delay: 0.2, id: 'about', elementId: 'about-section' },
                      { path: '/project', name: 'PROJECTS', index: '03', delay: 0.3, id: 'project' },
                      { path: '/', name: 'CONTACT', index: '04', delay: 0.4, id: 'contact', elementId: 'contact-section' }
                    ].map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: item.delay,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <Link 
                          href={item.path} 
                          onClick={(e) => handleNavigation(e, item.path, item.elementId)} 
                          className="block"
                          onMouseEnter={() => setActiveItem(item.id)}
                          onMouseLeave={() => setActiveItem(null)}
                          onFocus={() => setActiveItem(item.id)}
                          onBlur={() => setActiveItem(null)}
                        >
                          <div className="flex items-baseline group relative overflow-visible">
                            <motion.span 
                              className="text-xs sm:text-sm text-gray-400 mr-2 sm:mr-4 transition-all group-hover:text-white"
                              animate={{ 
                                x: activeItem === item.id ? 5 : 0,
                                color: activeItem === item.id ? "#ffffff" : "#9ca3af" 
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.index}
                            </motion.span>
                            <motion.span 
                              className={`menu-item menu-text font-bold tracking-tighter transition-all ${activeItem === item.id ? 'active' : ''}`}
                              animate={{ 
                                scale: activeItem === item.id ? 1.05 : 1,
                                x: activeItem === item.id ? 5 : 0,
                              }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 10 
                              }}
                              style={{
                                fontSize: 'clamp(2rem, 5vw, 4rem)',
                                lineHeight: '1.1',
                                paddingRight: '20px'
                              }}
                            >
                              {item.name}
                            </motion.span>
                            <motion.span 
                              className="absolute bottom-0 left-8 w-0 h-0.5 bg-indigo-500"
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

                {/* Contact Section - Desktop */}
                <motion.div 
                  className="hidden lg:flex w-1/4 flex-col justify-between border-l border-gray-800"
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
                      className="space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <p className="text-gray-400">Let&apos;s create something amazing together.</p>
                      <motion.a 
                        href="#contact-section"
                        onClick={(e) => handleNavigation(e, '/', 'contact-section')}
                        className="text-gray-300 font-medium group flex items-center cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Contact us 
                        <motion.span 
                          className="ml-1 inline-block"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            repeatDelay: 1
                          }}
                        >
                          →
                        </motion.span>
                      </motion.a>
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
                        href="mailto:ekaadharabusiness@gmail.com" 
                        className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        ekaadharabusiness@gmail.com
                      </motion.a>
                    </div>
                    <div className="flex space-x-4">
                      {/* WhatsApp Icon */}
                      <motion.a 
                        href="https://api.whatsapp.com/send?phone=6289697346868"
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: 1
                        }}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 5
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
                      </motion.a>
                      
                      {/* Instagram Icon */}
                      <motion.a 
                        href="https://www.instagram.com/adhara.eka"
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: 1.1
                        }}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 5
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="18" cy="6" r="1" fill="currentColor"/>
                        </svg>
                      </motion.a>
                      
                      {/* Email Icon */}
                      <motion.a 
                        href="mailto:ekaadharabusiness@gmail.com"
                        aria-label="Email"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: 1.2
                        }}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 5
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Section - Mobile */}
                <motion.div 
                  className="lg:hidden pt-16 pb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div 
                    className="mb-8 border-t border-gray-800 pt-8"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <h3 className="text-lg font-bold mb-4 text-gray-300">GET IN TOUCH</h3>
                    <p className="text-gray-400 mb-4">Let&apos;s create something amazing together.</p>
                    <a 
                      href="#contact-section"
                      onClick={(e) => handleNavigation(e, '/', 'contact-section')}
                      className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                      Contact us 
                      <span className="ml-1 inline-block">→</span>
                    </a>
                  </motion.div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-gray-400">Email:</span>
                    <a href="mailto:ekaadharabusiness@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                      ekaadharabusiness@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex space-x-3">
                    {/* WhatsApp Icon */}
                    <a 
                      href="https://api.whatsapp.com/send?phone=6289697346868"
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                    </a>
                    
                    {/* Instagram Icon */}
                    <a 
                      href="https://www.instagram.com/adhara.eka"
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="18" cy="6" r="1" fill="currentColor"/>
                      </svg>
                    </a>
                    
                    {/* Email Icon */}
                    <a 
                      href="mailto:ekaadharabusiness@gmail.com"
                      aria-label="Email"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
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