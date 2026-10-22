import { useLayoutEffect, useRef } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import { ScrollPrompt } from './ScrollPrompt';
import type { SceneProps } from './sceneTypes';

export function HeroScene({ reducedMotion, isMobile }: SceneProps) {
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
          end: `+=${isMobile ? 145 : 230}%`,
          pin: pin.current,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(q('.hero-scene__bike'), { scale: 0.96, xPercent: 4 }, { scale: 1.07, xPercent: -1, duration: 0.62 }, 0)
        .fromTo(q('.hero-scene__front'), { filter: 'brightness(0.34) saturate(0.65)' }, { filter: 'brightness(1) saturate(1.05)', duration: 0.28 }, 0)
        .fromTo(q('.hero-scene__beam'), { scaleX: 0.04, opacity: 0.2 }, { scaleX: 1, opacity: 0.85, duration: 0.34 }, 0.02)
        .fromTo(q('.hero-scene__red-aura'), { opacity: 0.24, scale: 0.72 }, { opacity: 0.75, scale: 1.15, duration: 0.52 }, 0.04)
        .fromTo(q('.hero-scene__line-one'), { yPercent: 20, opacity: 0.7 }, { yPercent: 0, opacity: 1, duration: 0.18 }, 0.12)
        .fromTo(q('.hero-scene__word--one'), { xPercent: -90, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.17 }, 0.22)
        .fromTo(q('.hero-scene__word--two'), { xPercent: 110, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.17 }, 0.25)
        .fromTo(q('.hero-scene__word--three'), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.17 }, 0.28)
        .to(q('.hero-scene__front'), { opacity: 0, duration: 0.2 }, 0.4)
        .to(q('.hero-scene__side'), { opacity: 1, duration: 0.2 }, 0.4)
        .to(q('.hero-scene__bike'), { scale: 1.12, xPercent: -4, duration: 0.32 }, 0.6)
        .to(q('.hero-scene__giant'), { xPercent: 9, duration: 0.8 }, 0)
        .to(q('.hero-scene__headline'), { xPercent: -3, duration: 0.32 }, 0.62)
        .to(q('.hero-scene__dial'), { rotation: 140, duration: 1 }, 0)
        .to(q('.scroll-prompt'), { opacity: 0, y: 20, duration: 0.12 }, 0.08)
        .fromTo(q('.hero-scene__footer'), { opacity: 0 }, { opacity: 1, duration: 0.16 }, 0.72);
    }, section);
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={section} id="awakening" className="chapter hero-scene" aria-labelledby="hero-title">
      <div ref={pin} className="scene-pin hero-scene__pin">
        <div className="hero-scene__grid graphic-grid" aria-hidden="true" />
        <div className="hero-scene__red-aura" aria-hidden="true" />
        <div className="hero-scene__beam" aria-hidden="true" />
        <div className="hero-scene__topline">
          <ChapterLabel number="01" title="The Awakening" />
          <span className="microcopy">DUCATI / PANIGALE V4 / PERFORMANCE SERIES</span>
        </div>
        <div className="hero-scene__giant" aria-hidden="true">PANIGALE</div>
        <div className="hero-scene__dial technical-dial" aria-hidden="true"><i /><i /><span>360°</span></div>
        <div className="hero-scene__bike" aria-label="Ducati Panigale V4 front three-quarter view transitioning to side profile as the page scrolls">
          <BikeImage src={sceneAssets.front} alt="Ducati Panigale V4 in Ducati Red, front three-quarter studio view" className="hero-scene__front" eager />
          <BikeImage src={sceneAssets.side} alt="" className="hero-scene__side" eager decorative />
        </div>
        <h1 id="hero-title" className="hero-scene__headline">
          <span className="hero-scene__headline-mask"><span className="hero-scene__line-one">NOT BUILT TO FOLLOW.</span></span>
          <span className="hero-scene__headline-mask hero-scene__headline-mask--second">
            <span className="hero-scene__word--one">BUILT</span>{' '}
            <span className="hero-scene__word--two">TO</span>{' '}
            <span className="hero-scene__word--three hero-scene__accent">LEAD.</span>
          </span>
        </h1>
        <p className="hero-scene__intro">The art of control.<br />A study in Italian performance.</p>
        <div className="hero-scene__sidecode microcopy" aria-hidden="true">V4 — 1103 / DESMOSEDICI STRADALE</div>
        <div className="hero-scene__prompt"><ScrollPrompt /></div>
        <div className="hero-scene__footer microcopy">
          <span>SCROLL-CONTROLLED STUDIO SEQUENCE</span>
          <span>FRONT ¾ &nbsp;→&nbsp; SIDE PROFILE</span>
        </div>
      </div>
    </section>
  );
}
