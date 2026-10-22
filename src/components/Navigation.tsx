import type { RefObject } from 'react';
import { chapters } from '../data/chapterContent';
import { BrandMark } from './BrandMark';

function SoundIcon({ enabled }: { enabled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      {enabled ? (
        <>
          <path d="M16 8c1.3 1 2 2.3 2 4s-.7 3-2 4M18.5 5.5c2 1.7 3 3.8 3 6.5s-1 4.8-3 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : (
        <path d="m16 9 5 6m0-6-5 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}

type NavigationProps = {
  activeChapter: number;
  soundEnabled: boolean;
  progressRef: RefObject<HTMLDivElement | null>;
  onToggleSound: () => void;
  onOpenMenu: () => void;
};

export function Navigation({
  activeChapter,
  soundEnabled,
  progressRef,
  onToggleSound,
  onOpenMenu,
}: NavigationProps) {
  const chapter = chapters[activeChapter];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to experience</a>
      <div className="scroll-progress" role="progressbar" aria-label="Experience progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
        <div ref={progressRef} className="scroll-progress__bar" />
      </div>
      <header className="navigation">
        <a className="navigation__brand" href="#awakening" aria-label="Back to the awakening">
          <BrandMark />
        </a>
        <div className="navigation__concept microcopy" aria-hidden="true">
          <span>THE ART OF CONTROL</span>
          <i />
          <span>BOLOGNA / ITALIA</span>
        </div>
        <nav className="navigation__actions" aria-label="Experience controls">
          <button className="navigation__chapter-button" type="button" onClick={onOpenMenu}>
            <span>CHAPTER</span>
            <strong>{chapter.number}</strong>
            <span className="navigation__chapter-chevron">↓</span>
          </button>
          <button
            className={`icon-button sound-toggle${soundEnabled ? ' is-active' : ''}`}
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Turn ambient sound off' : 'Turn ambient sound on'}
            aria-pressed={soundEnabled}
            title={soundEnabled ? 'Sound on' : 'Sound off'}
          >
            <SoundIcon enabled={soundEnabled} />
            <span className="sound-toggle__label">{soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
          <button className="menu-button" type="button" onClick={onOpenMenu} aria-label="Open chapter menu">
            <span className="menu-button__label">MENU</span>
            <span className="menu-button__lines" aria-hidden="true"><i /><i /></span>
          </button>
        </nav>
      </header>
      <div className="chapter-status" aria-live="polite">
        <span className="chapter-status__count">{chapter.number} <i>/</i> 08</span>
        <span className="chapter-status__rule" aria-hidden="true" />
        <span className="chapter-status__title">{chapter.title}</span>
      </div>
      <div className="edge-index microcopy" aria-hidden="true">DUCATI / PANIGALE V4 / PERFORMANCE SERIES</div>
    </>
  );
}
