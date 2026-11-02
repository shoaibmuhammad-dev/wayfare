"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { SearchResults } from "@/types";

function Row({ children, price, note }: { children: React.ReactNode; price: number; note: string }) {
  return (
    <li data-result className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <div className="sm:text-right">
          <p className="font-display text-2xl font-semibold">{formatPrice(price)}</p>
          <p className="text-sm text-ink/60">{note}</p>
        </div>
        <a href="#contact" className={buttonStyles("outline", "h-10 px-4 text-sm")}>
          Request booking
        </a>
      </div>
    </li>
  );
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-surface px-3 py-1 text-sm text-ink/70">{children}</span>
);

export default function Results({ results }: { results: SearchResults }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-result]", { y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" });
    },
    { scope: ref, dependencies: [results], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className="mt-8" aria-live="polite">
      <h3 className="font-display text-2xl font-semibold">{results.title}</h3>

      {results.items.length === 0 ? (
        <p className="mt-4 text-ink/70">Nothing matched. Try another destination or date.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {results.kind === "flights" &&
            results.items.map((f) => (
              <Row key={f.id} price={f.price} note="total for all passengers">
                <p className="font-semibold">{f.airline}</p>
                <p className="mt-1 text-lg">
                  {f.departs} {f.from} to {f.arrives} {f.to}
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  {f.duration} &middot; {f.stops === 0 ? "Non-stop" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}
                </p>
              </Row>
            ))}

          {results.kind === "hotels" &&
            results.items.map((h) => (
              <Row key={h.id} price={h.total} note={`${h.nights} night${h.nights > 1 ? "s" : ""} at ${formatPrice(h.pricePerNight)}`}>
                <p className="flex items-center gap-2 font-semibold">
                  {h.name}
                  <span className="flex items-center gap-0.5 text-accent" aria-label={`${h.stars} stars`}>
                    {Array.from({ length: h.stars }, (_, i) => (
                      <Star key={i} className="size-3.5 fill-current" aria-hidden />
                    ))}
                  </span>
                </p>
                <p className="mt-1 text-sm text-ink/60">Guest rating {h.rating} / 10</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {h.amenities.map((a) => (
                    <Pill key={a}>{a}</Pill>
                  ))}
                </div>
              </Row>
            ))}

          {results.kind === "cars" &&
            results.items.map((c) => (
              <Row key={c.id} price={c.total} note={`${c.days} day${c.days > 1 ? "s" : ""} at ${formatPrice(c.pricePerDay)}`}>
                <p className="font-semibold">{c.name}</p>
                <p className="mt-1 text-sm text-ink/60">{c.category}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>{c.seats} seats</Pill>
                  <Pill>{c.bags} bags</Pill>
                  <Pill>{c.transmission}</Pill>
                </div>
              </Row>
            ))}

          {results.kind === "visa" &&
            results.items.map((v) => (
              <Row key={v.id} price={v.total} note={`${v.travelers} traveler${v.travelers > 1 ? "s" : ""}, fee and service`}>
                <p className="font-semibold">{v.country}</p>
                <p className="mt-1 text-sm text-ink/60">
                  Processing {v.processing} &middot; Stay up to {v.stay} &middot; Government fee {formatPrice(v.fee)}
                </p>
                <p className="mt-3 text-sm font-medium">Documents we need</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink/70">
                  {v.documents.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Row>
            ))}
        </ul>
      )}
    </div>
  );
}
