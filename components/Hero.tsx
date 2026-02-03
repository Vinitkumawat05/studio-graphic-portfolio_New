
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Floating cards with animation data
  const cards = [
    { id: 1, delay: 0, duration: 4, x: '60%', y: '15%', width: 'w-32 h-40', rotate: -12 },
    { id: 2, delay: 0.2, duration: 5, x: '75%', y: '25%', width: 'w-40 h-48', rotate: 8 },
    { id: 3, delay: 0.4, duration: 4.5, x: '68%', y: '55%', width: 'w-36 h-44', rotate: -5, border: true },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 relative overflow-hidden text-left select-none">
      {/* Animated Floating Shapes - Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block pointer-events-none">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`absolute ${card.width} rounded-3xl ${card.border ? 'border-2 border-blue-500' : 'bg-gray-800/40'} backdrop-blur-sm`}
            style={{
              left: card.x,
              top: card.y,
              rotate: card.rotate,
            }}
            animate={{
              y: [0, -40, 0],
              x: [-10, 10, -10],
              opacity: [1, 1, 1],
              rotate: [card.rotate, card.rotate + 5, card.rotate],
            }}
            transition={{
              duration: card.duration,
              repeat: Infinity,
              delay: card.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="z-10 w-full relative px-0">
        {/* Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative"
        >
          <h1 className="text-[80px] font-normal tracking-[-1px] leading-[91px] max-w-4xl">
            Design,<br />
            <span className="text-lime-400">Reimagined.</span>
          </h1>
        </motion.div>

        {/* Narrative */}
        <div className="mt-4 max-w-2xl space-y-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-white/40 text-base md:text-lg leading-[24px] font-[17px] tracking-[0px]"
          >
            <span className="text-white">We don't follow trends, We set them.</span> The studio behind brands that don't just look good they feel inevitable. 
          </motion.p>
        </div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex gap-4 mt-12 flex-wrap  "
        >
          <button 
            onClick={() => navigate('/work')}
            className="px-6 md:px-8 py-3 border border-white/40 text-white hover:bg-white/5 transition-all duration-300 rounded-full font-medium"
          >
            Explore Work
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="px-6 md:px-8 py-3 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-full font-medium"
          >
            Start the Project
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
