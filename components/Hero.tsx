
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shapes = [
    { id: 1, type: 'circle' },
    { id: 2, type: 'diamond' },
    { id: 3, type: 'triangle' },
    { id: 4, type: 'pentagon' },
  ];

  const renderShape = (type: string) => {
    switch (type) {
      case 'circle':
        return <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2" />;
      case 'diamond':
        return <path d="M20 5 L35 20 L20 35 L5 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />;
      case 'triangle':
        return <path d="M20 5 L35 35 L5 35 Z" fill="none" stroke="currentColor" strokeWidth="2" />;
      case 'pentagon':
        return (
          <path d="M20 5 L35 15 L30 35 L10 35 L5 15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        );
      default:
        return <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 relative overflow-hidden text-left select-none">
      {/* Right Shapes Container - Two tilted rectangles separated */}
      <div className="absolute right-0 top-1/3 hidden lg:flex gap-8 pr-20 items-center justify-center">
        {/* Left Rectangle - Shapes move up */}
        <div 
          className="w-40 h-[500px] border-2 border-white flex flex-col items-center justify-center overflow-hidden"
          style={{ transform: 'rotate(-8deg)' }}
        >
          <motion.div
            className="flex flex-col gap-12 py-8"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            {shapes.map((shape) => (
              <div
                key={`left-${shape.id}`}
                className="w-24 h-24 flex items-center justify-center text-lime-400"
              >
                <svg width="56" height="56" viewBox="0 0 40 40">
                  {renderShape(shape.type)}
                </svg>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Rectangle - Shapes move down */}
        <div 
          className="w-40 h-[500px] border-2 border-white flex flex-col items-center justify-center overflow-hidden"
          style={{ transform: 'rotate(8deg)' }}
        >
          <motion.div
            className="flex flex-col gap-12 py-8"
            style={{
              transform: `translateY(-${scrollY * 0.3}px)`,
            }}
          >
            {shapes.map((shape) => (
              <div
                key={`right-${shape.id}`}
                className="w-24 h-24 flex items-center justify-center text-lime-400"
              >
                <svg width="56" height="56" viewBox="0 0 40 40">
                  {renderShape(shape.type)}
                </svg>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="z-10 w-full relative px-0">
        {/* Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative"
        >
          <h1 className="text-[10vw] md:text-[8vw] font-black tracking-tighter leading-[0.8] uppercase max-w-4xl">
            finding the<br />
            <span className="text-lime-400">masterpiece</span>
          </h1>
        </motion.div>

        {/* Narrative */}
        <div className="mt-16 max-w-2xl space-y-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-white/40 text-base md:text-lg leading-relaxed font-medium tracking-tight"
          >
            A specialized design unit crafting <span className="text-white">high-fidelity brand systems</span> and digital landmarks for the visionaries of tomorrow.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
