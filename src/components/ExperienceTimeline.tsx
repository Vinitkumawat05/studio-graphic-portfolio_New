
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'motion/react';

interface ExperienceItem {
  yearNum: string;
  role: string;
  description: string;
}

const experienceData: ExperienceItem[] = [
  {
    yearNum: "2023",
    role: "Discovery & Strategy",
    description: "We start by understanding your goals, audience, and vision. Through in-depth research and strategy sessions, we lay the foundation for a powerful design."
  },
  {
    yearNum: "2021",
    role: "Concept & Design",
    description: "With insights in place, we craft initial concepts, exploring bold and creative directions that align with your brand’s identity and objectives."
  },
  {
    yearNum: "2019",
    role: "Development & Execution",
    description: "Once the design is perfected, we bring it to life, whether it’s a website, brand identity, or motion graphics, ensuring high performance and flawless execution."
  },
  {
    yearNum: "2018",
    role: "Launch & Optimization",
    description: " We ensure a smooth launch. Plus, we provide ongoing support, optimizations, and guidance to keep your brand at its best."
  }
];

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex min-h-[50vh] items-center justify-center py-16 md:min-h-[34vh] md:py-10 lg:min-h-[50vh] lg:py-16">
      {/* Center Node - Precisely Aligned to Line */}
      <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: isInView ? 1.2 : 1,
            backgroundColor: isInView ? "#ECE8DF" : "#000",
            borderColor: isInView ? "#ECE8DF" : "rgba(255,255,255,0.2)"
          }}
          className="w-5 h-5 rounded-full border-2 transition-all duration-500 relative z-10"
        >
          {isInView && (
            <motion.div 
              layoutId="pulse"
              className="absolute inset-[-8px] rounded-full border border-[#ECE8DF]/30 animate-pulse"
            />
          )}
        </motion.div>
      </div>

      <div className={`flex flex-col lg:flex-row items-center w-full z-10 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Content Card */}
        <motion.div 
          animate={{ 
            opacity: isInView ? 1 : 0.2,
            x: isInView ? 0 : (isEven ? -20 : 20),
            scale: isInView ? 1 : 0.98
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full lg:w-[45%] pl-20 lg:pl-0 ${isEven ? 'lg:text-right lg:pr-20' : 'lg:text-left lg:pl-20'}`}
        >
          <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
            <span className={`text-[17px] font-black, normal tracking-[0px] mb-4 transition-colors duration-500 ${isInView ? 'text-[#ECE8DF]' : 'text-white/20'}`}> 
              Chapter // 00{index + 1}
            </span>
            
            <div className="relative mb-[10px] md:mb-4 lg:mb-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black, normal tracking-[-1px] text-white mb-2 leading-none sentancecase">
                {item.role}
              </h3>
            </div>

            <p className="text-[16px] leading-[24px] font-normal text-white/80 md:text-lg md:leading-normal mb-8 max-w-md break-words">
              {item.description}
            </p>
          </div>
        </motion.div>

        {/* Spacer for desktop layout balance */}
        <div className="hidden lg:block w-[45%]" />
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
    <section id="experience" ref={containerRef} className="!pt-20 lg:!pt-40 relative overflow-hidden">
      <div className="relative z-10 mb-16 text-center lg:mb-40">
        {/*  */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-[45px] leading-[45px] lg:text-[80px] lg:leading-[4px] font-black, normal tracking-[-1px] sentancecase"
        >
          How great design happens<span className="text-white/10">.</span>
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-0 lg:px-4">
        {/* The Progress Line - Precisely Anchored */}
          <motion.div 
          style={{ opacity: lineOpacity }}
          className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-20"
          >
          {/* Active Filling Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ECE8DF]/50 via-[#ECE8DF] to-[#ECE8DF]/50 shadow-[0_0_15px_rgba(236,232,223,0.3)]"
          />
          
          {/* Dynamic Scroll Indicator */}
          <motion.div 
            style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute left-1/2 -translate-x-1/2 w-[1px] h-32 bg-[#ECE8DF] blur-sm shadow-[0_0_20px_#ECE8DF]"
          />
        </motion.div>

        {/* Experience Cards */}
        <div className="relative space-y-10 lg:space-y-0">
          {experienceData.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      
      
    </section>
  );
};

export default ExperienceTimeline;
