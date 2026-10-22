import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import type { SceneProps } from './sceneTypes';

const parts = [
  { name: 'tail', label: '01 / TAIL + SUBFRAME', clip: 'polygon(8% 4%, 41% 4%, 48% 42%, 29% 49%, 10% 38%)', x: -95, y: -55, r: -4 },
  { name: 'tank', label: '02 / TANK + BODY PANELS', clip: 'polygon(38% 5%, 67% 4%, 72% 37%, 53% 45%, 38% 31%)', x: -20, y: -105, r: 2 },
  { name: 'fairing', label: '03 / FRONT FAIRING + WINGLETS', clip: 'polygon(65% 3%, 94% 7%, 96% 52%, 73% 63%, 61% 38%)', x: 100, y: -62, r: 4 },
  { name: 'rear-wheel', label: '04 / REAR WHEEL', clip: 'circle(17% at 24% 63%)', x: -100, y: 58, r: -10 },
  { name: 'engine', label: '05 / ENGINE + TRANSMISSION', clip: 'polygon(34% 35%, 67% 35%, 68% 78%, 34% 79%)', x: 0, y: 80, r: 0 },
  { name: 'front-wheel', label: '06 / FRONT WHEEL + BRAKE', clip: 'circle(17% at 77% 63%)', x: 105, y: 60, r: 10 },
  { name: 'exhaust', label: '07 / EXHAUST ROUTING', clip: 'polygon(29% 66%, 68% 63%, 63% 88%, 31% 88%)', x: 10, y: 118, r: -2 },
] as const;

export function ExplodedView({ reducedMotion, isMobile }: SceneProps) {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !section.current || !pin.current) return;
    const context = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const movement = isMobile ? 0.42 : 1;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: `+=${isMobile ? 170 : 260}%`,
          pin: pin.current,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      timeline
        .to(q('.exploded-bike__base'), { opacity: 0.1, duration: 0.12 }, 0.12)
        .to(q('.exploded-bike__part'), { opacity: 1, duration: 0.12 }, 0.12)
        .to(q('.exploded-scene__guides'), { opacity: 0.8, duration: 0.16 }, 0.2)
        .to(q('.exploded-scene__title--surface'), { yPercent: -60, opacity: 0, duration: 0.12 }, 0.36)
        .fromTo(q('.exploded-scene__title--purpose'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.14 }, 0.48)
        .to(q('.exploded-scene__part-label'), { opacity: 1, y: 0, duration: 0.12, stagger: 0.025 }, 0.34)
        .to(q('.exploded-scene__guides'), { opacity: 0.2, duration: 0.16 }, 0.74)
        .to(q('.exploded-scene__part-label'), { opacity: 0, y: 12, duration: 0.1, stagger: 0.015 }, 0.72)
        .to(q('.exploded-bike__base'), { opacity: 1, duration: 0.12 }, 0.88)
        .to(q('.exploded-bike__part'), { opacity: 0, duration: 0.1 }, 0.9);

      parts.forEach((part, index) => {
        timeline
          .to(q(`.exploded-bike__part--${part.name}`), {
            x: part.x * movement,
            y: part.y * movement,
            rotation: part.r * movement,
            duration: 0.3,
          }, 0.18 + index * 0.012)
          .to(q(`.exploded-bike__part--${part.name}`), {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.22,
          }, 0.66 + index * 0.008);
      });
    }, section);
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={section} id="anatomy" className="chapter exploded-scene" aria-labelledby="anatomy-title">
      <div ref={pin} className="scene-pin exploded-scene__pin">
        <div className="exploded-scene__metal" aria-hidden="true" />
        <div className="exploded-scene__topline">
          <ChapterLabel number="03" title="Anatomy of a Beast" />
          <span className="microcopy">2D COMPONENT STUDY / 07 ASSEMBLIES</span>
        </div>
        <span className="exploded-scene__chapter-ghost" aria-hidden="true">03</span>
        <h2 id="anatomy-title" className="exploded-scene__title">
          <span className="exploded-scene__title--surface">BEAUTY IS ONLY<br />THE SURFACE.</span>
          <span className="exploded-scene__title--purpose">EVERY PART<br />HAS A PURPOSE.</span>
        </h2>
        <div className="exploded-scene__guides" aria-hidden="true">
          <i className="guide guide--h" /><i className="guide guide--v" />
          <span className="guide-circle guide-circle--one" /><span className="guide-circle guide-circle--two" />
        </div>
        <div className="exploded-bike" aria-label="Conceptual two-dimensional component separation of the Panigale V4 side profile">
          <BikeImage src={sceneAssets.sideTransparent} alt="Panigale V4 complete side profile" className="exploded-bike__base" />
          {parts.map((part) => (
            <div
              key={part.name}
              className={`exploded-bike__part exploded-bike__part--${part.name}`}
              style={{ clipPath: part.clip } as CSSProperties}
              aria-hidden="true"
            >
              <BikeImage src={sceneAssets.sideTransparent} alt="" decorative />
            </div>
          ))}
        </div>
        <div className="exploded-scene__labels" aria-hidden="true">
          {parts.map((part, index) => (
            <span key={part.name} className={`exploded-scene__part-label exploded-scene__part-label--${index + 1}`}>{part.label}</span>
          ))}
        </div>
        <div className="exploded-scene__status microcopy">
          <span>ASSEMBLED</span><i aria-hidden="true" /><span>SEPARATED</span><i aria-hidden="true" /><span>REASSEMBLED</span>
        </div>
        <p className="exploded-scene__disclaimer microcopy">REGIONS OF ONE OFFICIAL RENDER / CONCEPTUAL STUDY, NOT AN ASSEMBLY GUIDE</p>
      </div>
    </section>
  );
}
