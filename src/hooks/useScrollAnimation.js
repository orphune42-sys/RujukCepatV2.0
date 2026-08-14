import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Returns a [ref, isInView] pair.
 * once: false → animasi berulang setiap kali elemen masuk/keluar viewport.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px', ...options });
  return [ref, isInView];
}
