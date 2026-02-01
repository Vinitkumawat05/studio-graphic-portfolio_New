
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-48 md:py-64 relative overflow-hidden border-t border-white/5">
      {/* Background Kinetic Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <motion.span 
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[40rem] font-black italic tracking-tighter whitespace-nowrap"
        >
          READY? READY? READY?
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lime-400 text-[11px] font-black tracking-[0.6em] uppercase mb-12">
              Next_Step // Collaboration
            </p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-huge font-black tracking-tighter leading-[0.8] mb-20"
          >
            ARE YOU READY<br/>
            TO <span className="text-lime-400">STAND OUT?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <a 
              href="mailto:hello@studio.design"
              className="group relative flex items-center justify-center"
            >
              {/* Magnetic Button Effect */}
              <div className="absolute inset-0 bg-lime-400 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="relative px-16 py-8 rounded-full border border-white/20 bg-black group-hover:border-lime-400 group-hover:bg-white group-hover:text-black transition-all duration-500 flex items-center gap-6 overflow-hidden">
                <span className="text-[12px] font-black tracking-[0.4em] uppercase z-10">
                  Start a Project
                </span>
                <div className="w-10 h-10 rounded-full bg-lime-400/10 group-hover:bg-black/5 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            Limited availability for Q3 2025
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
