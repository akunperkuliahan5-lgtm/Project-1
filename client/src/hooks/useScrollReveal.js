import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 30 });

    const anim = gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 90%',
      },
      y: 0,
      opacity: 1,
      duration: options.duration || 1.5,
      delay: options.delay || 0,
      ease: options.ease || 'power2.out',
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return ref;
}

export default useScrollReveal;
