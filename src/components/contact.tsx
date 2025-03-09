"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './styles/Contact.module.css';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.98, 1]);
  
  const contactItems = [
    {
      title: "EMAIL",
      value: "ekaadharabusiness@gmail.com",
      href: "mailto:ekaadharabusiness@gmail.com",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "WHATSAPP",
      value: "+62 896-9734-6868",
      href: "https://api.whatsapp.com/send?phone=6289697346868",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      )
    },
    {
      title: "INSTAGRAM",
      value: "@adhara.eka",
      href: "https://www.instagram.com/adhara.eka",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="6" r="1" fill="currentColor"/>
        </svg>
      )
    }
  ];

  // Items for the infinite slider
  const sliderItems = [
    "GET IN TOUCH", "CONNECT", "COLLABORATE", "REACH OUT", "CONTACT"
  ];

  // Animation for the infinite slider
  const sliderVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={styles.contactSection} id="contact" ref={sectionRef}>
      {/* Replaced Marquee with Infinite Slider */}
      <div className={styles.sliderContainer}>
        <motion.div 
          className={styles.sliderTrack}
          variants={sliderVariants}
          animate="animate"
          ref={sliderRef}
        >
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className={styles.sliderGroup}>
              {sliderItems.map((item, index) => (
                <React.Fragment key={`${groupIndex}-${index}`}>
                  <div className={styles.sliderItem}>{item}</div>
                  <div className={`${styles.sliderItem} ${styles.sliderDot}`}>•</div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.contactContainer}
        style={{ opacity, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.contactHeaderContainer}>
          <motion.h1 
            className={styles.contactHeading}
            initial={{ y: -50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            CONTACT
          </motion.h1>
          <motion.div 
            className={styles.headerUnderline}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        <div className={styles.contactCardsGrid}>
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactCard} ${hoveredItem === index ? styles.cardActive : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <motion.div 
                    className={styles.iconBox}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className={styles.titleBox}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <motion.div 
                      className={styles.titleUnderline}
                      initial={{ width: "0%" }}
                      animate={hoveredItem === index ? { width: "100%" } : { width: "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
                
                <div className={styles.valueContainer}>
                  <p className={styles.contactValue}>{item.value}</p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.connectText}>CONNECT</div>
                  <motion.div 
                    className={styles.arrowIcon}
                    animate={hoveredItem === index ? { x: 5 } : { x: 0 }}
                    transition={{ duration: 0.3, repeat: hoveredItem === index ? Infinity : 0, repeatType: "reverse" }}
                  >
                    →
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className={styles.cardBackground}
                initial={{ scale: 0, opacity: 0 }}
                animate={hoveredItem === index ? { scale: 1, opacity: 0.05 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
      
      {/* Enhanced Footer with Better Visibility */}
      <div className={styles.contactFooter}>
        <motion.div 
          className={styles.footerLine}
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.2, delay: 1 }}
        />
        <motion.p 
          className={styles.footerText}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          LET&apos;S CREATE SOMETHING AMAZING TOGETHER
        </motion.p>
      </div>
    </div>
  );
};

export default Contact;