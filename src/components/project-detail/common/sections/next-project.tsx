import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RevealImage } from '@/components/hooks/RevealImage';
import { useRouter } from 'next/navigation';
import { BrandData } from '../types';

interface NextProjectProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
  nextProjectHovered: boolean;
  setNextProjectHovered: (value: boolean) => void;
}

export const NextProjectSection = ({ 
  brandData, 
  sectionViewed, 
  registerSection,
  nextProjectHovered,
  setNextProjectHovered
}: NextProjectProps) => {
  const router = useRouter();
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class
  
  // Navigate to next project
  const handleNavigate = () => {
    router.push(`/project/${brandData.nextProject.id}`);
  };

  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 7)} 
      className="min-h-screen flex flex-col relative bg-gray-dark"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
        {/* Left Side Content */}
        <div className={`md:col-span-5 flex items-center p-8 md:pl-24 md:pr-12 relative transition-all duration-1000 ${sectionViewed[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-8 max-w-md">
            <div className="space-y-4">
              <p className={`text-${colorClass} uppercase tracking-widest mb-3 text-sm transition-all duration-700 delay-300 ${sectionViewed[7] ? 'opacity-100' : 'opacity-0'}`}>
                Next Project
              </p>
              
              <h2 className={`text-6xl md:text-7xl font-light text-white leading-none transition-all duration-700 delay-500 ${sectionViewed[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="block">{brandData.nextProject.name}</span>
                <span className="relative inline-block">
                  <span className={`block absolute -bottom-2 left-0 w-16 h-1 bg-${colorClass} transition-all duration-700 delay-700 ${sectionViewed[7] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </span>
              </h2>
            </div>
            
            <div className={`pt-6 transition-all duration-700 delay-1000 ${sectionViewed[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button 
                className={`group relative inline-flex items-center text-sm font-medium uppercase tracking-widest text-${colorClass}`}
                onClick={handleNavigate}
              >
                View Project
                <svg className={`ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-7 h-screen relative">
          <Link 
            href={`/project/${brandData.nextProject.id}`}
            className={`absolute inset-0 bg-gray-800 transition-all duration-1000 overflow-hidden ${sectionViewed[7] ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={() => setNextProjectHovered(true)}
            onMouseLeave={() => setNextProjectHovered(false)}
          >
            <div className="h-full w-full relative overflow-hidden">
              <Image
                src={brandData.nextProject.coverImage}
                alt={`${brandData.nextProject.name} Cover`}
                fill
                className={`object-cover object-center transition-transform duration-1500 ${sectionViewed[7] ? 'scale-100' : 'scale-110'}`}
                loading="eager"
              />
              <div className={`absolute inset-0 bg-${colorClass} mix-blend-multiply opacity-10`}></div>
            </div>
            
            {/* Reveal image on hover */}
            <RevealImage 
              isVisible={nextProjectHovered}
              imageSrc={brandData.nextProject.revealImage}
              imageAlt={`${brandData.nextProject.name} Reveal`}
              initialScale={0.5}
              finalScale={1}
              width="200px"
              height="200px"
              transitionDuration={0.3}
              className="z-50"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};