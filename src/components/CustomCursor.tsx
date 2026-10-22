import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor({ reducedMotion }: { reducedMotion: boolean }) {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const ringElement = ring.current;
    const dotElement = dot.current;
    if (!ringElement || !dotElement) return;

    const ringX = gsap.quickTo(ringElement, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringElement, 'y', { duration: 0.35, ease: 'power3.out' });
    const dotX = gsap.quickTo(dotElement, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dotElement, 'y', { duration: 0.08, ease: 'power2.out' });
    const move = (event: PointerEvent) => {
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
      const interactive = (event.target as Element).closest('a, button, [role="button"]');
      ringElement.classList.toggle('cursor--active', Boolean(interactive));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ring} className="cursor__ring" />
      <div ref={dot} className="cursor__dot" />
    </div>
  );
}
