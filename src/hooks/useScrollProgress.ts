import { useEffect, useRef, useState } from 'react';
import { chapters } from '../data/chapterContent';

export function useScrollProgress() {
  const [activeChapter, setActiveChapter] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
        progressRef.current.parentElement?.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      }

      let nextChapter = 0;
      chapters.forEach((chapter, index) => {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.48) {
          nextChapter = index;
        }
      });
      setActiveChapter((current) => (current === nextChapter ? current : nextChapter));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { activeChapter, progressRef };
}
