"use client"

import Link from 'next/link';
import React, { useState } from 'react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Header */}
      <header className="fixed w-full top-0 px-6 md:px-12 py-6 flex justify-between items-center z-30 bg-light-50/90 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 className="text-neutral-800 font-medium text-xl">
            <Link href="/">adhara.</Link>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="#work" className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors">
            Work
          </Link>
          <Link href="#services" className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors">
            Services
          </Link>
          <Link href="#about" className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-neutral-900 bg-light-100 hover:bg-neutral-200 px-5 py-2 rounded-full text-sm transition-colors">
            Let&apos;s Talk
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-light-50 z-20 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center space-y-8">
              <Link 
                href="#work" 
                className="text-neutral-800 text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
              <Link 
                href="#services" 
                className="text-neutral-800 text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#about" 
                className="text-neutral-800 text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#contact" 
                className="text-neutral-800 text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
    </nav>
  );
};

export default Navbar;