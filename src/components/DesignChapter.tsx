import { useLayoutEffect, useRef } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import { TechnicalAnnotation } from './TechnicalAnnotation';
import type { SceneProps } from './sceneTypes';

export function DesignChapter({ reducedMotion, isMobile }: SceneProps) {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !section.current || !pin.current) return;
    const context = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: `+=${isMobile ? 130 : 190}%`,
          pin: pin.current,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(q('.design-scene__bike'), { xPercent: 14, scale: 0.9 }, { xPercent: -8, scale: 1.1, duration: 0.85 }, 0)
        .fromTo(q('.design-scene__headline'), { xPercent: 4 }, { xPercent: -24, duration: 0.85 }, 0)
        .fromTo(q('.design-scene__wire path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.42, stagger: 0.05 }, 0.12)
        .fromTo(q('.design-scene__annotation--1'), { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.13 }, 0.18)
        .fromTo(q('.design-scene__annotation--2'), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.13 }, 0.34)
        .fromTo(q('.design-scene__annotation--3'), { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.13 }, 0.51)
        .fromTo(q('.design-scene__annotation--4'), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.13 }, 0.65)
        .fromTo(q('.design-scene__statement'), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.18 }, 0.7)
        .to(q('.design-scene__bike'), { scale: 1.2, xPercent: -12, duration: 0.2 }, 0.8)
        .to(q('.design-scene__background-word'), { xPercent: 18, rotation: 2, duration: 1 }, 0);
    }, section);
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={section} id="design" className="chapter design-scene" aria-labelledby="design-title">
      <div ref={pin} className="scene-pin design-scene__pin">
        <div className="design-scene__texture" aria-hidden="true" />
        <div className="design-scene__topline">
          <ChapterLabel number="02" title="Form Meets Function" light />
          <span className="microcopy">DESIGN STUDY / DUCATI RED</span>
        </div>
        <div className="design-scene__background-word" aria-hidden="true">FORM</div>
        <h2 id="design-title" className="design-scene__headline">
          DESIGN THAT MOVES<br /><span>BEFORE YOU DO.</span>
        </h2>
        <div className="design-scene__bike">
          <BikeImage src={sceneAssets.sideTransparent} alt="Panigale V4 side profile showing its sculpted fairing, tank, tail and aerodynamic bodywork" />
        </div>
        <svg className="design-scene__wire" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M1070 260 1210 170h180" />
          <path pathLength="1" d="M850 280 720 160H520" />
          <path pathLength="1" d="M390 320 240 210H60" />
          <path pathLength="1" d="M1090 640 1250 750h150" />
        </svg>
        <TechnicalAnnotation number="01" className="design-scene__annotation--1">AERODYNAMIC PROFILE</TechnicalAnnotation>
        <TechnicalAnnotation number="02" className="design-scene__annotation--2" align="right">RACING-INSPIRED FAIRING</TechnicalAnnotation>
        <TechnicalAnnotation number="03" className="design-scene__annotation--3">SCULPTED BODYWORK</TechnicalAnnotation>
        <TechnicalAnnotation number="04" className="design-scene__annotation--4" align="right">RIDER-FOCUSED ERGONOMICS</TechnicalAnnotation>
        <p className="design-scene__statement">EVERY MILLIMETRE<br />HAS A PURPOSE.</p>
        <div className="design-scene__footer microcopy">
          <span>FORM / AIR / INTENT</span>
          <span>MY2027 — DUCATI RED</span>
        </div>
      </div>
    </section>
  );
}
