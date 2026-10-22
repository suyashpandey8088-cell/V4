import { useLayoutEffect, useRef } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { OFFICIAL_MODEL_URL, OFFICIAL_SPECS_URL } from '../data/motorcycleSpecifications';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { BrandMark } from './BrandMark';
import { ChapterLabel } from './ChapterLabel';
import type { SceneProps } from './sceneTypes';

export function FinalReveal({ reducedMotion, isMobile }: SceneProps) {
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
          end: `+=${isMobile ? 145 : 190}%`,
          pin: pin.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(q('.final-scene__rear'), { filter: 'brightness(0.15)', scale: 0.86 }, { filter: 'brightness(1)', scale: 1, duration: 0.28 }, 0)
        .fromTo(q('.final-scene__floor'), { opacity: 0.1, scaleX: 0.45 }, { opacity: 0.9, scaleX: 1.15, duration: 0.5 }, 0)
        .to(q('.final-scene__rear'), { opacity: 0, duration: 0.15 }, 0.25)
        .fromTo(q('.final-scene__side'), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1.04, duration: 0.18 }, 0.27)
        .to(q('.final-scene__side'), { opacity: 0, duration: 0.15 }, 0.51)
        .fromTo(q('.final-scene__front'), { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.54)
        .fromTo(q('.final-scene__title'), { yPercent: 75, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2 }, 0.36)
        .fromTo(q('.final-scene__model'), { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.14 }, 0.62)
        .fromTo(q('.final-scene__actions'), { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15 }, 0.75)
        .fromTo(q('.final-scene__secondary'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.84)
        .to(q('.final-scene__halo'), { rotation: 120, scale: 1.25, duration: 1 }, 0);
    }, section);
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={section} id="reveal" className="chapter final-scene" aria-labelledby="final-title">
      <div ref={pin} className="scene-pin final-scene__pin">
        <div className="final-scene__topline">
          <ChapterLabel number="08" title="The Final Reveal" />
          <span className="microcopy">PRECISION ENGINEERED / UNMISTAKABLY DUCATI</span>
        </div>
        <div className="final-scene__halo" aria-hidden="true"><i /><i /></div>
        <div className="final-scene__floor" aria-hidden="true" />
        <div className="final-scene__ghost" aria-hidden="true">V4</div>
        <div className="final-scene__bike">
          <BikeImage src={sceneAssets.rearQuarter} alt="Panigale V4 rear three-quarter studio view" className="final-scene__rear" />
          <BikeImage src={sceneAssets.side} alt="" className="final-scene__side" decorative />
          <BikeImage src={sceneAssets.front} alt="" className="final-scene__front" decorative />
        </div>
        <div className="final-scene__content">
          <h2 id="final-title" className="final-scene__title">THE ROAD<br /><span>IS YOURS.</span></h2>
          <div className="final-scene__model">
            <span className="microcopy">DUCATI PANIGALE V4</span>
            <p>Precision engineered. Unmistakably Ducati.</p>
          </div>
          <div className="final-scene__actions">
            <a className="button button--primary" href={OFFICIAL_MODEL_URL} target="_blank" rel="noreferrer"><span>EXPLORE THE OFFICIAL MODEL</span><i aria-hidden="true">↗</i></a>
            <a className="button button--outline" href={OFFICIAL_SPECS_URL} target="_blank" rel="noreferrer"><span>DISCOVER TECHNICAL SPECIFICATIONS</span><i aria-hidden="true">↗</i></a>
          </div>
          <a className="final-scene__secondary microcopy" href="#design">REVISIT KEY FEATURES <span aria-hidden="true">↑</span></a>
        </div>
        <div className="final-scene__signoff microcopy"><span>THE ART OF CONTROL</span><span>END OF SEQUENCE / BEGINNING OF THE ROAD</span></div>
      </div>
      <footer className="footer">
        <BrandMark />
        <p>This is an independent, unofficial and non-commercial design concept. Ducati, Panigale and related imagery and trademarks remain the property of their respective owners. No affiliation or endorsement is implied.</p>
        <div className="footer__links microcopy">
          <a href={OFFICIAL_MODEL_URL} target="_blank" rel="noreferrer">OFFICIAL DUCATI ↗</a>
          <a href="#awakening">BACK TO TOP ↑</a>
          <span>CONCEPT / 2026</span>
        </div>
      </footer>
    </section>
  );
}
