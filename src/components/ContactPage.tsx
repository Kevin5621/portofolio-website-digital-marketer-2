import { useCallback, useState } from 'react';

interface ContactInfo {
  title: string;
  value: string;
  displayValue: React.ReactNode;
  href: string;
}

interface ContactPageProps {
  contacts?: ContactInfo[];
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  showPattern?: boolean;
}

export function ContactPage({
  contacts = [
    {
      title: "EMAIL",
      value: "ekaadharabusiness@gmail.com",
      displayValue: <>ekaadharabusiness<br/>@gmail.com</>,
      href: "mailto:ekaadharabusiness@gmail.com",
    },
    {
      title: "WHATSAPP",
      value: "+62 896-9734-6868",
      displayValue: "+62 896-9734-6868",
      href: "https://api.whatsapp.com/send?phone=6289697346868",
    },
    {
      title: "INSTAGRAM",
      value: "@adhara.eka",
      displayValue: "@adhara.eka",
      href: "https://www.instagram.com/adhara.eka",
    }
  ],
  title = "LET'S\nCONNECT",
  subtitle = "Reach out through any of these channels to discuss projects, collaborations, or just to say hello.",
  backgroundColor = "black",
  textColor = "white",
  accentColor = "white",
  showPattern = true
}: ContactPageProps) {
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);

  // Handle contact hover
  const handleContactHover = useCallback((index: number) => {
    setHoveredContact(index);
  }, []);

  // Handle contact mouse leave
  const handleContactLeave = useCallback(() => {
    setHoveredContact(null);
  }, []);

  // Handle contact link click
  const handleContactClick = useCallback((href: string) => {
    window.open(href, '_blank');
  }, []);

  return (
    <div className="relative w-full h-screen flex-shrink-0 overflow-hidden" style={{ backgroundColor }}>
      {/* Background pattern */}
      {showPattern && (
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{ 
            backgroundImage: `radial-gradient(circle, rgba(${textColor === 'black' ? '0,0,0' : '255,255,255'},0.08) 1px, transparent 1px)`, 
            backgroundSize: '30px 30px' 
          }}></div>
        </div>
      )}
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8 bg-gray-dark">
        {/* Content container with responsive width */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          {/* Left side - Title section */}
          <div className="md:w-2/5 text-left mb-8 md:mb-0 md:sticky md:top-1/3">
            <h2 className="contact-title font-bold mb-6 whitespace-pre-line" 
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.04em',
                lineHeight: '0.9',
                color: textColor
              }}>
              {title}
            </h2>
            <div className="h-px w-24 my-6" style={{ backgroundColor: `${accentColor}30` }}></div>
            <p className="text-lg max-w-md" style={{ color: `${textColor}80` }}>
              {subtitle}
            </p>
          </div>
          
          {/* Right side - Contact cards */}
          <div className="md:w-3/5 w-full">
            <div className="space-y-8">
              {contacts.map((contact, index) => (
                <div 
                  key={contact.title}
                  className="group relative cursor-pointer transition-all duration-300 ease-out border-l-0 border-r-0 border-b pb-8"
                  style={{ 
                    borderBottomColor: hoveredContact === index ? accentColor : `${accentColor}10` 
                  }}
                  onMouseEnter={() => handleContactHover(index)}
                  onMouseLeave={handleContactLeave}
                  onClick={() => handleContactClick(contact.href)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {/* Label */}
                      <h3 className="text-sm font-mono tracking-wider mb-3 transition-colors duration-300"
                        style={{ 
                          color: hoveredContact === index ? textColor : `${textColor}60` 
                        }}>
                        {contact.title}
                      </h3>
                      
                      {/* Value with large typography */}
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold transition-colors duration-300" 
                        style={{ 
                          letterSpacing: '-0.02em',
                          color: textColor
                        }}>
                        {contact.displayValue}
                      </div>
                    </div>
                    
                    {/* Icon and arrow */}
                    <div className="flex items-center space-x-4">
                      <span className="text-xl sm:text-2xl transform transition-all duration-300"
                        style={{ 
                          transform: hoveredContact === index ? 'translateX(0.5rem)' : 'translateX(0)',
                          color: hoveredContact === index ? textColor : `${textColor}60`
                        }}>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}