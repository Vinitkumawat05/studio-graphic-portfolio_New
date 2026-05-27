import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalTextScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const phrase = 'So, are you ready to Stand out?';
  const characters = phrase.split('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(text, { x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('.section-scroll-text .letter');
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const getScrollDistance = () => window.innerWidth + text.scrollWidth;

      gsap.set(text, { force3D: true });

      const scrollTween = gsap.fromTo(
        text,
        { x: () => window.innerWidth },
        {
          x: () => -text.scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => `+=${getScrollDistance()}`,
          },
        },
      );

      chars.forEach((char, index) => {
        const fromTop = index % 2 === 0;

        gsap.fromTo(
          char,
          {
            yPercent: fromTop ? -120 : 120,
            rotation: fromTop ? -18 : 18,
          },
          {
            yPercent: 0,
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: 'left 112%',
              end: isMobile ? 'left 78%' : 'left 84%',
              scrub: 0.3,
            },
          },
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-scroll-text">
      <h1 ref={textRef} aria-label={phrase}>
        {characters.map((char, index) => (
          <span key={`${char}-${index}`} className={`char ${char === ' ' ? 'space' : 'letter'}`} aria-hidden="true">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      <style>{`
        .section-scroll-text {
          background-color: #1e1e1e;
          height: 100svh;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .section-scroll-text h1 {
          display: flex;
          width: max-content;
          flex-shrink: 0;
          font-family: system-ui, sans-serif;
          font-size: clamp(5rem, 13vw, 15rem);
          font-weight: 600;
          line-height: 0.95;
          color: #fff;
          margin: 0;
          white-space: nowrap;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .section-scroll-text .char {
          display: inline-block;
          will-change: transform;
          transform-origin: center;
        }

        .section-scroll-text .space {
          width: 0.35em;
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .section-scroll-text h1 {
            font-size: 30vw;
            line-height: 0.9;
          }

          .section-scroll-text .space {
            width: 0.42em;
          }
        }
      `}</style>
    </section>
  );
};

export default HorizontalTextScroll;
