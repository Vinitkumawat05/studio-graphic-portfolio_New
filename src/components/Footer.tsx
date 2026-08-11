import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface StaggeredTextProps {
  text: string;
  className?: string;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const letters = text.split('');

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              visibility: 'hidden',
              display: 'inline-block',
              whiteSpace: letter === ' ' ? 'pre' : 'normal',
            }}
            aria-hidden="true"
          >
            {letter === ' ' ? '\xa0' : letter}
          </span>

          <motion.span
            style={{
              display: 'inline-block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
            initial={{ y: '0%' }}
            animate={{ y: isHovered ? '-120%' : '0%' }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
              delay: index * 0.03,
            }}
          >
            {letter === ' ' ? '\xa0' : letter}
          </motion.span>

          <motion.span
            style={{
              display: 'inline-block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
            initial={{ y: '120%' }}
            animate={{ y: isHovered ? '0%' : '120%' }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
              delay: index * 0.03,
            }}
          >
            {letter === ' ' ? '\xa0' : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative z-40 isolate border-t border-white/10 bg-[#191A19] px-6 py-12 text-[#ECE8DF] md:px-12 lg:px-20 scroll-mt-16 md:scroll-mt-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_0.8fr_1.05fr] lg:items-start">
          <div>
            <h2 className="mb-7 max-w-[520px] text-[42px] font-normal leading-[0.98] tracking-[-1px] md:text-[56px]">
              Let's build<br />something great.
            </h2>
            <a
              href="mailto:vinitkumawat05@gmail.com"
              className="text-base font-semibold text-white/45 transition-colors duration-300 hover:text-[#ECE8DF]"
            >
              vinitkumawat05@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[18px] leading-none">
            <div className="space-y-4">
              <Link to="/work" className="block font-medium transition-colors duration-300 hover:text-white/55">
                <StaggeredText text="Work" />
              </Link>
              <Link to="/contact" className="block font-medium transition-colors duration-300 hover:text-white/55">
                <StaggeredText text="Contact" />
              </Link>
            </div>

            <div className="space-y-4">
              <a
                href="https://www.instagram.com/magicvibe.design/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium transition-colors duration-300 hover:text-white/55"
              >
                <StaggeredText text="Instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/vinitkumawat/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium transition-colors duration-300 hover:text-white/55"
              >
                <StaggeredText text="LinkedIn" />
              </a>
              <a
                href="https://www.behance.net/vinitkumawat2"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium transition-colors duration-300 hover:text-white/55"
              >
                <StaggeredText text="Behance" />
              </a>
              <a
                href="mailto:vinitkumawat05@gmail.com"
                className="block font-medium transition-colors duration-300 hover:text-white/55"
              >
                <StaggeredText text="Email" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <Link to="/" aria-label="Magic Vibe home" className="block w-full transition-opacity duration-300 hover:opacity-70 lg:max-w-[350px]">
              <img src="/assets/icon/hero.svg" alt="Magic Vibe" className="h-auto w-full" />
            </Link>
            <a
              href="mailto:vinitkumawat05@gmail.com"
              className="flex h-14 w-full items-center justify-center overflow-hidden bg-[#ECE8DF] px-8 text-[18px] font-medium text-[#191A19] lg:max-w-[350px]"
            >
              <StaggeredText text="Lets Talk" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-11 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Magic Vibe. All Rights Reserved.</p>
          <p>Vadodara, India | Asia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
