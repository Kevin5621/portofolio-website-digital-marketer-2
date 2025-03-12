import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RevealImage } from '@/components/hooks/RevealImage';
import { useRouter } from 'next/navigation';

interface NextProjectProps {
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
  nextProjectHovered: boolean;
  setNextProjectHovered: (value: boolean) => void;
}

export const NextProjectSection = ({ 
  sectionViewed, 
  registerSection,
  nextProjectHovered,
  setNextProjectHovered
}: NextProjectProps) => {
  const router = useRouter();
  
  // Referensi langsung ke section yang sedang dilihat
  const isVisible = sectionViewed[6];
  
  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 7)}
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Desktop background layout */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block bg-stone-100"></div>
        <div 
          className="relative cursor-pointer hidden md:block"
          onMouseEnter={() => setNextProjectHovered(true)}
          onMouseLeave={() => setNextProjectHovered(false)}
          onClick={() => router.push('/project/binjasiimen-samapta')}
        >
          <div className="z-10 absolute inset-0 overflow-hidden">
            <Image
              src="/project/cover5.jpg"
              alt="Next Project"
              fill
              className={`object-cover object-center transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-110'} ${nextProjectHovered ? 'scale-110' : 'scale-100'}`}
              priority
            />
            <div className={`absolute inset-0 bg-stone-900/20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
          
          {/* Reveal image on hover */}
          <RevealImage 
            isVisible={nextProjectHovered}
            imageSrc="/project/reveal-cover/reveal-cover5.png"
            imageAlt="aerospace Project Reveal"
            initialScale={0.5}
            finalScale={1}
            width="200px"
            height="200px"
            transitionDuration={0.3}
            className="z-50"
          />
        </div>
      </div>
      
      {/* Mobile background with overlay */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/project/cover5.jpg"
            alt="Next Project Background"
            fill
            className={`object-cover object-center transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-110'}`}
            priority
          />
          {/* Gradient overlay to make text readable */}
          <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
      
      {/* Content container */}
      <div className="relative max-w-6xl w-full px-6 grid md:grid-cols-2 gap-24">
        <div className="flex flex-col justify-center md:order-1">
          <p className={`text-purple-500 md:text-purple-500 uppercase tracking-widest mb-3 text-sm transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>Next Case</p>
          <h2 className={`text-4xl md:text-5xl font-light text-white md:text-stone-900 mb-6 md:mb-8 max-w-md transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            Discover Our Next Project
          </h2>
          <Link 
            href="/project/aerospace" 
            className={`group inline-flex items-center text-sm font-medium uppercase tracking-widest transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <span className="text-white md:text-stone-900 group-hover:text-purple-500 transition-colors duration-300">Binjasiimen Samapta</span>
            <span className="ml-3 w-8 h-px bg-white md:bg-stone-900 group-hover:w-12 group-hover:bg-purple-500 transition-all duration-300"></span>
          </Link>
        </div>
        
        {/* Mobile interactive element */}
        <div className="md:hidden flex justify-center items-center mt-8">
          <div 
            className={`relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/50 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} cursor-pointer`}
            onMouseEnter={() => setNextProjectHovered(true)}
            onMouseLeave={() => setNextProjectHovered(false)}
          onClick={() => router.push('/project/binjasiimen-samapta')}
          >
            <Image
              src="/project/reveal-cover/reveal-cover5.png"
              alt="Next Project"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900/30 hover:bg-stone-900/10 transition-all duration-300">
              <span className="text-white text-xs font-medium uppercase tracking-wider">View</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};