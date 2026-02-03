
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalTextScroll: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  // Converted to lowercase as requested
  const phrase = "So, Are you ready to stand out?";
  
  const characters = phrase.split("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current || !textRef.current) return;

      const chars = textRef.current.querySelectorAll('.char');

      // 1. Create the horizontal scroll animation (scrollTween)
      const scrollTween = gsap.to(textRef.current, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          // Increased end distance from 4000px to 8000px to slow down the scroll speed
          end: "+=5000px", 
          scrub: true,
        }
      });

      // 2. Animate each character using containerAnimation
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-50, 50)",
          rotation: "random(-05, 05)",
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 0.5
          }
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="Horizontal">
      <div className="container">
        <h3 ref={textRef} className="Horizontal__text heading-xl">
          {characters.map((char, i) => (
            <span 
              key={i} 
              className="char inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>
      </div>

      <style>{`
        .Horizontal {
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          background-color: #000;
        }

        .Horizontal__text {
          display: flex;
          width: max-content;
          white-space: nowrap;
          /* Decreased gap from 4vw to 0.5vw to satisfy 'decrease font space' */
          gap: 0.5vw; 
          padding-left: 100vw;
          font-family: 'Inter', sans-serif;
          /* Changed to lowercase as requested */
          text-transform: lowercase;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .heading-xl {
          font-size: clamp(2rem, 10vw, 12rem);
          font-weight: 600;
          line-height: 1.1;
        }

        .container {
            width: 100%;
        }
      `}</style>
    </section>
  );
};

export default HorizontalTextScroll;
