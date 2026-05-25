import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalTextScroll: React.FC = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const phrase = 'So, are you ready to Stand out?';
  const characters = phrase.split('');

  useLayoutEffect(() => {
    let removeResizeListener = () => {};

    const ctx = gsap.context(() => {
      if (!wrapperRef.current || !textRef.current) return;

      const chars = textRef.current.querySelectorAll('.char');
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(textRef.current, { x: 0 });
        gsap.set(chars, { clearProps: 'all' });
        return;
      }

      const getDistance = () => window.innerWidth + textRef.current!.scrollWidth;

      gsap.set(textRef.current, { force3D: true });

      const scrollTween = gsap.fromTo(
        textRef.current,
        { x: () => window.innerWidth },
        {
          x: () => -textRef.current!.scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            pinSpacing: true,
            pinType: isMobile ? 'transform' : undefined,
            start: 'top top',
            end: () => '+=' + getDistance(),
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Restore previous scramble behavior: each character reacts as it enters the horizontal track.
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: isMobile ? 'random(-90, 90)' : 'random(-50, 50)',
          rotation: isMobile ? 'random(-30, 30)' : 'random(-5, 5)',
          ease: 'back.out(0.5)',
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 35%',
            scrub: 0.5,
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('resize', refresh);
      removeResizeListener = () => window.removeEventListener('resize', refresh);
      requestAnimationFrame(refresh);
    }, wrapperRef);

    return () => {
      removeResizeListener();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="Horizontal">
      <div className="horizontal-container">
        <h3 ref={textRef} className="Horizontal__text heading-xl">
          {characters.map((char, i) => (
            <span key={i} className={`char inline-block ${char === ' ' ? 'horizontal-space' : 'letter'}`}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h3>
      </div>

      <style>{`
        .Horizontal {
          overflow: hidden;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background-color: #1C1C1C;
          position: relative;
        }

        .horizontal-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .Horizontal__text {
          display: flex;
          width: max-content;
          white-space: nowrap;
          gap: 0.5vw;
          font-family: Inter, sans-serif;
          color: #fff;
          letter-spacing: -0.02em;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          margin: 0;
          padding: 0;
          flex-shrink: 0;
        }

        .Horizontal__text .letter {
          display: inline-block;
          will-change: transform;
        }
        .Horizontal__text .char {
          display: inline-block;
          will-change: transform, opacity;
        }

        .heading-xl {
          font-size: clamp(2rem, 10vw, 12rem);
          font-weight: 600;
          line-height: 1.1;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .Horizontal { min-height: 72vh; }
          .heading-xl {
            font-size: 14vw;
            line-height: 0.95;
            letter-spacing: -0.04em;
          }
          .Horizontal__text { gap: 0.25vw; }
          .horizontal-space { width: 2.2rem; }
        }

        @media (max-width: 767px) {
          .Horizontal { min-height: 100vh; }
          .heading-xl {
            font-size: 25vw;
            line-height: 0.9;
            letter-spacing: -0.05em;
          }
          .Horizontal__text { gap: 0; }
          .horizontal-space { width: 3.5rem; }
        }
      `}</style>
    </section>
  );
};

export default HorizontalTextScroll;
