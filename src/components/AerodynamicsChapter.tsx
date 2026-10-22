import { useLayoutEffect, useRef } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { motorcycleSpecifications } from '../data/motorcycleSpecifications';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import type { SceneProps } from './sceneTypes';

export function AerodynamicsChapter({ reducedMotion }: SceneProps) {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !section.current) return;
    const context = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
        },
      });

      timeline
        .fromTo(q('.aero-scene__side'), { xPercent: 12, scale: 0.88 }, { xPercent: -4, scale: 1.08, duration: 0.62 }, 0)
        .fromTo(q('.aero-scene__airflow path'), { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.35, stagger: 0.035 }, 0.12)
        .fromTo(q('.aero-scene__statement--one'), { autoAlpha: 0, yPercent: 70 }, { autoAlpha: 1, yPercent: 0, duration: 0.12 }, 0.08)
        .to(q('.aero-scene__statement--one'), { autoAlpha: 0, yPercent: -70, duration: 0.12 }, 0.25)
        .fromTo(q('.aero-scene__statement--two'), { autoAlpha: 0, yPercent: 70 }, { autoAlpha: 1, yPercent: 0, duration: 0.12 }, 0.35)
        .to(q('.aero-scene__statement--two'), { autoAlpha: 0, yPercent: -70, duration: 0.12 }, 0.52)
        .fromTo(q('.aero-scene__brake'), { autoAlpha: 0, scale: 0.65, rotation: -12 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.2 }, 0.42)
        .to(q('.aero-scene__brake'), { autoAlpha: 0, scale: 1.15, duration: 0.14 }, 0.65)
        .fromTo(q('.aero-scene__statement--three'), { autoAlpha: 0, scale: 0.75 }, { autoAlpha: 1, scale: 1, duration: 0.12 }, 0.65)
        .to(q('.aero-scene__side'), { opacity: 0, scale: 1.16, duration: 0.17 }, 0.73)
        .fromTo(q('.aero-scene__front'), { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1.04, duration: 0.2 }, 0.76)
        .to(q('.aero-scene__trails'), { xPercent: -24, duration: 1 }, 0)
        .to(q('.aero-scene__tunnel'), { backgroundPosition: '50% 140px', duration: 1 }, 0);
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={section} id="aerodynamics" className="chapter aero-scene" aria-labelledby="aero-title">
      <div className="scene-sticky aero-scene__sticky">
        <div className="aero-scene__tunnel" aria-hidden="true" />
        <div className="aero-scene__trails" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="aero-scene__topline">
          <ChapterLabel number="05" title="Aerodynamics in Motion" />
          <span className="microcopy">CONCEPTUAL AIRFLOW / NOT CFD DATA</span>
        </div>
        <h2 id="aero-title" className="aero-scene__title">EVERY LINE CUTS<br />THROUGH THE AIR.</h2>
        <div className="aero-scene__bike">
          <BikeImage src={sceneAssets.side} alt="Panigale V4 side profile in a conceptual airflow visualization" className="aero-scene__side" />
          <BikeImage src={sceneAssets.front} alt="Panigale V4 low front three-quarter angle" className="aero-scene__front" decorative />
        </div>
        <svg className="aero-scene__airflow" viewBox="0 0 1400 760" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M-80 250C250 180 410 240 650 280S1050 160 1500 250" />
          <path pathLength="1" d="M-80 315C260 270 430 320 660 345s410-90 840-25" />
          <path pathLength="1" d="M-80 520c350 60 550-20 770-50s430 70 810 10" />
          <path pathLength="1" d="M-80 590c300 30 520-30 760-55s450 95 820 20" />
          <path pathLength="1" d="M1060 170c90 40 110 105 40 150" />
        </svg>
        <div className="aero-scene__statements" aria-hidden="true">
          <p className="aero-scene__statement aero-scene__statement--one">LESS RESISTANCE.</p>
          <p className="aero-scene__statement aero-scene__statement--two">MORE CONTROL.</p>
          <p className="aero-scene__statement aero-scene__statement--three">TOTAL INTENT.</p>
        </div>
        <figure className="aero-scene__brake">
          <BikeImage src={sceneAssets.brake} alt="Close-up of the Panigale V4 front wheel and braking assembly" />
          <figcaption><strong>{motorcycleSpecifications.brakes.value}</strong><span>{motorcycleSpecifications.brakes.label}<br />Brembo Hypure®</span></figcaption>
        </figure>
        <div className="aero-scene__footer microcopy">
          <span>AIR / FORM / DIRECTION</span>
          <span>VISUALIZATION ONLY — NO SIMULATED VALUES</span>
        </div>
      </div>
    </section>
  );
}
