import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-dark">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display mb-6">About Me</h2>
            <div className="h-1 w-24 bg-primary mb-8"></div>
            <p className="text-light/80 mb-6">
              I&apos;m Adhara Eka, a passionate Digital Marketer with expertise in creating impactful online campaigns that drive growth and engagement. With a background in marketing strategy and digital analytics, I help brands establish a strong online presence and connect with their target audience.
            </p>
            <p className="text-light/80 mb-8">
              My approach combines data-driven insights with creative storytelling to deliver marketing campaigns that not only reach but resonate with your audience, driving measurable results for your business.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 bg-primary text-dark font-medium rounded-sm hover:bg-primary/90 transition-colors">
                Download CV
              </button>
              <button className="px-6 py-3 border border-light/30 text-light hover:border-primary hover:text-primary transition-colors rounded-sm">
                Contact Me
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative h-[500px] w-full md:w-[400px] overflow-hidden">
              <div className="absolute inset-0 border-2 border-primary -rotate-3 z-0"></div>
              <div className="absolute inset-4 bg-gray-dark rotate-3 z-10"></div>
              <div className="absolute inset-4 overflow-hidden rotate-3 z-20">
                <Image 
                  src="/placeholder.png"
                  alt="Adhara Eka"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}