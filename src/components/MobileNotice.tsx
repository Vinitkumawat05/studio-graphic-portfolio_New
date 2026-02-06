import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';

const MobileNotice: React.FC = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Lock body scroll when mobile notice is visible
  useEffect(() => {
    if (isMobileOrTablet && !dismissed) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isMobileOrTablet, dismissed]);

  if (!isMobileOrTablet || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center px-8 text-center overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          {/* Icon */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <Smartphone className="w-8 h-8 text-white/40" />
            </div>
            <div className="flex items-center">
              <div className="w-8 h-[1px] bg-gradient-to-r from-white/20 to-lime-400/40" />
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              <div className="w-8 h-[1px] bg-gradient-to-l from-white/20 to-lime-400/40" />
            </div>
            <div className="p-4 bg-lime-400/10 rounded-2xl border border-lime-400/20">
              <Monitor className="w-8 h-8 text-lime-400" />
            </div>
          </div>

          {/* Logo */}
          {/* <img 
            src="/images/logo.svg" 
            alt="Studio Logo" 
            className="h-6 w-auto mx-auto mb-8 opacity-60"
          /> */}

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Best Viewed on<br />
            <span className="text-lime-400">Laptop or Desktop</span>
          </h1>

          {/* Message */}
          <p className="text-white/50 text-base leading-relaxed mb-8">
            This website is optimized for larger screens. 
            For the best experience, please visit us on a laptop or desktop with a minimum width of 1280px.
          </p>

          {/* Device info */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-white/40">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span>Responsive version coming soon</span>
          </div>

          {/* Branch notice */}
          <p className="mt-8 text-xs text-white/30">
            Our team is working on a dedicated mobile experience
          </p>
        </motion.div>

        {/* Bottom decoration */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 rounded-full bg-white/20"
              style={{ opacity: 0.2 + (i * 0.15) }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileNotice;
