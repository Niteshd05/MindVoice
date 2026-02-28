import { useState, useEffect } from 'react';

export function useAnimation(duration: number = 1000, autoStart: boolean = true) {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(autoStart);

  useEffect(() => {
    if (!isAnimating) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      if (newProgress === 1) {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isAnimating, duration]);

  const reset = () => {
    setProgress(0);
    setIsAnimating(true);
  };

  const start = () => setIsAnimating(true);
  const stop = () => setIsAnimating(false);

  return { progress, isAnimating, reset, start, stop };
}

export function useInViewAnimation(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(ref);
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, isInView };
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}
