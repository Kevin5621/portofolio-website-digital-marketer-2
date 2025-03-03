"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './styles/Contact.module.css';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hasEntered, setHasEntered] = useState(false);
  
  // Vertical blinds animation setup
  const numberOfBlinds = 12;
  const blinds = Array.from({ length: numberOfBlinds });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]);
  
  useEffect(() => {
    if (isInView && !hasEntered) {
      setHasEntered(true);
    };
  }, [isInView, hasEntered]);
  
  const contactItems = [
    {
      title: "Email Address",
      value: "ekaadharabusiness@gmail.com",
      href: "mailto:ekaadharabusiness@gmail.com",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Whatsapp",
      value: "+62 896-9734-6868",
      href: "https://api.whatsapp.com/send?phone=6289697346868",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      )
    },
    {
      title: "Instagram",
      value: "@adhara.eka",
      href: "https://www.instagram.com/adhara.eka",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="6" r="1" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <div className={styles.contactSection} id="contact" ref={sectionRef}>
      {/* Vertical blinds transition effect */}
      <div className={styles.blindsContainer}>
        {blinds.map((_, index) => (
          <motion.div
            key={index}
            className={styles.blind}
            initial={{ height: "100%", y: "-100%" }}
            animate={isInView ? { y: "100%" } : { y: "-100%" }}
            transition={{
              duration: 1.2,
              delay: 0.05 * index,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              left: `${(index / numberOfBlinds) * 100}%`,
              width: `${100 / numberOfBlinds}%`
            }}
          />
        ))}
      </div>

      <motion.div 
        className={styles.pageContainer} 
        ref={containerRef}
        style={{ opacity, scale }}
      >
        <div className={styles.customCursor} ref={cursorRef}>
          <div className={styles.cursorDot}></div>
          <div className={styles.cursorRing}></div>
        </div>
        
        <div className={styles.noise}></div>
        
        <motion.h1 
          className={styles.glitchTitle}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          CONTACT
          <span className={styles.glitchLayer}>CONTACT</span>
          <span className={styles.glitchLayer}>CONTACT</span>
        </motion.h1>

        <div className={styles.contactGrid}>
          {contactItems.map((item, index) => (
            <motion.a 
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0, delay: 0}}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}
            >
              <div className={styles.iconContainer}>
                {item.icon}
                <div className={styles.pulseRing}></div>
              </div>
              <div className={styles.contactInfo}>
                <h3>{item.title}</h3>
                <p className={styles.typewriter}>{item.value}</p>
              </div>
              <div className={styles.cornerDecoration}></div>
            </motion.a>
          ))}
        </div>

        <svg className={styles.wavyPath} width="100%" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,100 L0,100 Z" fill="black" opacity="0.1"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default Contact;