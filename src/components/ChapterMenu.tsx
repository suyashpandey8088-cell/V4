import { useEffect, useRef } from 'react';
import { chapters } from '../data/chapterContent';
import type { ChapterId } from '../data/chapterContent';

type ChapterMenuProps = {
  activeChapter: number;
  onClose: () => void;
  onNavigate: (id: ChapterId) => void;
};

export function ChapterMenu({ activeChapter, onClose, onNavigate }: ChapterMenuProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialog.current) return;
      const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>('button, a[href]'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="chapter-menu" role="dialog" aria-modal="true" aria-labelledby="chapter-menu-title" ref={dialog}>
      <div className="chapter-menu__top">
        <span className="microcopy">PANIGALE V4 / EXPERIENCE INDEX</span>
        <button ref={closeButton} className="chapter-menu__close" type="button" onClick={onClose} aria-label="Close chapter menu">
          <span>CLOSE</span><i aria-hidden="true">×</i>
        </button>
      </div>
      <div className="chapter-menu__body">
        <div className="chapter-menu__intro">
          <span className="chapter-menu__ghost" aria-hidden="true">V4</span>
          <p className="eyebrow">THE ART OF CONTROL</p>
          <h2 id="chapter-menu-title">EIGHT CHAPTERS.<br />ONE OBSESSION.</h2>
          <p className="chapter-menu__note">Select a chapter to move through the experience. Scroll-linked sequences remain fully reversible.</p>
        </div>
        <nav className="chapter-menu__list" aria-label="Chapters">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              className={index === activeChapter ? 'is-current' : ''}
              onClick={() => onNavigate(chapter.id)}
              aria-current={index === activeChapter ? 'step' : undefined}
            >
              <span className="chapter-menu__number">{chapter.number}</span>
              <span className="chapter-menu__title">{chapter.title}</span>
              <span className="chapter-menu__arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="chapter-menu__footer microcopy">
        <span>UNOFFICIAL DESIGN CONCEPT</span>
        <span>SOUND OPTIONAL / MOTION RESPECTED</span>
      </div>
    </div>
  );
}
