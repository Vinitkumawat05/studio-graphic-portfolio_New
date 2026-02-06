import React from 'react';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Footer from '../components/Footer';
import DesignerAI from '../components/DesignerAI';
import { motion } from 'motion/react';

const ExperiencePage: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <main className="px-6 md:px-12 lg:px-20 max-w-[2200px] mx-auto pt-32">
        {/* Header Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#a3e635] text-[10px] font-black tracking-[0.6em] uppercase mb-8">Career Journey</p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
              EXPERIENCE<span className="text-white/20">.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              A timeline of my professional growth and key milestones in design and creative direction.
            </p>
          </motion.div>
        </section>

        {/* Experience Timeline Section */}
        <ExperienceTimeline />
      </main>
      <Footer />
      <DesignerAI />
    </div>
  );
};

export default ExperiencePage;
