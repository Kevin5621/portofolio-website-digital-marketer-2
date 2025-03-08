'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';

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
      description: 'Innovative aerospace design and engineering solutions'
    },
    {
      title: 'Benjasimen Samapta',
      route: '/project/5-benjasimen-samapta',
      image: '/project/cover5.jpg',
      backgroundImage: '/project/cover5.jpg', 
      description: 'Strategic brand identity and visual communication'
    },
    {
      title: 'Ortist Specialist',
      route: '/project/ortist',
      image: '/project/cover2.jpg',
      backgroundImage: '/project/cover2.jpg',
      description: 'Professional healthcare marketing and branding'
    },
    {
      title: 'Kronju',
      route: '/project/kronju',
      image: '/project/cover1.jpg',
      backgroundImage: '/project/cover1.jpg',
      description: 'Creative digital solutions and brand development'
    },
    {
      title: 'Rumah Bahasa Asing',
      route: '/project/3-rumah-bahasa-asing',
      image: '/project/cover3.jpg',
      backgroundImage: '/project/cover3.jpg',
      description: 'Educational platform design and marketing strategy'
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
    <main className="min-h-screen bg-gray-50">
      <Navbar variant="dark" />
      
      <div className="pt-36 pb-12 px-8 max-w-7xl mx-auto">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-primary mb-6 tracking-tight">Projects</h1>
          <div className="h-px w-12 bg-stone-400"></div>
          <p className="mt-8 text-stone-600 max-w-lg font-light leading-relaxed">
            Explore our portfolio of creative work across various industries. Each project represents our commitment to excellence and innovative solutions.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="flex flex-col"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.title}
            project={project}
            index={index}
            isActive={activeProject === index}
            onHover={() => setActiveProject(index)}
            onLeave={() => setActiveProject(null)}
          />
        ))}
      </motion.div>
    </main>
    </ReactLenis>
  );
}

// Separate component for each project item with its own scroll-based parallax
const ProjectItem = ({ 
  project, 
  index, 
  isActive,
  onHover,
  onLeave
}: { 
  project: Project; 
  index: number; 
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const ref = useRef(null);
  const isOdd = index % 2 !== 0;

  // Using framer-motion's useScroll for smooth parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax effect
  const parallaxY = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", "-15%"]
  );

  return (
    <motion.div 
      ref={ref}
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }
        }
      }}
    >
      {isOdd ? (
        // Clean minimalist layout for odd-indexed items 
        <div className="relative py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
                />
              </div>
              <div className="p-2">
                <h2 className="text-2xl font-light text-stone-900 mb-6 tracking-tight transition-colors duration-300 group-hover:text-stone-700">
                  {project.title}
                </h2>
                <div className="h-px w-8 bg-stone-300 mb-6"></div>
                <p className="text-stone-600 font-light mb-8">{project.description}</p>
                <Link href={project.route} className="inline-block px-6 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors duration-300 text-sm uppercase tracking-wider">
                  View Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Full background layout with enhanced parallax for even-indexed items
        <Link href={project.route} className="block">
          <div className="relative h-screen w-full overflow-hidden">
            {/* Full background image with parallax effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.div 
                className="w-full h-[120%] absolute top-0 left-0"
                style={{ y: parallaxY }}
              >
                <Image
                  src={project.backgroundImage}
                  alt={`${project.title} background`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-stone-900/50"></div>
              </motion.div>
            </div>
            
            {/* Centered content with minimalist approach */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
              <motion.div 
                className="max-w-3xl w-full mx-auto px-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center p-8 bg-white/90 backdrop-blur-sm max-w-md mx-auto">
                  <h2 className="text-2xl font-light text-stone-900 mb-4 tracking-tight transition-colors duration-300 group-hover:text-stone-700">
                    {project.title}
                  </h2>
                  <div className="h-px w-8 bg-stone-300 mx-auto mb-4"></div>
                  <p className="text-stone-600 font-light">{project.description}</p>
                  
                  <div className="mt-6 text-sm uppercase tracking-wider text-stone-500">
                    View Project
                    <div className="h-px w-0 bg-stone-400 mx-auto mt-1 group-hover:w-16 transition-all duration-500"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Link>
      )}
    </motion.div>
  );
};