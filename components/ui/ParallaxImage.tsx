"use client";

import { useRef } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export default function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  reveal = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  reveal?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        inner.current,
        { yPercent: -28 },
        {
          yPercent: 28,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      if (reveal) {
        gsap.from(wrap.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 75%",
            once: true,
          },
        });
      }
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute inset-x-0 top-[-15%] h-[130%] will-change-transform"
      >
        <SafeImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
