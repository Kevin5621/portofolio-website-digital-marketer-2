import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="container-custom py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="text-primary">A</span>
            <span className="text-light">E</span>
          </div>
        </Link>

        {/* Navigation Container */}
        <div className="hidden md:flex relative group">
          {/* Trigger Button */}
          <div className="flex items-center justify-center w-10 h-10 bg-dark/30 rounded-full cursor-pointer transition-all duration-300 hover:bg-dark/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-light"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          {/* Animated Dropdown */}
          <div className="
            absolute top-full right-0 mt-4 p-4
            bg-dark/90 backdrop-blur-lg rounded-lg
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-all duration-300 ease-out
            transform origin-top
            scale-95 group-hover:scale-100
          ">
            {/* Staggered Menu Items */}
            <div className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, index) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`
                    nav-link text-light opacity-0 translate-y-2
                    transition-all duration-500 ease-in-out
                    group-hover:opacity-100 group-hover:translate-y-0
                  `}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;