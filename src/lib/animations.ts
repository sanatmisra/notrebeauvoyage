import type { Variants } from "framer-motion";

export const getFadeUp = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
});

export const getFadeIn = (): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
});

export const getStaggerContainer = (reducedMotion = false): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.15,
    },
  },
});

export const getSlideLeft = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, x: reducedMotion ? 0 : -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

export const getSlideRight = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, x: reducedMotion ? 0 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

export const getScaleUp = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

export const fadeUp = getFadeUp();
export const fadeIn = getFadeIn();
export const staggerContainer = getStaggerContainer();
export const slideLeft = getSlideLeft();
export const slideRight = getSlideRight();
export const scaleUp = getScaleUp();

export const viewport = {
  once: true,
  margin: "-100px",
};
