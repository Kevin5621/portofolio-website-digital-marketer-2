import { useState } from 'react';
import Image from 'next/image';
import { RevealImage } from '@/components/hooks/RevealImage';
import { useRouter } from 'next/navigation';
import { BrandData } from '../types';

interface IntroSectionProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
  navigateToSection: (index: number) => void;
}

export const IntroSection = ({ 
  brandData, 
  sectionViewed, 
  registerSection, 
  navigateToSection 
}: IntroSectionProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [bottomImageHovered, setBottomImageHovered] = useState(false);

  return (
    <section 
      ref={(el) => registerSection(el as HTMLDivElement | null, 0)} 
      className="min-h-screen flex flex-col relative"
      id="intro-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
        {/* Left Side Content */}
        <div className={`md:col-span-5 flex items-center p-8 md:pl-24 md:pr-12 relative transition-all duration-1000 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-8 max-w-md">
            <div className="space-y-4">
              <div className={`inline-block py-1 px-2 border border-red-500 text-red-500 text-xs uppercase tracking-widest transition-all duration-700 delay-300 ${sectionViewed[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                Digital Marketing Campaign
              </div>
              
              <h1 className={`text-6xl md:text-7xl font-light text-stone-900 leading-none transition-all duration-700 delay-500 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="block">{brandData.name}</span>
                <span className="relative inline-block">
                  <span className={`block absolute -bottom-2 left-0 w-16 h-1 bg-red-500 transition-all duration-700 delay-700 ${sectionViewed[0] ? 'opacity-100 w-16' : 'opacity-0 w-0'}`}></span>
                </span>
              </h1>
              
              <p className={`text-sm text-stone-500 uppercase tracking-widest transition-all duration-700 delay-700 ${sectionViewed[0] ? 'opacity-100' : 'opacity-0'}`}>
                {brandData.timeframe}
              </p>
            </div>
            
            <p className={`text-stone-600 font-light leading-relaxed transition-all duration-700 delay-900 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {brandData.description}
            </p>
            
            <div className={`pt-6 transition-all duration-700 delay-1000 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button 
                className="group relative inline-flex items-center text-sm font-medium uppercase tracking-widest"
                onClick={() => navigateToSection(1)}
              >
                <span className="text-stone-900 group-hover:text-red-500 transition-colors duration-300">View Case Study</span>
                <span className="ml-3 w-8 h-px bg-stone-900 group-hover:w-12 group-hover:bg-red-500 transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Asymmetric Grid */}
        <div className="md:col-span-7 grid grid-cols-12 grid-rows-6 h-screen">
          <div 
            className={`col-span-12 row-span-4 relative bg-stone-200 transition-all duration-1000 overflow-hidden ${sectionViewed[0] ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="h-full w-full relative overflow-hidden">
              <Image
                src="/project/cover5.jpg"
                alt="Ortust Hero"
                fill
                className={`object-cover object-center transition-transform duration-1500 ${sectionViewed[0] ? 'scale-100' : 'scale-110'}`}
                loading="eager"
              />
              <div className="absolute inset-0 bg-red-500 mix-blend-multiply opacity-10"></div>
            </div>
            
            {/* Reveal image on hover */}
            <RevealImage 
              isVisible={isHovered}
              imageSrc="/project/reveal-cover/reveal-cover5.png"
              imageAlt="benjasimen Hero Reveal"
              initialScale={0.5}
              finalScale={1}
              width="200px"
              height="200px"
              transitionDuration={0.3}
              className="z-50"
            />
          </div>
          <div className={`col-span-6 row-span-2 relative bg-red-500 transition-all duration-700 delay-300 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-full w-full flex items-center justify-center">
              <div className="font-light text-white text-3xl tracking-widest">{brandData.name}</div>
            </div>
          </div>
          <div 
            className={`col-span-6 row-span-2 relative bg-stone-800 transition-all duration-700 delay-500 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} cursor-pointer`}
            onMouseEnter={() => setBottomImageHovered(true)}
            onMouseLeave={() => setBottomImageHovered(false)}
            onClick={() => router.push('/project/ortist')}
          >
            <div className="h-full w-full relative overflow-hidden">
              <Image
                src="/project/cover2.jpg"
                alt="benjasimen Product"
                fill
                className={`object-cover transition-all duration-500 ${bottomImageHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal scroll indicator */}
      <div className={`absolute bottom-8 right-8 flex items-center text-stone-500 text-xs uppercase tracking-widest transition-all duration-700 delay-1200 ${sectionViewed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="mr-2">Scroll</span>
        <div className="w-8 h-px bg-stone-300"></div>
      </div>
    </section>
  );
};