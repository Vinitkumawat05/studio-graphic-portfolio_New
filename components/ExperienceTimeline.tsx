
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'motion/react';

interface ExperienceItem {
  year: string;
  yearNum: string;
  role: string;
  company: string;
  description: string;
  stats: string[];
}

const experienceData: ExperienceItem[] = [
  {
    year: "2023 — PRES",
    yearNum: "2023",
    role: "Lead Visual Designer",
    company: "Studio VANTAGE",
    description: "Orchestrating the visual language for Fortune 500 tech companies, focusing on high-fidelity motion systems and scalable brand identities.",
    stats: ["+140% Growth", "Team Lead", "Core Strategy"]
  },
  {
    year: "2021 — 2023",
    yearNum: "2021",
    role: "Senior Product Designer",
    company: "Ether Lab",
    description: "Led the design of decentralized finance protocols and experimental interface systems. Implemented a 40% improvement in user onboarding efficiency.",
    stats: ["Web3 Expert", "UI Systems", "Protocol Design"]
  },
  {
    year: "2019 — 2021",
    yearNum: "2019",
    role: "Graphic Designer",
    company: "Minimalist Co.",
    description: "Developed identity systems for emerging startups in the sustainability sector. Specialized in typographic research and print-to-digital transitions.",
    stats: ["Brand Audit", "Logo Design", "Typography"]
  },
  {
    year: "2018 — 2019",
    yearNum: "2018",
    role: "Design Intern",
    company: "Pixel & Ink",
    description: "Assisted in the production of high-end commercial campaigns and brand guidelines for international retail giants.",
    stats: ["Production", "Layouts", "Research"]
  }
];

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center justify-center min-h-[50vh] py-16">
      {/* Background Kinetic Year */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 100 : -100 }}
        whileInView={{ opacity: 0.03, x: isEven ? -50 : 50 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[20rem] md:text-[35rem] font-black italic tracking-tighter leading-none">
          {item.yearNum}
        </span>
      </motion.div>

      {/* Center Node - Precisely Aligned to Line */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: isInView ? 1.2 : 1,
            backgroundColor: isInView ? "#a3e635" : "#000",
            borderColor: isInView ? "#a3e635" : "rgba(255,255,255,0.2)"
          }}
          className="w-5 h-5 rounded-full border-2 transition-all duration-500 relative z-10"
        >
          {isInView && (
            <motion.div 
              layoutId="pulse"
              className="absolute inset-[-8px] rounded-full border border-lime-400/30 animate-pulse"
            />
          )}
        </motion.div>
      </div>

      <div className={`flex flex-col md:flex-row items-center w-full z-10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Content Card */}
        <motion.div 
          animate={{ 
            opacity: isInView ? 1 : 0.2,
            x: isInView ? 0 : (isEven ? -20 : 20),
            scale: isInView ? 1 : 0.98
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'}`}
        >
          <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <span className={`text-[10px] font-black tracking-[0.4em] mb-4 transition-colors duration-500 ${isInView ? 'text-lime-400' : 'text-white/20'}`}>
              LOG_ENTRY // 00{index + 1}
            </span>
            
            <div className="relative mb-6">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none uppercase">
                {item.role}
              </h3>
              <p className="text-white/40 font-black text-xs tracking-widest uppercase">
                at <span className="text-white">{item.company}</span> — {item.year}
              </p>
            </div>

            <p className="text-white/30 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              {item.description}
            </p>

            <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
              {item.stats.map(stat => (
                <span key={stat} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white/40">
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Spacer for desktop layout balance */}
        <div className="hidden md:block w-[45%]" />
      </div>
    </div>
  );
};

const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" ref={containerRef} className="py-40 relative overflow-hidden">
      <div className="mb-40 text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6"
        >
          Operational Timeline
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-9xl font-black tracking-tighter leading-none"
        >
          THE JOURNEY<span className="text-white/10">.</span>
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* The Progress Line - Precisely Anchored */}
        <motion.div 
          style={{ opacity: lineOpacity }}
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 z-20"
        >
          {/* Active Filling Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-lime-400/50 via-lime-400 to-lime-400/50 shadow-[0_0_15px_rgba(163,230,53,0.3)]"
          />
          
          {/* Dynamic Scroll Indicator */}
          <motion.div 
            style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute left-1/2 -translate-x-1/2 w-[1px] h-32 bg-lime-400 blur-sm shadow-[0_0_20px_#a3e635]"
          />
        </motion.div>

        {/* Experience Cards */}
        <div className="relative space-y-10 md:space-y-0">
          {experienceData.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      
      {/* Bottom Fade Transition */}
      <div className="h-40 bg-gradient-to-b from-transparent to-black pointer-events-none absolute bottom-0 left-0 w-full z-20"></div>
    </section>
  );
};

export default ExperienceTimeline;
