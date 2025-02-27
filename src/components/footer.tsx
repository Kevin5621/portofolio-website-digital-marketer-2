export default function Footer() {
    return (
      <footer className="bg-dark py-8 border-t border-gray-dark">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold">
                <span className="text-primary">A</span>
                <span className="text-light">E</span>
              </div>
            </div>
            
            <div className="text-light/60 text-sm">
              © {new Date().getFullYear()} Adhara Eka. All rights reserved.
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex gap-4">
                <a href="#" className="text-light/60 hover:text-primary transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-light/60 hover:text-primary transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-light/60 hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }