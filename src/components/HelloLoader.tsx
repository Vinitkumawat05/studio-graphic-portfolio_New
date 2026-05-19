import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "Hello",       // English
  "હેલો",         // Gujarati
  "नमस्ते",       // Hindi
  "வணக்கம்",      // Tamil
  "హలో",          // Telugu
  "ಹಲೋ",          // Kannada
  "হ্যালো"         // Bengali
];

interface HelloLoaderProps {
  onLoadingComplete: () => void;
}

const HelloLoader: React.FC<HelloLoaderProps> = ({ onLoadingComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Cycle through words every 175ms
    const wordInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 175);

    // Start exit animation after cycling through all words twice (about 2.5 seconds)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      clearInterval(wordInterval);
    }, words.length * 175 * 2);

    // Complete loading after exit animation
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, words.length * 175 * 2 + 800);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1 }}
            className="text-white font-light tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: isMobile ? '55px' : '80px' }}
          >
            {words[currentIndex]}
          </motion.span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <span
            className="text-white font-light tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: isMobile ? '55px' : '80px' }}
          >
            {words[currentIndex]}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelloLoader;
