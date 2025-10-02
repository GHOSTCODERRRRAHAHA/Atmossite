
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`safe-area-top w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm fixed top-0 z-50 animate-fade-in transition-transform duration-300 ${
      isScrolled ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="flex items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-black flex items-baseline gap-1 hover:opacity-80 transition-opacity">
          ATMOS
          <span className="text-xs font-normal text-gray-400 align-top ml-1">v1</span>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <Link to="/" className={`text-gray-600 hover:text-black transition-all duration-300 font-medium hover:scale-105 ${location.pathname === '/' ? 'text-black' : ''}`}>
          Home
        </Link>
        <Link to="/about" className={`text-gray-600 hover:text-black transition-all duration-300 font-medium hover:scale-105 ${location.pathname === '/about' ? 'text-black' : ''}`}>
          About
        </Link>
        <Link to="/collection" className={`text-gray-600 hover:text-black transition-all duration-300 font-medium hover:scale-105 ${location.pathname === '/collection' ? 'text-black' : ''}`}>
          Collection
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className={`text-gray-600 hover:text-black transition-colors font-medium ${location.pathname === '/' ? 'text-black' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-600 hover:text-black transition-colors font-medium ${location.pathname === '/about' ? 'text-black' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/collection" 
              className={`text-gray-600 hover:text-black transition-colors font-medium ${location.pathname === '/collection' ? 'text-black' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Collection
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
