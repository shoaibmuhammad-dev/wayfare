"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { buttonStyles } from "@/components/ui/Button";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(planeRef.current, { opacity: 1, x: 180, y: 125 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-line]", { yPercent: 110, duration: 0.9, stagger: 0.12 })
        .from(
          "[data-hero-fade]",
          { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        )
        .from("[data-route-card]", { y: 30, opacity: 0, duration: 0.8 }, "<")
        .from(
          "[data-node]",
          {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.5,
            stagger: 0.25,
            ease: "back.out(2)",
          },
          "-=0.3",
        )
        .set(planeRef.current, { opacity: 1 })
        .to(planeRef.current, {
          motionPath: {
            path: pathRef.current!,
            align: pathRef.current!,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 9,
          repeat: -1,
          ease: "none",
        });

      // Headline drifts up and fades as the hero scrolls away.
      gsap.to("[data-hero-content]", {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative overflow-hidden bg-ink pb-44 pt-32 text-white sm:pb-48 lg:pt-44"
    >
      <ParallaxImage
        src={"/hero.jpg"}
        alt="Airplane flying above the clouds at sunrise"
        sizes="100vw"
        priority
        className="absolute inset-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/55 to-ink/90"
      />

      <Container className="relative">
        <div
          data-hero-content
          className="grid items-center gap-12 lg:grid-cols-5"
        >
          <div className="lg:col-span-3">
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-1">
                <span data-line className="block">
                  Plan the trip.
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-line className="block">
                  We handle the paperwork.
                </span>
              </span>
            </h1>
            <p
              data-hero-fade
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/80"
            >
              Visas, flights, hotels and cars from one desk in Karachi. Booked
              together, so nothing falls through.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <a href="#search" className={buttonStyles("accent")}>
                Search trips
                <ArrowDown className="size-4" aria-hidden />
              </a>
              <a href="#contact" className={buttonStyles("ghost")}>
                Talk to an agent
              </a>
            </div>
          </div>

          <HeroAnimation pathRef={pathRef} planeRef={planeRef} />
        </div>
      </Container>
    </section>
  );
}
