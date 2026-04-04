"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type AmbientPreset = {
  blobBackground: string;
  blobOpacity: number;
  blobTransform: string;
  raysOpacity: number;
};

type RayConfig = {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  blur: string;
  opacity: number;
  startDeg: string;
  midDeg: string;
  endDeg: string;
  driftX: string;
  duration: number;
  delay: number;
  floatDuration: number;
  floatDelay: number;
};

const SECTION_PRESETS: Record<string, AmbientPreset> = {
  hero: {
    blobBackground: "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)",
    blobOpacity: 0.8,
    blobTransform: "translate3d(25vw, -5vh, 0)",
    raysOpacity: 0.6,
  },
  invitation: {
    blobBackground: "radial-gradient(circle, rgba(201,135,106,0.05) 0%, transparent 70%)",
    blobOpacity: 0.6,
    blobTransform: "translate3d(-5vw, 15vh, 0)",
    raysOpacity: 0.35,
  },
  "our-story": {
    blobBackground: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)",
    blobOpacity: 0.7,
    blobTransform: "translate3d(35vw, 5vh, 0)",
    raysOpacity: 0.6,
  },
  "the-journey": {
    blobBackground: "radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)",
    blobOpacity: 1,
    blobTransform: "translate3d(15vw, 25vh, 0)",
    raysOpacity: 1,
  },
  guests: {
    blobBackground: "radial-gradient(circle, rgba(201,135,106,0.05) 0%, transparent 70%)",
    blobOpacity: 0.6,
    blobTransform: "translate3d(-10vw, 10vh, 0)",
    raysOpacity: 0.35,
  },
  gallery: {
    blobBackground: "radial-gradient(circle, rgba(212,168,83,0.14) 0%, transparent 70%)",
    blobOpacity: 1,
    blobTransform: "translate3d(20vw, 20vh, 0)",
    raysOpacity: 1,
  },
};

const SECTION_TO_PRESET: Record<string, keyof typeof SECTION_PRESETS> = {
  home: "hero",
  hero: "hero",
  invitation: "invitation",
  theme: "invitation",
  "our-story": "our-story",
  "the-journey": "the-journey",
  guests: "guests",
  gallery: "gallery",
};

const RAY_CONFIGS: RayConfig[] = [
  {
    id: 1,
    left: "8%",
    top: "-10%",
    width: "2px",
    height: "74vh",
    blur: "10px",
    opacity: 0.06,
    startDeg: "-8deg",
    midDeg: "-5deg",
    endDeg: "-3deg",
    driftX: "12px",
    duration: 18,
    delay: 0,
    floatDuration: 34,
    floatDelay: 0,
  },
  {
    id: 2,
    left: "22%",
    top: "-20%",
    width: "1px",
    height: "88vh",
    blur: "18px",
    opacity: 0.04,
    startDeg: "3deg",
    midDeg: "6deg",
    endDeg: "4deg",
    driftX: "8px",
    duration: 24,
    delay: 3,
    floatDuration: 42,
    floatDelay: 4,
  },
  {
    id: 3,
    left: "40%",
    top: "-5%",
    width: "3px",
    height: "68vh",
    blur: "14px",
    opacity: 0.08,
    startDeg: "-5deg",
    midDeg: "-2deg",
    endDeg: "-7deg",
    driftX: "15px",
    duration: 20,
    delay: 6,
    floatDuration: 31,
    floatDelay: 2,
  },
  {
    id: 4,
    left: "58%",
    top: "-15%",
    width: "2px",
    height: "90vh",
    blur: "20px",
    opacity: 0.05,
    startDeg: "6deg",
    midDeg: "3deg",
    endDeg: "8deg",
    driftX: "10px",
    duration: 22,
    delay: 1,
    floatDuration: 45,
    floatDelay: 6,
  },
  {
    id: 5,
    left: "75%",
    top: "-8%",
    width: "3px",
    height: "64vh",
    blur: "12px",
    opacity: 0.07,
    startDeg: "-3deg",
    midDeg: "-7deg",
    endDeg: "-4deg",
    driftX: "14px",
    duration: 26,
    delay: 4,
    floatDuration: 39,
    floatDelay: 3,
  },
  {
    id: 6,
    left: "90%",
    top: "-12%",
    width: "1px",
    height: "80vh",
    blur: "16px",
    opacity: 0.04,
    startDeg: "5deg",
    midDeg: "2deg",
    endDeg: "7deg",
    driftX: "9px",
    duration: 19,
    delay: 8,
    floatDuration: 36,
    floatDelay: 7,
  },
];

