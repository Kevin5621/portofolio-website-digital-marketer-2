export default function Services() {
    const services = [
      {
        title: "Social Media Marketing",
        description: "Strategic social media campaigns to grow your audience and increase engagement across platforms.",
        icon: "📱"
      },
      {
        title: "SEO Optimization",
        description: "Improve your website's visibility in search results with targeted SEO strategies that increase organic traffic.",
        icon: "🔍"
      },
      {
        title: "Content Marketing",
        description: "Compelling content strategies that tell your brand's story and connect with your target audience.",
        icon: "✏️"
      },
      {
        title: "Email Marketing",
        description: "Personalized email campaigns that nurture leads, boost conversions, and build customer loyalty.",
        icon: "📧"
      },
      {
        title: "PPC Advertising",
        description: "Data-driven paid advertising campaigns that maximize ROI across Google, social media, and display networks.",
        icon: "💰"
      },
      {
        title: "Analytics & Reporting",
        description: "Comprehensive performance analysis and reporting to track campaign success and optimize strategies.",
        icon: "📊"
      }
    ];
  
    return (
      <section id="services" className="py-20 bg-gray-dark">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-4">My Services</h2>
          <p className="text-light/60 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive digital marketing solutions tailored to help your business grow online
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-dark p-8 border-b-2 border-primary hover:translate-y-[-5px] transition-transform">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-light/60">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }