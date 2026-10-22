import { useCallback, useEffect, useState } from 'react';
import { AerodynamicsChapter } from './components/AerodynamicsChapter';
import { ChapterMenu } from './components/ChapterMenu';
import { CockpitChapter } from './components/CockpitChapter';
import { CustomCursor } from './components/CustomCursor';
import { DesignChapter } from './components/DesignChapter';
import { EngineChapter } from './components/EngineChapter';
import { ExplodedView } from './components/ExplodedView';
import { FinalReveal } from './components/FinalReveal';
import { HeroScene } from './components/HeroScene';
import { Navigation } from './components/Navigation';
import { Preloader } from './components/Preloader';
import { RacingChapter } from './components/RacingChapter';
import type { ChapterId } from './data/chapterContent';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useResponsiveScene } from './hooks/useResponsiveScene';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useSoundscape } from './hooks/useSoundscape';
import { ScrollTrigger } from './lib/animation';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { isMobile } = useResponsiveScene();
  const { activeChapter, progressRef } = useScrollProgress();
  const sound = useSoundscape();

  const finishLoading = useCallback(() => {
    setLoading(false);
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const navigateToChapter = useCallback((id: ChapterId) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, 60);
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    return () => document.documentElement.classList.remove('reduced-motion');
  }, [reducedMotion]);

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading);
    return () => document.body.classList.remove('is-loading');
  }, [loading]);

  useEffect(() => {
    const onVisibility = () => document.documentElement.classList.toggle('page-hidden', document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const sceneProps = { reducedMotion, isMobile };

  return (
    <>
      {loading && <Preloader onComplete={finishLoading} />}
      <Navigation
        activeChapter={activeChapter}
        soundEnabled={sound.enabled}
        progressRef={progressRef}
        onToggleSound={sound.toggle}
        onOpenMenu={openMenu}
      />
      {menuOpen && <ChapterMenu activeChapter={activeChapter} onClose={closeMenu} onNavigate={navigateToChapter} />}
      <CustomCursor reducedMotion={reducedMotion} />
      <div className="site-grain" aria-hidden="true" />
      <main id="main-content">
        <HeroScene {...sceneProps} />
        <DesignChapter {...sceneProps} />
        <ExplodedView {...sceneProps} />
        <EngineChapter {...sceneProps} />
        <AerodynamicsChapter {...sceneProps} />
        <RacingChapter {...sceneProps} />
        <CockpitChapter {...sceneProps} />
        <FinalReveal {...sceneProps} />
      </main>
    </>
  );
}
