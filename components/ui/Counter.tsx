"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export default function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.textContent = `${value.toLocaleString("en-US")}${suffix}`;
        return;
      }
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n).toLocaleString("en-US")}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return <span ref={ref}>0{suffix}</span>;
}
