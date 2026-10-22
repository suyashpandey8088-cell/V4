import { useLayoutEffect, useRef, useState } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { riderSystems } from '../data/chapterContent';
import { motorcycleSpecifications, OFFICIAL_MODEL_URL } from '../data/motorcycleSpecifications';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import type { SceneProps } from './sceneTypes';

export function CockpitChapter({ reducedMotion }: SceneProps) {
  const section = useRef<HTMLElement>(null);
  const [selectedSystem, setSelectedSystem] = useState(0);
  const system = riderSystems[selectedSystem];

  useLayoutEffect(() => {
    if (reducedMotion || !section.current) return;
    const context = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.7 },
      });

      timeline
        .fromTo(q('.cockpit-scene__camera'), { scale: 1.5, xPercent: 8 }, { scale: 1, xPercent: 0, duration: 0.58 }, 0)
        .fromTo(q('.cockpit-scene__display'), { autoAlpha: 0, y: 80, rotationX: -12 }, { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.2 }, 0.18)
        .fromTo(q('.cockpit-scene__systems'), { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0, duration: 0.18 }, 0.34)
        .fromTo(q('.cockpit-scene__display-stat'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.4)
        .fromTo(q('.cockpit-scene__road'), { opacity: 0 }, { opacity: 0.6, duration: 0.25 }, 0.64)
        .to(q('.cockpit-scene__camera'), { scale: 1.08, opacity: 0.48, duration: 0.24 }, 0.7)
        .to(q('.cockpit-scene__scan'), { yPercent: 650, duration: 0.7 }, 0.12);
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={section} id="command" className="chapter cockpit-scene" aria-labelledby="cockpit-title">
      <div className="scene-sticky cockpit-scene__sticky">
        <div className="cockpit-scene__camera" aria-hidden="true"><BikeImage src={sceneAssets.cockpit} alt="" decorative /></div>
        <div className="cockpit-scene__road" aria-hidden="true" />
        <div className="cockpit-scene__topline">
          <ChapterLabel number="07" title="The Rider's Command" />
          <span className="microcopy">HUMAN / MACHINE / SIGNAL</span>
        </div>
        <h2 id="cockpit-title" className="cockpit-scene__title">POWER MEANS NOTHING<br /><span>WITHOUT CONTROL.</span></h2>
        <div className="cockpit-scene__display-stat">
          <strong>{motorcycleSpecifications.display.value}</strong>
          <span>{motorcycleSpecifications.display.label}<br />{motorcycleSpecifications.display.detail}</span>
        </div>
        <div className="cockpit-scene__interface">
          <div className="cockpit-scene__display" aria-label="Illustrative electronics system display">
            <div className="cockpit-scene__display-top microcopy"><span>PANIGALE V4</span><span>SYSTEM INDEX</span></div>
            <div className="cockpit-scene__scan" aria-hidden="true" />
            <div className="cockpit-scene__display-main">
              <span className="cockpit-scene__display-code">{system.code}</span>
              <strong>{system.name}</strong>
              <p>{system.description}</p>
            </div>
            <div className="cockpit-scene__display-footer microcopy"><span>DVO / 6-AXIS IMU</span><span>ILLUSTRATIVE / NOT LIVE DATA</span></div>
          </div>
          <div className="cockpit-scene__systems" role="group" aria-label="Explore verified electronic rider aids">
            {riderSystems.map((item, index) => (
              <button key={item.id} type="button" className={selectedSystem === index ? 'is-active' : ''} onClick={() => setSelectedSystem(index)} aria-pressed={selectedSystem === index}>
                <span>0{index + 1}</span><strong>{item.code}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </div>
        <div className="cockpit-scene__source microcopy">
          <span>VERIFIED MY2027 EQUIPMENT / RIDING MODES + POWER MODES</span>
          <a href={OFFICIAL_MODEL_URL} target="_blank" rel="noreferrer">OFFICIAL ELECTRONICS ↗</a>
        </div>
      </div>
    </section>
  );
}
