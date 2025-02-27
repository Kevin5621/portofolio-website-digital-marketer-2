import Image from 'next/image';

export default function Portfolio() {
  const projects = [
    {
      title: "E-commerce Growth Campaign",
      category: "Social Media Marketing",
      image: "/placeholder.png"
    },
    {
      title: "Brand Identity Overhaul",
      category: "Content Strategy",
      image: "/placeholder.png"
    },
    {
      title: "Lead Generation Campaign",
      category: "Email Marketing",
      image: "/placeholder.png"
    },
    {
      title: "SEO Performance Boost",
      category: "Search Optimization",
      image: "/placeholder.png"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-display text-center mb-4">Recent Projects</h2>
        <p className="text-light/60 text-center mb-16 max-w-2xl mx-auto">
          Showcasing some of my recent digital marketing campaigns and their impact
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden h-[400px]">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="text-primary text-sm tracking-wider uppercase">{project.category}</span>
                <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-dark transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}