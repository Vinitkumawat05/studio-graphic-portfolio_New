
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'WORK', href: '/work' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? "top-6 w-[92%] md:w-max" 
          : "top-0 w-full"
      } ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
      }`}
    >
      <div 
        className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mx-auto ${
          isScrolled 
            ? "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-4 md:px-10 py-3 gap-8 md:gap-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-100" 
            : "bg-transparent border-b border-transparent px-6 md:px-12 lg:px-20 py-10 w-full max-w-[1800px] scale-100"
        }`}
      >
        {/* Branding */}
        <Link 
          to="/" 
          onClick={(e) => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`transition-all duration-500 flex items-center gap-2 group ${isScrolled ? "scale-90" : "scale-100"}`}
        >
          <div className="text-xl font-black tracking-tighter flex items-center">
            S<span className="text-white/40 transition-colors group-hover:text-lime-400">.</span>
          </div>
          {isScrolled && (
            <div className="w-[1px] h-4 bg-white/10 ml-2 hidden md:block"></div>
          )}
        </Link>
        
        {/* Navigation Links */}
        <div className={`hidden md:flex flex-1 justify-start items-center space-x-12 transition-all duration-500 ml-12`}>
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.href}
              className={`text-[9px] font-bold tracking-[0.25em] transition-all duration-300 ${
                isActive(item.href) 
                  ? 'text-lime-400' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className={`flex items-center gap-4 ${!isScrolled ? 'flex-1 justify-end' : ''}`}>
          <a
            href="mailto:hello@studio.design"
            className={`transition-all duration-500 px-7 py-2.5 rounded-full text-[9px] font-black tracking-[0.15em] uppercase active:scale-95 ${
              isScrolled 
                ? "bg-white text-black hover:bg-lime-400" 
                : "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black"
            }`}
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
