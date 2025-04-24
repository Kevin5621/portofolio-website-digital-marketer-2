import { useState, useEffect, useRef } from 'react';
import { BrandData } from '../types';

interface ExpertiseSectionProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ExpertiseSection = ({ 
  brandData, 
  sectionViewed, 
  registerSection 
}: ExpertiseSectionProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef<number>(0); // Ref untuk menyimpan posisi scroll
  const isAnimatingRef = useRef<boolean>(false); // Ref untuk status animasi
  const colorClass = `${brandData.primaryColor}-500`; // Dynamic color class
  
  // Efek untuk animasi slider dari kanan ke kiri dengan metode yang lebih smooth
  useEffect(() => {
    // Fungsi untuk animasi dengan requestAnimationFrame
    const animate = () => {
      if (!sliderRef.current) return;
      
      const slider = sliderRef.current;
      
      // Increment posisi scroll
      scrollPositionRef.current += 0.5; // Kecepatan scroll (pixel per frame)
      
      // Reset posisi jika sudah mencapai batas
      if (scrollPositionRef.current >= slider.children[0].clientWidth) {
        scrollPositionRef.current = 0;
        // Rotasi elemen pertama ke akhir untuk efek infinite
        const firstChild = slider.children[0];
        slider.appendChild(firstChild.cloneNode(true));
        slider.removeChild(firstChild);
      }
      
      // Terapkan transformasi
      slider.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      
      // Lanjutkan animasi
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Mulai animasi jika belum berjalan
    const startAnimation = () => {
      if (isAnimatingRef.current) return;
      
      isAnimatingRef.current = true;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Mulai animasi ketika section terlihat atau komponen di-mount
    if (sliderRef.current) {
      startAnimation();
    }
    
    // Cleanup saat komponen unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        isAnimatingRef.current = false;
      }
    };
  }, []); // Hapus dependency sectionViewed agar animasi tetap berjalan

  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 1)} className="py-24 px-6 bg-gray-dark">
      <div className="max-w-6xl mx-auto">
        {/* Logo Slider Container dengan efek blur */}
        <div className="overflow-hidden relative">
          {/* Gradient overlay untuk efek blur di kiri */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-dark to-transparent z-10"></div>
          
          {/* Gradient overlay untuk efek blur di kanan */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-dark to-transparent z-10"></div>
          
          {/* Slider Track */}
          <div 
            ref={sliderRef}
            className="flex"
            style={{ width: 'fit-content' }}
          >
            {/* Cards */}
            {brandData.skills.map((skill, index) => (
              <div 
                key={index} 
                className={`relative transition-all duration-700 border border-white-500 mx-2 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  transitionDelay: `${400 + (index * 100)}ms`,
                  minWidth: '250px'
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className={`absolute inset-0 bg-${colorClass} transition-all duration-300 ${hoveredSkill === index ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative z-10 p-8 min-h-40 flex items-center justify-center">
                  <p className={`text-center font-light tracking-wider transition-all duration-300 ${hoveredSkill === index ? 'text-white' : 'text-gray-200'}`}>
                    {skill}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Duplicated cards for smooth infinite scrolling */}
            {brandData.skills.map((skill, index) => (
              <div 
                key={`duplicate-${index}`} 
                className={`relative transition-all duration-700 border border-white-500 mx-2 ${sectionViewed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  transitionDelay: `${400 + ((brandData.skills.length + index) * 100)}ms`,
                  minWidth: '250px'
                }}
                onMouseEnter={() => setHoveredSkill(brandData.skills.length + index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className={`absolute inset-0 bg-${colorClass} transition-all duration-300 ${hoveredSkill === brandData.skills.length + index ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative z-10 p-8 min-h-40 flex items-center justify-center">
                  <p className={`text-center font-light tracking-wider transition-all duration-300 ${hoveredSkill === brandData.skills.length + index ? 'text-white' : 'text-gray-200'}`}>
                    {skill}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};