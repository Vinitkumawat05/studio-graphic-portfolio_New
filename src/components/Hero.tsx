
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import SlideInButton from './SlideInButton';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Cards for the marquee columns
  const leftColumnCards = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  const rightColumnCards = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  return (
    <div className="relative overflow-hidden pt-[70px] text-left select-none md:pt-24 lg:pt-20">
      {/* Vertical marquee columns removed as requested */}

      <div className="relative z-10 w-full px-0">
        {/* SVG Icon */}
        <img
          src="/assets/hero.svg"
          alt="Magic Vibe"
          className="mx-auto block h-auto w-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
