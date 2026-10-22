import { useLayoutEffect, useRef } from 'react';
import { sceneAssets } from '../data/assetManifest';
import { derivedPowerToWeight, MODEL_DATASET, motorcycleSpecifications, OFFICIAL_SPECS_URL } from '../data/motorcycleSpecifications';
import { gsap } from '../lib/animation';
import { BikeImage } from './BikeImage';
import { ChapterLabel } from './ChapterLabel';
import type { SceneProps } from './sceneTypes';

const stats = [
  { key: 'power', className: 'power', ...motorcycleSpecifications.power },
  { key: 'torque', className: 'torque', ...motorcycleSpecifications.torque },
  { key: 'displacement', className: 'displacement', ...motorcycleSpecifications.displacement },
  { key: 'weight', className: 'weight', ...motorcycleSpecifications.weight },
];

export function EngineChapter({ reducedMotion, isMobile }: SceneProps) {
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
          end: `+=${isMobile ? 165 : 240}%`,
          pin: pin.current,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(q('.engine-scene__core'), { scale: 1.5, rotation: -5 }, { scale: 1, rotation: 0, duration: 0.42 }, 0)
        .fromTo(q('.engine-scene__heat'), { opacity: 0.1, scale: 0.7 }, { opacity: 0.85, scale: 1.15, duration: 0.46 }, 0)
        .fromTo(q('.engine-scene__orbit'), { rotation: -80 }, { rotation: 80, duration: 0.75 }, 0)
        .fromTo(q('.engine-stat'), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.12 }, 0.18)
        .fromTo(q('.engine-scene__configuration'), { autoAlpha: 0, x: -35 }, { autoAlpha: 1, x: 0, duration: 0.18 }, 0.35)
        .to(q('.engine-scene__core'), { scale: 1.12, duration: 0.25 }, 0.46)
        .to(q('.engine-scene__complete-bike'), { opacity: 1, scale: 1, duration: 0.2 }, 0.76)
        .to(q('.engine-scene__core'), { opacity: 0, scale: 0.86, duration: 0.18 }, 0.76)
        .to(q('.engine-stat'), { opacity: 0.16, duration: 0.18 }, 0.8)
        .fromTo(q('.engine-scene__assembled'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.14 }, 0.84);

      q<HTMLElement>('.engine-stat__number').forEach((element, index) => {
        const target = Number(element.dataset.value);
        const decimals = Number(element.dataset.decimals ?? 0);
        const counter = { value: 0 };
        timeline.fromTo(counter, { value: 0 }, {
          value: target,
          duration: 0.15,
          onUpdate: () => {
            element.textContent = counter.value.toFixed(decimals);
          },
        }, 0.2 + index * 0.12);
      });
    }, section);
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={section} id="performance" className="chapter engine-scene" aria-labelledby="engine-title">
      <div ref={pin} className="scene-pin engine-scene__pin">
        <div className="engine-scene__texture" aria-hidden="true" />
        <div className="engine-scene__topline">
          <ChapterLabel number="04" title="The Heart of Performance" />
          <span className="microcopy">DESMOSEDICI STRADALE / 90° V4</span>
        </div>
        <h2 id="engine-title" className="engine-scene__title">FOUR CYLINDERS.<br /><span>ONE OBSESSION.</span></h2>
        <div className="engine-scene__heat" aria-hidden="true" />
        <div className="engine-scene__orbit" aria-hidden="true"><i /><i /><span>V4</span></div>
        <div className="engine-scene__core">
          <BikeImage src={sceneAssets.engine} alt="Close crop of the MY2027 Panigale V4 engine and transmission area" />
          <span className="engine-scene__core-label microcopy">ENGINE / TRANSMISSION ASSEMBLY</span>
        </div>
        <div className="engine-scene__complete-bike" aria-hidden="true">
          <BikeImage src={sceneAssets.side} alt="" decorative />
        </div>
        <div className="engine-scene__stats">
          {stats.map((stat) => (
            <div key={stat.key} className={`engine-stat engine-stat--${stat.className}`} aria-label={`${stat.label}: ${stat.value} ${stat.unit}${'detail' in stat ? ` ${stat.detail}` : ''}`}>
              <span className="engine-stat__label microcopy">{stat.label}</span>
              <div className="engine-stat__readout" aria-hidden="true">
                <span className="engine-stat__number" data-value={stat.value} data-decimals={String(stat.value).includes('.') ? 1 : 0}>{stat.value}</span>
                <span className="engine-stat__unit">{stat.unit}</span>
              </div>
              {'detail' in stat && <span className="engine-stat__detail microcopy">{stat.detail}</span>}
            </div>
          ))}
        </div>
        <div className="engine-scene__configuration">
          <span className="microcopy">{motorcycleSpecifications.configuration.label}</span>
          <strong>{motorcycleSpecifications.configuration.value}</strong>
          <p>{motorcycleSpecifications.configuration.detail}</p>
          <span className="engine-scene__gearbox microcopy">{motorcycleSpecifications.transmission.value} / {motorcycleSpecifications.transmission.detail}</span>
        </div>
        <p className="engine-scene__assembled">ASSEMBLED.<br />WITHOUT COMPROMISE.</p>
        <div className="engine-scene__source microcopy">
          <span>{MODEL_DATASET}</span>
          <span>{derivedPowerToWeight} HP/KG / DERIVED FROM PUBLISHED FIGURES</span>
          <a href={OFFICIAL_SPECS_URL} target="_blank" rel="noreferrer">VERIFY AT DUCATI ↗</a>
        </div>
      </div>
    </section>
  );
}
