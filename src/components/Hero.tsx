"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import ImageCard from "@/components/ImageCard";
import { getFadeUp } from "@/lib/animations";

type PolaroidProps = {
  src?: string;
  caption: string;
  width: number;
  rotate: number;
  parallaxSpeed: number;
  delay: number;
  gradient: string;
  desktopStyle: React.CSSProperties;
  mobileStyle?: React.CSSProperties;
  mobileX?: string | number;
  hideOnMobile?: boolean;
  rotateShift?: [number, number];
  disableParallax: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
};

const grainOverlay =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

function Polaroid({
  src,
  caption,
  width,
  rotate,
  parallaxSpeed,
  delay,
  gradient,
  desktopStyle,
  mobileStyle,
  mobileX,
  hideOnMobile = false,
  rotateShift,
  disableParallax,
  scrollYProgress,
}: PolaroidProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : parallaxSpeed * -300]);
  const dynamicRotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateShift && !disableParallax ? rotateShift : [rotate, rotate],
  );
  const cardWidth = disableParallax ? Math.round(width * 0.65) : width;
  const imageWidth = cardWidth - 24;
  const imageHeight = Math.round(imageWidth * 0.75);
  const entranceRotate = rotate + (rotate >= 0 ? 8 : -8);

  return (
    <motion.figure
      initial={{
        opacity: 0,
        scale: disableParallax ? 1 : 0.85,
        rotate: disableParallax ? rotate : entranceRotate,
      }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{
        delay,
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        width: `${cardWidth}px`,
        y,
        x: disableParallax && mobileX ? mobileX : 0,
        rotate: dynamicRotate,
        ...desktopStyle,
        ...(disableParallax ? mobileStyle : {}),
      }}
      className={`absolute z-[2] bg-white p-[12px_12px_32px_12px] shadow-[0_8px_32px_rgba(44,36,22,0.18),0_2px_8px_rgba(44,36,22,0.10)] will-change-transform ${
        hideOnMobile ? "hidden md:block" : ""
      }`}
      data-cursor-target
    >
      <div className="relative overflow-hidden bg-linen-dark">
        {src ? (
          <ImageCard
            src={src}
            alt={caption}
            width={imageWidth}
            height={imageHeight}
            priority={delay <= 0.2}
            sizes="(max-width: 767px) 45vw, 300px"
            className="relative"
            imageClassName="h-auto w-full object-cover"
          />
        ) : (
          <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-pulse"
              style={{ background: gradient }}
            />
          </div>
        )}
      </div>
    </motion.figure>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = !!useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const disableParallax = isMobile || !!reduceMotion;
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);
  const fadeUp = getFadeUp(!!reduceMotion);

  const glow = useMotionTemplate`radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212, 168, 83, 0.08) 0%, transparent 70%)`;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[100dvh] overflow-hidden bg-linen"
    >
      <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: grainOverlay }}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-1.jpg */}
      <Polaroid
        src="/images/couple/IMG_1045.JPG"
        caption="München, always"
        width={280}
        rotate={-6}
        parallaxSpeed={0.15}
        delay={0.2}
        gradient="linear-gradient(135deg, #C9876A, #D4A853)"
        desktopStyle={{ top: "8%", left: "4%" }}
        hideOnMobile
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
        rotateShift={[-6, -8]}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-2.jpg */}
      <Polaroid
        src="/images/couple/DSC_0221.JPG"
        caption="The beginning"
        width={240}
        rotate={3}
        parallaxSpeed={0.28}
        delay={0.35}
        gradient="linear-gradient(160deg, #8B9E8A, #C9876A)"
        desktopStyle={{ top: "5%", left: "22%" }}
        mobileStyle={{ top: "5%", left: "2%", rotate: "-5deg" }}
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-3.jpg */}
      <Polaroid
        src="/images/couple/IMG_5960.JPG"
        caption="Rajasthan, 2014"
        width={300}
        rotate={-4}
        parallaxSpeed={0.2}
        delay={0.15}
        gradient="linear-gradient(120deg, #D4A853, #EDE4D6)"
        desktopStyle={{ top: "12%", right: "20%" }}
        mobileStyle={{ top: "5%", right: "2%", rotate: "4deg" }}
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-4.jpg */}
      <Polaroid
        src="/images/couple/DSC03572.JPG"
        caption="Our favourite evening"
        width={260}
        rotate={7}
        parallaxSpeed={0.35}
        delay={0.45}
        gradient="linear-gradient(145deg, #2C2416, #C9876A)"
        desktopStyle={{ top: "6%", right: "3%" }}
        hideOnMobile
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
        rotateShift={[7, 9]}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-5b.jpg */}
      <Polaroid
        src="/images/couple/DSC05137.jpeg"
        caption="A long summer"
        width={210}
        rotate={-2}
        parallaxSpeed={0.24}
        delay={0.4}
        gradient="linear-gradient(135deg, #D4A853, #C9876A)"
        desktopStyle={{ top: "32%", left: "12%" }}
        hideOnMobile
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-5.jpg */}
      <Polaroid
        src="/images/couple/DSC02319.JPG"
        caption="Still us"
        width={220}
        rotate={5}
        parallaxSpeed={0.22}
        delay={0.3}
        gradient="linear-gradient(135deg, #C9876A, #8B9E8A)"
        desktopStyle={{ bottom: "12%", left: "6%" }}
        mobileStyle={{ bottom: "8%", left: "50%", rotate: "-2deg" }}
        mobileX="-50%"
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-6b.jpg */}
      <Polaroid
        src="/images/couple/7fb8057d-687b-486f-82d6-fbecb7fb69f5.jpg"
        caption="Weekend away"
        width={205}
        rotate={6}
        parallaxSpeed={0.26}
        delay={0.38}
        gradient="linear-gradient(145deg, #8B9E8A, #D4A853)"
        desktopStyle={{ bottom: "24%", right: "19%" }}
        hideOnMobile
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/trip/cote-d-azur-1.jpg */}
      <Polaroid
        caption="Côte d'Azur, soon"
        width={270}
        rotate={-3}
        parallaxSpeed={0.18}
        delay={0.5}
        gradient="linear-gradient(150deg, #EDE4D6, #D4A853)"
        desktopStyle={{ bottom: "8%", left: "28%" }}
        hideOnMobile
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-6c.jpg */}
      <Polaroid
        src="/images/couple/IMG_20160519_100006350.jpg"
        caption="City mornings"
        width={230}
        rotate={2}
        parallaxSpeed={0.16}
        delay={0.55}
        gradient="linear-gradient(140deg, #EDE4D6, #C9876A)"
        desktopStyle={{ bottom: "7%", right: "27%" }}
        hideOnMobile
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
      />

      {/* REPLACE: add your photo path here e.g. /images/couple/photo-7.jpg */}
      <Polaroid
        src="/images/couple/5O3A9476_Original.JPG"
        caption="Ten years"
        width={250}
        rotate={-8}
        parallaxSpeed={0.3}
        delay={0.25}
        gradient="linear-gradient(130deg, #8B9E8A, #2C2416)"
        desktopStyle={{ bottom: "10%", right: "5%" }}
        scrollYProgress={scrollYProgress}
        disableParallax={disableParallax}
        rotateShift={[-8, -6]}
      />

      <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4 text-center">
        <div className="w-fit max-w-[85vw] border border-gold/25 bg-[rgba(245,239,230,0.72)] px-8 py-8 shadow-[0_8px_48px_rgba(44,36,22,0.10)] backdrop-blur-[16px] md:px-16 md:py-12">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.9, ease: "easeOut" }}
            className="font-body text-[0.68rem] font-light uppercase tracking-[0.3em] text-terracotta"
          >
            You are warmly invited
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
            className="mt-5 font-display font-light italic text-espresso"
            style={{ fontSize: isMobile ? "clamp(2.5rem, 10vw, 3.5rem)" : "clamp(3rem, 7vw, 6rem)", lineHeight: 0.95 }}
          >
            Sanat &amp; Sneha
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
            className="mt-6 flex items-center justify-center gap-3 text-gold"
          >
            <span className="text-xs" aria-hidden="true">
              ◆
            </span>
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="text-xs" aria-hidden="true">
              ◆
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3, duration: 0.9, ease: "easeOut" }}
            className="mt-6 font-body text-[0.8rem] font-light uppercase tracking-[0.25em] text-espresso/70"
          >
            29 April 2025
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4, duration: 0.9, ease: "easeOut" }}
            className="mt-3 font-display text-[1.1rem] italic text-terracotta"
          >
            C&#244;te d&apos;Azur &nbsp; &#183; &nbsp; Notre Beau Voyage
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: scrollCueOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="font-body text-[0.65rem] font-light uppercase tracking-[0.2em] text-espresso/55">
            Scroll
          </p>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={reduceMotion ? undefined : { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="mt-3 h-12 w-px bg-gold"
          />
        </motion.div>
      </div>
    </section>
  );
}
