import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-zinc-900 overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/placeholder.png" 
          alt="Profile portrait" 
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="grayscale opacity-90"
          priority
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Centered content overlay */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        <div className="text-center">
          {/* Large AUST, text */}
          <h1 className="text-white text-8xl md:text-9xl font-serif tracking-tight leading-none">
            Adhara<span className="text-white">,</span>
          </h1>
          
          <div className="flex justify-end -mt-4 mr-6">
            <h2 className="text-white text-3xl italic font-light">Eka</h2>
          </div>
          
          <div className="mt-8 text-white uppercase tracking-widest text-center">
            <p className="font-light text-sm">Digital</p>
            <p className="font-light text-sm">Marketing</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;