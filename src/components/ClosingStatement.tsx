
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ClosingStatement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !sectionRef.current) return;

      // Animate from right (100%) to center (0%) with opacity
      gsap.fromTo(
        textRef.current,
        {
          xPercent: 100,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: "none", // Scrub handles the easing feel
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Animation starts when top of section enters bottom of viewport
            end: "center center", // Animation finishes when section is centered
            scrub: 1.5, // High scrub value for "Apple-style" weight and smoothness
            // markers: true, // For debugging
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black py-32"
    >
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div 
          ref={textRef} 
          className="will-change-transform"
        >
          <h2 className="font-huge font-black tracking-tighter text-center leading-[0.85] whitespace-nowrap">
            DESIGN THAT<br />
            FEELS <span className="text-white/20">EFFORTLESS.</span>
          </h2>
          
          <div className="mt-12 flex items-center justify-center gap-6">
             <div className="h-px w-12 bg-[#a3e635]/50"></div>
             <p className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase">
               Final_Highlight // 2025
             </p>
             <div className="h-px w-12 bg-[#a3e635]/50"></div>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade to transition into footer */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ClosingStatement;
