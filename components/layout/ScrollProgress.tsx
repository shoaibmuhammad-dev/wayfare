"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Thin bar at the top of the page that fills as you scroll. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      bar.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } },
    );
  });

  return <div ref={bar} aria-hidden style={{ transform: "scaleX(0)" }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent" />;
}
