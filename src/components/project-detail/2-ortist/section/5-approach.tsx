import React from 'react';
import Image from 'next/image';
import { BrandData } from '../types';

interface ApproachProps {
  brandData: BrandData;
  sectionViewed: boolean[];
  registerSection: (el: HTMLDivElement | null, index: number) => void;
}

export const ApproachSection = ({ brandData, registerSection }: ApproachProps) => {
  return (
    <section ref={(el) => registerSection(el as HTMLDivElement | null, 4)} className="h-screen flex bg-stone-100">
        {/* Image Section - Left */}
            <div className="w-1/2 h-full relative">
            <Image
                src="/project/project-detail/2-Ortist/cover-produk.jpg"
                alt="Marketing Campaign Preview"
                layout="fill"
                objectFit="cover"
                className="object-center"
                priority={false}
            />
            </div>

            {/* Text Section - Right */}
            <div className="w-1/2 flex flex-col justify-center px-12">
            <p className="text-blue-500 uppercase tracking-widest mb-3 text-sm">Method</p>
            
            {/* Menggunakan title dari brandData */}
            <h2 className="text-4xl font-light text-stone-900 mb-6 relative">
                {brandData.marketingMethod.title}
                <span className="block absolute -bottom-2 left-0 h-px bg-blue-500 w-16"></span>
            </h2>

            {/* Menggunakan description dari brandData */}
            <p className="text-stone-600 font-light leading-relaxed mb-12">
                {brandData.marketingMethod.description}
            </p>

            {/* Mapping steps dari brandData */}
            <div className="space-y-12">
                {brandData.marketingMethod.steps.map((step, index) => (
                <div key={index} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-6 h-px bg-blue-500"></div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">{step.title}</h3>
                    <p className="text-stone-600 font-light">{step.description}</p>
                </div>
                ))}
            </div>
        </div>
    </section>
  );
};