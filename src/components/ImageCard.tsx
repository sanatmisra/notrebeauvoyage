"use client";

import Image from "next/image";
import { useState } from "react";

type ImageCardProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export default function ImageCard({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  imageClassName,
  sizes,
}: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 animate-pulse bg-gradient-to-br from-linen-dark to-gold/20 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={imageClassName}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
