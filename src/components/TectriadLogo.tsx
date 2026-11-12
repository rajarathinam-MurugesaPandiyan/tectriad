import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import type { AnimationItem } from 'lottie-web';
import logoAnimationData from '../assets/logo.json';

interface TectriadLogoProps {
  size?: number;
  className?: string;
}

const REDUCED_MOTION_FRAME = 70;

/**
 * Animated Tectriad Lottie brand mark rendered via SVG,
 * respecting user `prefers-reduced-motion` settings.
 */
export const TectriadLogo: React.FC<TectriadLogoProps> = ({
  size = 32,
  className,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = motionQuery.matches;

    const anim: AnimationItem = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: !prefersReduced,
      autoplay: !prefersReduced,
      animationData: logoAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    if (prefersReduced) {
      anim.goToAndStop(REDUCED_MOTION_FRAME, true);
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        anim.loop = false;
        anim.goToAndStop(REDUCED_MOTION_FRAME, true);
      } else {
        anim.loop = true;
        anim.play();
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      anim.destroy();
    };
  }, []);

  return (
    <span
      ref={containerRef}
      aria-hidden="true"
      className={
        className
          ? `tectriad-lottie-logo ${className}`
          : 'tectriad-lottie-logo'
      }
      style={{ width: size, height: size }}
    />
  );
};
