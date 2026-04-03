"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const reduceMotion = !!useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = reduceMotion ? { stiffness: 1000, damping: 1000 } : { stiffness: 150, damping: 15 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const touchMedia = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(touchMedia.matches);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 7);
      y.set(event.clientY - 7);
    };

    const updateTargetState = (target: EventTarget | null, hovering: boolean) => {
      if (!(target instanceof Element)) {
        setActive(false);
        return;
      }

      setActive(hovering && !!target.closest("a, button, [data-cursor-target]"));
    };

    update();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", (event) => updateTargetState(event.target, true));
    window.addEventListener("mouseout", (event) => updateTargetState(event.relatedTarget, false));
    touchMedia.addEventListener("change", update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      touchMedia.removeEventListener("change", update);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[14px] w-[14px] rounded-full bg-terracotta opacity-60 mix-blend-multiply"
      style={{ x: cursorX, y: cursorY, scale: active ? 2 : 1 }}
      transition={reduceMotion ? { duration: 0.2 } : undefined}
    />
  );
}
