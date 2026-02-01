
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the studio's core design philosophy?",
    answer: "We believe in 'finding the masterpiece' by stripping away the non-essential. Our approach is rooted in minimalist principles, focusing on high-fidelity execution and emotional resonance through precise visual systems."
  },
  {
    question: "How long does a typical branding engagement take?",
    answer: "A comprehensive brand identity project typically spans 6 to 10 weeks. This includes deep discovery, strategic positioning, visual exploration, and final system documentation for various touchpoints."
  },
  {
    question: "Do you collaborate with international brands?",
    answer: "Yes. STUDIO operates as a globally distributed creative team. We have successfully partnered with visionary brands across Europe, North America, and Asia, leveraging digital-first workflows for seamless collaboration."
  },
  {
    question: "What is the Archive mentioned in your portfolio?",
    answer: "The Archive is our living repository of experimental work, kinetic experiments, and past landmarks. It serves as both a portfolio and a testament to our evolution in the digital landscape."
  },
  {
    question: "How can we initiate a new project together?",
    answer: "The process begins with an inquiry. Once we understand your vision, we move into a discovery phase where we define goals, constraints, and the unique masterpiece we'll build together."
  }
];

const FAQRow: React.FC<{ 
  item: FAQItem; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}> = ({ item, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.9, 
        delay: index * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`border-b border-white/10 last:border-0 group cursor-pointer transition-colors duration-500 ease-out ${
        isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between py-10 px-8 transition-all gap-6">
        {/* Content Section (Number + Text Column) */}
        <div className="flex items-start gap-8 md:gap-16 flex-1">
          {/* Column 1: Number */}
          <span className={`text-[10px] font-black tracking-widest mt-2 md:mt-3.5 flex-shrink-0 transition-colors duration-500 ${isOpen ? 'text-lime-400' : 'text-white/20 group-hover:text-white/50'}`}>
            0{index + 1}
          </span>
          
          {/* Column 2: Stacked Question & Answer */}
          <div className="flex-1">
            <h3 className={`text-lg md:text-3xl font-bold tracking-tight transition-all duration-500 ${
              isOpen ? 'text-white' : 'text-white/30 group-hover:text-white'
            }`}>
              {item.question}
            </h3>
            
            <motion.div 
              initial={false}
              animate={{ 
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8 md:pt-10 pr-12 pb-2">
                <p className="text-white/40 text-base md:text-xl leading-relaxed max-w-2xl font-medium tracking-tight">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Column 3: Action Icon */}
        <div className={`transition-all duration-500 rounded-full p-2.5 flex-shrink-0 mt-1 md:mt-2 ${
          isOpen ? 'rotate-180 bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]' : 'text-white/20 group-hover:text-white bg-white/5'
        }`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </div>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-40 border-t border-white/10 relative">
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent hidden lg:block"></div>
      
      <div className="grid lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-[11px] font-black tracking-[0.5em] text-white/40 uppercase mb-8">STUDIO_INQUIRIES</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
              THE ARCHIVE<span className="text-white/20">.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-0">
        {faqData.map((item, index) => (
          <FAQRow 
            key={index}
            index={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
      
      <div className="mt-32 flex justify-center">
        <div className="w-20 h-px bg-white/20"></div>
      </div>
    </section>
  );
};

export default FAQ;
