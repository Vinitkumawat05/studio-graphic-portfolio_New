import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
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
        <div
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

          {/* First letter sliding out upward */}
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

          {/* Second letter sliding in from below */}
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
        </div>
      ))}
    </motion.span>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 lg:px-24 py-24 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32 mb-24">
          <div>
            <h2 className="text-6xl md:text-[80px] font-normal tracking-tighter mb-12">Let's build<br/>something great.</h2>
            <a 
              href="mailto:hello@studio.design" 
              className="text-2xl md:text-4xl font-light "
            >
              vinitkumawat05@gmail.com
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 w-[300px] md:ml-auto">
            {/* Navigation Column */}
            <div className="space-y-4">
              <Link to="/work" className="block text-lg font-black, normal cursor-pointer">
                <StaggeredText text="Work" />
              </Link>
              <Link to="/contact" className="block text-lg font-black, normal cursor-pointer">
                <StaggeredText text="Contact" />
              </Link>
            </div>

            {/* Social Column */}
            <div className="space-y-4 md:text-right">
              <a 
                href="https://www.instagram.com/magicvibe.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-lime-400 transition-colors"
              >
                <StaggeredText text="Instagram" />
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vinitkumawat/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-lime-400 transition-colors"
              >
                <StaggeredText text="LinkedIn" />
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://www.behance.net/vinitkumawat2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-lime-400 transition-colors"
              >
                <StaggeredText text="Behance" />
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="mailto:vinitkumawat05@gmail.com" 
                className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-lime-400 transition-colors"
              >
                <StaggeredText text="Email" />
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-6">
          <p className="text-xs text-white tracking-widest sentancecase">© 2024 STUDIO DESIGN GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-col md:flex-row gap-8 text-xs text-white/30 tracking-widest sentancecase">
            <div className="text-sm text-white/40">
              <p>Vadodara</p>
              <p>India, Asia</p>
            </div>
            <div className="flex gap-8">
              <a className="hover:text-white">Terms & Conditions</a>
              <a className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
