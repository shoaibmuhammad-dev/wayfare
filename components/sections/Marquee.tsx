"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const words = ["Visas", "Flights", "Hotels", "Car rental"];

function Row({ outline = false }: { outline?: boolean }) {
  const items = [...words, ...words, ...words];
  return (
    <div
      data-row
      className={`flex w-max items-center gap-10 whitespace-nowrap font-display text-6xl font-semibold sm:text-8xl ${
        outline
          ? "text-transparent [-webkit-text-stroke:1.5px_var(--ink)]"
          : "text-ink"
      }`}
    >
      {items.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          {w}
          <span aria-hidden className="size-4 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const [a, b] = gsap.utils.toArray<HTMLElement>(
        "[data-row]",
        root.current,
      );
      const trigger = {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      };
      gsap.fromTo(
        a,
        { xPercent: 0 },
        { xPercent: -35, ease: "none", scrollTrigger: trigger },
      );
      gsap.fromTo(
        b,
        { xPercent: -35 },
        { xPercent: 0, ease: "none", scrollTrigger: trigger },
      );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="space-y-4 overflow-hidden py-16 sm:py-24"
    >
      <Row />
      <Row outline />
    </div>
  );
}
