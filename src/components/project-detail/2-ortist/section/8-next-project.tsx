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
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block bg-stone-100"></div>
        <div 
          className="relative cursor-pointer"
          onMouseEnter={() => setNextProjectHovered(true)}
          onMouseLeave={() => setNextProjectHovered(false)}
          onClick={() => router.push('/project/ortist')}
        >
          <div className="z-50 absolute inset-0 overflow-hidden">
            <Image
              src="/project/cover2.jpg"
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
            imageSrc="/project/reveal-cover/reveal-cover2.png"
            imageAlt="Ortist Project Reveal"
            initialScale={0.5}
            finalScale={1}
            width="200px"
            height="200px"
            transitionDuration={0.3}
            className="z-50"
          />
        </div>
      </div>
      
      <div className="relative max-w-6xl w-full px-6 grid md:grid-cols-2 gap-24">
        <div className="flex flex-col justify-center">
          <p className={`text-blue-500 uppercase tracking-widest mb-3 text-sm transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>Next Case</p>
          <h2 className={`text-5xl font-light text-stone-900 mb-8 max-w-md transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            Discover Our Next Project
          </h2>
          <Link 
            href="/project/ortist" 
            className={`group inline-flex items-center text-sm font-medium uppercase tracking-widest transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <span className="text-stone-900 group-hover:text-blue-500 transition-colors duration-300">Ortist Specialist</span>
            <span className="ml-3 w-8 h-px bg-stone-900 group-hover:w-12 group-hover:bg-blue-500 transition-all duration-300"></span>
          </Link>
        </div>
        <div 
          className={`md:hidden aspect-video relative overflow-hidden transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} cursor-pointer`}
          onMouseEnter={() => setNextProjectHovered(true)}
          onMouseLeave={() => setNextProjectHovered(false)}
          onClick={() => router.push('/project/ortist')}
        >
          <Image
            src="/project/cover2.jpg"
            alt="Next Project"
            fill
            className={`object-cover object-center transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-110'} ${nextProjectHovered ? 'scale-110' : 'scale-100'}`}
            priority
          />
          <div className={`absolute inset-0 bg-stone-900/20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
    </section>
  );
};