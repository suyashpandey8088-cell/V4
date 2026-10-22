import { useEffect, useState } from 'react';

function readViewport() {
  if (typeof window === 'undefined') return { isMobile: false, isTablet: false };
  return {
    isMobile: window.matchMedia('(max-width: 700px)').matches,
    isTablet: window.matchMedia('(min-width: 701px) and (max-width: 1024px)').matches,
  };
}

export function useResponsiveScene() {
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)');
    const tablet = window.matchMedia('(min-width: 701px) and (max-width: 1024px)');
    const update = () => setViewport({ isMobile: mobile.matches, isTablet: tablet.matches });
    update();
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);

  return viewport;
}
