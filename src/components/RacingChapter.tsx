import { useLayoutEffect, useRef } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import type { SceneProps } from './sceneTypes';

export function RacingChapter({ reducedMotion }: SceneProps) {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !section.current) return;
    const context = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.7 },
      });

      timeline
        .fromTo(q('.racing-scene__track-environment'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
        .fromTo(q('.racing-scene__side'), { xPercent: -16, scale: 0.9 }, { xPercent: 2, scale: 1.08, duration: 0.62 }, 0)
        .fromTo(q('.racing-scene__track-line path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.58 }, 0.08)
        .fromTo(q('.racing-scene__telemetry-item'), { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.12, stagger: 0.08 }, 0.18)
        .fromTo(q('.racing-scene__detail--1'), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 0.15 }, 0.22)
        .fromTo(q('.racing-scene__detail--2'), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 0.15 }, 0.39)
        .fromTo(q('.racing-scene__detail--3'), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 0.15 }, 0.55)
        .to(q('.racing-scene__details'), { autoAlpha: 0, x: 50, duration: 0.14 }, 0.72)
        .to(q('.racing-scene__side'), { opacity: 0, scale: 1.13, duration: 0.16 }, 0.74)
        .fromTo(q('.racing-scene__rear'), { opacity: 0, scale: 0.88, xPercent: 8 }, { opacity: 1, scale: 1.04, xPercent: 0, duration: 0.2 }, 0.76)
        .fromTo(q('.racing-scene__signoff'), { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: 0.16 }, 0.82)
        .to(q('.racing-scene__track-environment'), { backgroundPosition: 'center, 120px 0, 0 0', duration: 1 }, 0);
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={section} id="racing" className="chapter racing-scene" aria-labelledby="racing-title">
      <div className="scene-sticky racing-scene__sticky">
        <div className="racing-scene__track-environment" aria-hidden="true" />
        <div className="racing-scene__topline">
          <ChapterLabel number="06" title="The Racing DNA" />
          <span className="microcopy">TRAJECTORY / CONTROL / PRECISION</span>
        </div>
        <span className="racing-scene__ghost" aria-hidden="true">06</span>
        <h2 id="racing-title" className="racing-scene__title">BORN FROM THE PURSUIT<br />OF EVERY <span>MILLISECOND.</span></h2>
        <svg className="racing-scene__track-line" viewBox="0 0 900 650" aria-hidden="true">
          <path pathLength="1" d="M140 510C40 420 85 260 210 250c100-8 85-150 220-160 130-10 265 40 280 145 12 85-100 85-80 170 25 110 180 80 160 180-25 125-230 30-330 20-120-12-230 20-320-95Z" />
          <circle cx="140" cy="510" r="8" /><circle cx="790" cy="585" r="8" />
        </svg>
        <div className="racing-scene__bike">
          <BikeImage src={sceneAssets.side} alt="Panigale V4 side profile in a racing-inspired environment" className="racing-scene__side" />
          <BikeImage src={sceneAssets.rearQuarter} alt="Panigale V4 rear three-quarter view" className="racing-scene__rear" decorative />
        </div>
        <div className="racing-scene__telemetry" aria-label="Design themes, not live telemetry">
          {['TRAJECTORY', 'CONTROL', 'PRECISION', 'PERFORMANCE'].map((label, index) => (
            <div className="racing-scene__telemetry-item" key={label}>
              <span>0{index + 1}</span><strong>{label}</strong><i aria-hidden="true" />
            </div>
          ))}
          <small className="microcopy">DESIGN THEMES / NO LIVE OR HISTORICAL RACE DATA</small>
        </div>
        <div className="racing-scene__details">
          <figure className="racing-scene__detail racing-scene__detail--1"><BikeImage src={sceneAssets.fairing} alt="Panigale V4 fairing detail" /><figcaption>01 / FAIRING</figcaption></figure>
          <figure className="racing-scene__detail racing-scene__detail--2"><BikeImage src={sceneAssets.brake} alt="Panigale V4 brake and front tyre detail" /><figcaption>02 / BRAKE + TYRE</figcaption></figure>
          <figure className="racing-scene__detail racing-scene__detail--3"><BikeImage src={sceneAssets.tail} alt="Panigale V4 tail and rear chassis detail" /><figcaption>03 / CHASSIS</figcaption></figure>
        </div>
        <p className="racing-scene__signoff">ROAD MACHINE.<br /><span>RACING MINDSET.</span></p>
        <div className="racing-scene__footer microcopy"><span>CONCEPTUAL CIRCUIT / NOT A REAL TRACK</span><span>BORGO PANIGALE → EVERY APEX</span></div>
      </div>
    </section>
  );
}
