import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-dark overflow-hidden">
      {/* Background image/overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/20 to-dark z-10"></div>
      
      {/* Profile image */}
      <div className="absolute inset-0 z-0" style={{ maxHeight: '100vh' }}>
        <Image 
          src="/placeholder.png"
          alt="Adhara Eka"
          fill
          style={{ 
            objectFit: 'contain',
            objectPosition: 'center'
          }}
          priority
          quality={100}
          className="opacity-50"
        />
      </div>
      
      {/* Text overlay */}
      <div className="container-custom h-full flex flex-col justify-center relative z-20">
        <h1 className="text-[10rem] md:text-[15rem] font-bold leading-none tracking-tighter">
          <span className="block">ADH</span>
          <span className="block -mt-16">ARA,</span>
        </h1>
        <div className="flex items-center">
          <h2 className="text-2xl italic font-display ml-auto mr-4">Eka</h2>
        </div>
        
        <div className="mt-8 md:mt-16">
          <h3 className="uppercase tracking-widest text-xl">
            DIGITAL MARKETER
          </h3>
          <div className="h-0.5 w-32 bg-primary mt-4"></div>
        </div>
      </div>
    </section>
  );
}