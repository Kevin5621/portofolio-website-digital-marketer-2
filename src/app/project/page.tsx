'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';
import { RevealImage } from '@/components/hooks/RevealImage';

interface Project {
  title: string;
  route: string;
  image: string;
  backgroundImage: string;
  description: string;
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      title: 'Aerospace',
      route: '/project/4-aerospace',
      image: '/project/cover4.jpg',
      backgroundImage: '/project/cover4.jpg',
      description: 'Premium men\'s underwear brand focusing on comfort and style'
    },
    {
      title: 'Benjasimen Samapta',
      route: '/project/5-benjasimen-samapta',
      image: '/project/cover5.jpg',
      backgroundImage: '/project/cover5.jpg', 
      description: 'Military preparation training services for aspiring soldiers'
    },
    {
      title: 'Ortist Specialist',
      route: '/project/ortist',
      image: '/project/cover2.jpg',
      backgroundImage: '/project/cover2.jpg',
      description: 'Professional orthodontic services for all ages'
    },
    {
      title: 'Kronju',
      route: '/project/kronju',
      image: '/project/cover1.jpg',
      backgroundImage: '/project/cover1.jpg',
      description: 'Healthy cheese snacks made with natural ingredients'
    },
    {
      title: 'Rumah Bahasa Asing',
      route: '/project/3-rumah-bahasa-asing',
      image: '/project/cover3.jpg',
      backgroundImage: '/project/cover3.jpg',
      description: 'Korean language learning services and cultural programs'
    }
  ];

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <main className="min-h-screen bg-white overflow-hidden">
        <Navbar variant="dark" />
        
        {/* Reveal image that follows cursor */}
        {activeProject !== null && (
          <RevealImage
            isVisible={activeProject !== null}
            imageSrc={projects[activeProject]?.image}
            imageAlt={projects[activeProject]?.title}
            initialScale={0.8}
            finalScale={1}
            width="340px"
            height="240px"
            transitionDuration={0.4}
            className="shadow-lg"
          />
        )}
        
        {/* Header with bold typography */}
        <section className="pt-36 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <h1 className="text-[8vw] md:text-[10vw] font-bold text-black leading-none tracking-tighter overflow-hidden">
                <span className="block">MY</span>
                <span className="block -mt-4">WORK.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-lg text-stone-600 max-w-lg font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore our portfolio of creative work across various industries. Each project represents our commitment to excellence and innovative solutions.
            </motion.p>
          </div>
        </section>
        
        {/* Projects section - List view only */}
        <AnimatePresence>
          <motion.section 
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-8 pb-24"
          >
            <div className="max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <ListProjectItem 
                  key={`list-${project.title}`}
                  project={project}
                  index={index}
                  onHover={() => setActiveProject(index)}
                  onLeave={() => setActiveProject(null)}
                />
              ))}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>
    </ReactLenis>
  );
}

// List view project item
const ListProjectItem = ({ 
  project, 
  index, 
  onHover, 
  onLeave 
}: { 
  project: Project; 
  index: number; 
  onHover: () => void; 
  onLeave: () => void; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, 40]);
  
  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y: translateY }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave();
      }}
      className="border-b border-gray-200 group"
    >
      <Link href={project.route}>
        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-5xl font-bold text-black/20 group-hover:text-black transition-colors duration-300">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight transform group-hover:translate-x-2 transition-transform duration-300">
              {project.title}
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 pl-16 md:pl-0 flex items-center gap-6">
            <p className="text-stone-600 max-w-md hidden md:block">
              {project.description}
            </p>
            
            <motion.div 
              className="w-12 h-12 rounded-full flex items-center justify-center border border-black overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ 
                borderRadius: isHovered ? 8 : 24
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};