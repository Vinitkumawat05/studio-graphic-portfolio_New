
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlideInButton from './SlideInButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ReadyToStandOut: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLDivElement>(null);
  const textLine2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Parallax for the background watermark
      gsap.fromTo(
        watermarkRef.current,
        { y: -100 },
        {
          y: 100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Reveal for Line 1
      gsap.fromTo(
        textLine1Ref.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      // Reveal for Line 2
      gsap.fromTo(
        textLine2Ref.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden py-32 md:py-64"
    >
      {/* Background Watermark (Similar to "DZINR" in video) */}
      <div 
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[30vw] font-black tracking-tighter text-white/[0.03] leading-none whitespace-nowrap">
          STUDIO.
        </span>
      </div>

      {/* Floating Header Link (Reference style) */}
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <SlideInButton
          text="Let's Talk"
          href="mailto:hello@studio.design"
          variant="secondary"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div ref={textLine1Ref} className="overflow-hidden">
          <h2 className="text-[8vw] font-black tracking-tighter leading-none mb-4">
            So, Are You Ready
          </h2>
        </div>
        
        <div ref={textLine2Ref} className="overflow-hidden">
          <h2 className="text-[10vw] font-black tracking-tighter leading-none italic">
            To <span className="text-[#a3e635] not-italic">Stand Out?</span>
          </h2>
        </div>

        {/* Decorative Details */}
        <div className="mt-24 flex items-center justify-center gap-12 opacity-30">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] font-black tracking-[0.5em] uppercase">Mumbai</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]"></div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] font-black tracking-[0.5em] uppercase">India, Asia</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* Transition line to footer */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default ReadyToStandOut;
