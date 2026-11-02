"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * GSAP hover effect for cards: lifts the card, zooms any [data-hover-media]
 * child and nudges any [data-hover-arrow] child.
 */
export function useLift<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const animate = (hovering: boolean) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    gsap.to(el, {
      y: hovering ? -8 : 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(el.querySelectorAll("[data-hover-media]"), {
      scale: hovering ? 1.08 : 1,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(el.querySelectorAll("[data-hover-arrow]"), {
      x: hovering ? 4 : 0,
      y: hovering ? -4 : 0,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  return {
    ref,
    onMouseEnter: contextSafe(() => animate(true)),
    onMouseLeave: contextSafe(() => animate(false)),
  };
}