export default function AmbientLight() {
  const shimmerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activePreset, setActivePreset] = useState<AmbientPreset>(SECTION_PRESETS.hero);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(hover: none)");

    if (reducedMotionQuery.matches) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);
    setIsTouchDevice(touchQuery.matches);

    const handleTouchChange = (event: MediaQueryListEvent) => {
      setIsTouchDevice(event.matches);
    };

    touchQuery.addEventListener("change", handleTouchChange);

    return () => {
      touchQuery.removeEventListener("change", handleTouchChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const sectionIds = ["home", "hero", "invitation", "theme", "our-story", "the-journey", "guests", "gallery"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!sections.length) {
      return;
    }

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let currentId = "home";
        let currentRatio = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > currentRatio) {
            currentId = id;
            currentRatio = ratio;
          }
        });

        const presetKey = SECTION_TO_PRESET[currentId] ?? "hero";
        setActivePreset(SECTION_PRESETS[presetKey]);
      },
      {
        rootMargin: "-28% 0px -42% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !shimmerRef.current) {
      return;
    }

    const animation = shimmerRef.current.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1)" },
        { transform: "translate3d(3%, -4%, 0) scale(1.04)" },
        { transform: "translate3d(-2%, 3%, 0) scale(0.98)" },
        { transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      {
        duration: isTouchDevice ? 16000 : 22000,
        iterations: Number.POSITIVE_INFINITY,
        direction: "alternate",
        easing: "ease-in-out",
      },
    );

    return () => {
      animation.cancel();
    };
  }, [isTouchDevice, shouldRender]);

  const visibleRays = useMemo(() => {
    const durationFactor = isTouchDevice ? 0.7 : 1;
    const filtered = isTouchDevice
      ? RAY_CONFIGS.filter((ray) => ray.id % 2 === 1)
      : RAY_CONFIGS;

    return filtered.map((ray) => ({
      ...ray,
      duration: ray.duration * durationFactor,
      floatDuration: ray.floatDuration * durationFactor,
    }));
  }, [isTouchDevice]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div aria-hidden="true" className="ambient-light-root">
      <svg className="ambient-light-svg" focusable="false" aria-hidden="true">
        <defs>
          <filter id="water-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.008"
              numOctaves="3"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015 0.008; 0.018 0.010; 0.015 0.008"
                dur="12s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="ambient-rays"
        style={{
          opacity: activePreset.raysOpacity,
          filter: isTouchDevice ? "none" : "url(#water-distortion)",
        }}
      >
        {visibleRays.map((ray) => (
          <div
            key={ray.id}
            className="ambient-ray-shell"
            style={{
              left: ray.left,
              top: ray.top,
              height: ray.height,
              animationDuration: `${ray.floatDuration}s`,
              animationDelay: `${ray.floatDelay}s`,
            }}
          >
            <div
              className="ambient-ray-core"
              style={
                {
                  width: ray.width,
                  height: ray.height,
                  filter: `blur(${ray.blur})`,
                  ["--ray-opacity" as string]: `${ray.opacity}`,
                  ["--ray-start" as string]: ray.startDeg,
                  ["--ray-mid" as string]: ray.midDeg,
                  ["--ray-end" as string]: ray.endDeg,
                  ["--ray-drift-x" as string]: ray.driftX,
                  animationDuration: `${ray.duration}s`,
                  animationDelay: `${ray.delay}s`,
                } as CSSProperties
              }
            />
          </div>
        ))}
      </div>

      <div
        className="ambient-blob-shell"
        style={{
          opacity: activePreset.blobOpacity,
          transform: activePreset.blobTransform,
        }}
      >
        <div
          ref={shimmerRef}
          className="ambient-blob-core"
          style={{ background: activePreset.blobBackground }}
        />
      </div>
    </div>
  );
}
