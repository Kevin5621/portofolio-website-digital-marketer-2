"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import "./styles/Navbar.css";

const Navbar = () => {
  // Fix the type of activeItem state to allow string or null
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent background scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          <span className="text-2xl">A</span>
        </Link>
        
        <button 
          onClick={toggleMenu}
          className={`menu-button ${isOpen ? "open" : ""}`}
          aria-label="Menu"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div 
        className={`fixed inset-0 menu-background text-white transition-opacity duration-500 ease-in-out z-[100] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="grid-background absolute inset-0 opacity-20"></div>
        
        <div className="menu-container">
          <div className="py-4 px-6 flex justify-between items-center">
            {/* Removed the A logo from here */}
            <div className="w-10 h-10"></div> {/* Empty div for spacing */}
            <button 
              onClick={toggleMenu}
              className="close-button"
              aria-label="Close menu"
            >
              {/* X icon is created with CSS */}
            </button>
          </div>
          
          <div className="menu-content">
            <div className="w-full lg:w-3/4 flex flex-col justify-center">
              <div className="space-y-6 px-6">
                <Link 
                  href="/" 
                  onClick={toggleMenu} 
                  className="block fade-in delay-1"
                  onMouseEnter={() => setActiveItem('home')}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="flex items-baseline group">
                    <span className="text-sm text-gray-400 mr-4 transition-all group-hover:text-white">01</span>
                    <span className={`menu-item menu-text font-bold tracking-tighter transition-all ${activeItem === 'home' ? 'active' : ''}`}>HOME</span>
                  </div>
                </Link>
                <Link 
                  href="/about" 
                  onClick={toggleMenu} 
                  className="block fade-in delay-2"
                  onMouseEnter={() => setActiveItem('about')}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="flex items-baseline group">
                    <span className="text-sm text-gray-400 mr-4 transition-all group-hover:text-white">02</span>
                    <span className={`menu-item menu-text font-bold tracking-tighter transition-all ${activeItem === 'about' ? 'active' : ''}`}>ABOUT</span>
                  </div>
                </Link>
                <Link 
                  href="/work" 
                  onClick={toggleMenu} 
                  className="block fade-in delay-3"
                  onMouseEnter={() => setActiveItem('work')}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="flex items-baseline group">
                    <span className="text-sm text-gray-400 mr-4 transition-all group-hover:text-white">03</span>
                    <span className={`menu-item menu-text font-bold tracking-tighter transition-all ${activeItem === 'work' ? 'active' : ''}`}>WORK</span>
                  </div>
                </Link>
                <Link 
                  href="/contact" 
                  onClick={toggleMenu} 
                  className="block fade-in delay-4"
                  onMouseEnter={() => setActiveItem('contact')}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="flex items-baseline group">
                    <span className="text-sm text-gray-400 mr-4 transition-all group-hover:text-white">04</span>
                    <span className={`menu-item menu-text font-bold tracking-tighter transition-all ${activeItem === 'contact' ? 'active' : ''}`}>CONTACT</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex w-1/4 flex-col justify-between border-l border-gray-700">
              <div className="mt-20 p-6">
                <h3 className="text-lg font-bold mb-3 opacity-60">GET IN TOUCH</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Let&apos;s create something amazing together.</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <a href="mailto:hey@adhara.com" className="text-gray-400 hover:text-white transition-colors">hey@adhara.com</a>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;