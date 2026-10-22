import { useEffect, useRef, useState } from 'react';
import { criticalAssets } from '../data/assetManifest';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [loaded, setLoaded] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const completed = useRef(false);
  const total = criticalAssets.length + 1;

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const finish = () => {
      if (completed.current || cancelled) return;
      completed.current = true;
      setLoaded(total);
      setLeaving(true);
      window.setTimeout(onComplete, 480);
    };
    const markLoaded = () => {
      if (cancelled) return;
      loadedCount += 1;
      setLoaded(loadedCount);
      if (loadedCount >= total) finish();
    };

    criticalAssets.forEach((src) => {
      const image = new Image();
      image.onload = markLoaded;
      image.onerror = markLoaded;
      image.src = src;
    });
    document.fonts.ready.then(markLoaded).catch(markLoaded);
    const safety = window.setTimeout(finish, 3200);

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, [onComplete, total]);

  const progress = Math.round((loaded / total) * 100);

  return (
    <div className={`preloader${leaving ? ' preloader--leaving' : ''}`} role="status" aria-live="polite">
      <div className="preloader__top microcopy">
        <span>DUCATI / PANIGALE V4</span>
        <span>UNOFFICIAL DIGITAL CONCEPT</span>
      </div>
      <div className="preloader__center">
        <span className="preloader__index">V4</span>
        <p className="preloader__title">THE ART<br />OF CONTROL</p>
      </div>
      <div className="preloader__bottom">
        <div className="preloader__meta microcopy">
          <span>LOADING STUDIO ASSETS</span>
          <span>{String(progress).padStart(3, '0')}%</span>
        </div>
        <div className="preloader__track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
