
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
    <div className="min-h-screen flex flex-col justify-center py-20 relative overflow-hidden text-left select-none">
      {/* Right Side - Two Vertical Marquee Columns */}
      <div className="absolute right-0 top-[82px] w-[45%] h-[calc(100%-82px)] hidden lg:flex gap-6 pointer-events-none overflow-hidden py-16">
        {/* Left Column - Scrolls Up */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ['0%', '-50%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...leftColumnCards, ...leftColumnCards].map((card, index) => (
              <div
                key={`left-${card.id}-${index}`}
                className="w-full h-[400px] rounded-2xl border border-white/10"
                style={{ backgroundColor: '#0B0B0C' }}
              />
            ))}
          </motion.div>
        </div>

        {/* Right Column - Scrolls Down (opposite direction) */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ['-50%', '0%'] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...rightColumnCards, ...rightColumnCards].map((card, index) => (
              <div
                key={`right-${card.id}-${index}`}
                className="w-full h-[450px] rounded-2xl border border-white/10"
                style={{ backgroundColor: '#0B0B0C' }}
              />
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
          <h1 className="text-[80px] font-normal tracking-[-1px] leading-[91px] max-w-4xl">
            Design,<br />
            <span className="text-[#a3e635]">Reimagined.</span>
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
          <SlideInButton
            text="Explore Work"
            onClick={() => navigate('/work')}
            variant="secondary"
          />
          <SlideInButton
            text="Start the Project"
            onClick={() => navigate('/contact')}
            variant="primary"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
