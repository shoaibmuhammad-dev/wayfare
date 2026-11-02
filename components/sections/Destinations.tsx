"use client";

import { useRef } from "react";
import DestinationCard from "@/components/cards/DestinationCard";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { destinations } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Destinations() {
  const section = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const wrapEl = wrap.current!;
          const trackEl = track.current!;

          // Pinned mode: the wrapper must not scroll natively.
          gsap.set(wrapEl, { overflowX: "hidden" });

          // How far the track has to travel so the last card ends fully in view.
          const distance = () =>
            Math.max(0, trackEl.scrollWidth - wrapEl.clientWidth);

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section.current,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(trackEl, { x: () => -distance(), force3D: true }, 0)
            .fromTo(bar.current, { scaleX: 0 }, { scaleX: 1 }, 0);
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="destinations"
      className="scroll-mt-16 overflow-hidden bg-surface py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <Container>
        <SectionHeading
          title="Popular destinations this season"
          description="Our most-booked cities, with starting return fares from Karachi."
        />
        <div className="mt-6 hidden h-1 w-full max-w-sm bg-line lg:block">
          <div
            ref={bar}
            style={{ transform: "scaleX(0)" }}
            className="h-full origin-left bg-brand"
          />
        </div>
      </Container>

      <div ref={wrap} className="mt-10 lg:overflow-x-auto lg:py-3">
        <div
          ref={track}
          className="grid gap-6 px-5 will-change-transform sm:grid-cols-2 sm:px-8 lg:flex lg:w-max lg:gap-8 lg:px-8"
        >
          {destinations.map((d) => (
            <DestinationCard key={d.code} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
