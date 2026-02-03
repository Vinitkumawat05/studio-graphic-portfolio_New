
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What do you actually do?",
    answer: " We design brands, websites, and digital experiences that make people stop and pay attention. From identity systems to full-scale web platforms — if it needs strategy and creativity behind it, that's our space."
  },
  {
    question: "How long does a project take?",
    answer: "A brand identity? Around 3–5 weeks. A full web design project? 6–10 weeks. Every project gets a clear roadmap upfront — no guesswork, no surprises. Just a timeline you can count on."
  },
  {
    question: "How much does it cost?",
    answer: " Every project is scoped individually — because cookie-cutter pricing doesn't fit custom work. Reach out, tell us what you're building, and we'll give you a transparent breakdown. No hidden fees. Ever."
  },
  {
    question: "Do you work with people outside my country?",
    answer: "Absolutely. We're built to work globally — fully remote, time-zone flexible. If you've got the vision, we've got the reach."
  },
  {
    question: "Why choose you over anyone else?",
    answer: "Because we don't just make things look good. We make them work. Every project starts with strategy, not guesswork. Your brand isn't a side project here — it's the only project that matters."
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
        <span className={`text-3xl font-black, normal tracking-[0px] mt-2 md:mt-3.5 flex-shrink-0 transition-colors duration-500 ${isOpen ? 'text-lime-400' : 'text-white/20 group-hover:text-white/50'}`}>
            0{index + 1}
          </span>
          
          {/* Column 2: Stacked Question & Answer */}
          <div className="flex-1">
            <h3 className={`text-lg md:text-3xl font-normal tracking-[0px] mt-2 md:mt-3.5 transition-all duration-500 ${
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
            <p className="text-[17px] font-black,normal tracking-[0px] text-white/40 sentancecase mb-2">Questions?</p>
            <h2 className="text-6xl md:text-[80px] font-black, normal tracking-[-1px] leading-none">
              We've got answers<span className="text-white/20">.</span>
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
