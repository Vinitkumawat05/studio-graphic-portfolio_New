import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import SlideInButton from './SlideInButton';

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

const mobileMenuItems = [
  { label: 'Home', href: '/', number: '(01)' },
  { label: 'Works', href: '/work', number: '(02)' },
  { label: 'Contact', href: '/contact', number: '(03)' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const linkClass = 'text-[16px] font-medium leading-none text-[#ECE8DF] transition-opacity duration-300 hover:opacity-60';

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'
        }`}
      >
        <div className={`mx-auto w-full max-w-[1800px] px-5 py-4 transition-colors duration-500 md:px-8 lg:px-20 ${isScrolled ? 'bg-[#1C1C1C]' : 'bg-transparent'}`}>
          <div className="hidden items-center justify-between gap-8 md:flex">
            <div className="flex min-w-0 flex-1 items-center">
              {isScrolled ? (
                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <Link key={item.label} to={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link to="/" className="text-[20px] font-normal leading-[26px] tracking-tight text-[#ECE8DF] transition-opacity duration-300 hover:opacity-60">
                  Magic Vibe
                </Link>
              )}
            </div>

            <div className="flex flex-1 items-center justify-center">
              {isScrolled ? (
                <Link to="/" aria-label="Magic Vibe home" className="transition-opacity duration-300 hover:opacity-70">
                  <img src="/assets/hero.svg" alt="Magic Vibe" className="h-8 w-auto max-w-[230px]" />
                </Link>
              ) : (
                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <Link key={item.label} to={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 justify-end">
              <SlideInButton
                text="Let's Talk"
                href="mailto:hello@studio.design"
                variant="secondary"
                className="px-7 py-2 text-[16px] font-medium text-[#ECE8DF]"
                showArrow={false}
              />
            </div>
          </div>

          <div className="flex items-center justify-between md:hidden">
            <Link to="/" aria-label="Magic Vibe home" className="text-[19px] font-normal tracking-tight text-[#ECE8DF]">
              {isScrolled ? (
                <img src="/assets/hero.svg" alt="Magic Vibe" className="h-6 w-auto max-w-[170px]" />
              ) : (
                'Magic Vibe'
              )}
            </Link>

            <motion.button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ECE8DF]/30 text-[#ECE8DF]"
              animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-4 right-4 top-20 z-50 rounded-lg border border-[#ECE8DF]/10 bg-[#1C1C1C]/95 px-5 py-6 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="space-y-5">
                {mobileMenuItems.map((item, index) => (
                  <Link key={item.label} to={item.href} className="group flex items-center justify-between border-b border-[#ECE8DF]/10 pb-4">
                    <span className="text-[30px] font-normal leading-none text-[#ECE8DF] transition-opacity duration-300 group-hover:opacity-60">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[#ECE8DF]/40">{item.number}</span>
                  </Link>
                ))}
              </div>

              <a
                href="mailto:hello@studio.design"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#ECE8DF] text-[16px] font-normal text-[#1C1C1C]"
              >
                Let's Talk
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
