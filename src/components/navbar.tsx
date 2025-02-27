// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="text-primary">A</span>
            <span className="text-light">E</span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-8">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/portfolio" className="nav-link">Portfolio</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
        
        <button className="md:hidden text-light">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;