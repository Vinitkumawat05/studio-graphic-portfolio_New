import React from 'react';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Footer from '../components/Footer';
import { motion } from 'motion/react';

const ExperiencePage: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#ECE8DF] selection:bg-[#ECE8DF] selection:text-[#1C1C1C] overflow-x-hidden">
      <main className="px-6 md:px-8 lg:px-20 max-w-[2200px] mx-auto pt-32">
        {/* Header Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-8">Career Journey</p>
            <h1 className="text-[45px] md:text-8xl font-normal md:font-black tracking-[-1px] md:tracking-tighter leading-[45px] md:leading-[0.85] uppercase mb-12">
              EXPERIENCE<span className="text-white/20">.</span>
            </h1>
            <p className="text-[7px] md:text-lg font-[17px] text-white/60 tracking-[0px] leading-[20px] md:leading-normal w-full md:max-w-2xl">
              A timeline of my professional growth and key milestones in design and creative direction.
            </p>
          </motion.div>
        </section>

        {/* Experience Timeline Section */}
        <ExperienceTimeline />
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;

