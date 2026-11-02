"use client";

import SafeImage from "@/components/ui/SafeImage";
import { useLift } from "@/hooks/useLift";
import { formatPrice } from "@/lib/format";
import type { Destination } from "@/types";

export default function DestinationCard({
  destination: d,
}: {
  destination: Destination;
}) {
  const lift = useLift<HTMLElement>();

  const showFlights = () => {
    window.dispatchEvent(
      new CustomEvent("select-service", { detail: "flights" }),
    );
    document
      .getElementById("search")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <article
      {...lift}
      className="relative h-104 w-full shrink-0 overflow-hidden rounded-2xl bg-ink sm:h-112 lg:h-[min(34rem,60vh)] lg:w-120 xl:h-[min(38rem,62vh)] xl:w-xl"
    >
      <div data-hover-media className="absolute inset-0">
        <SafeImage
          src={d.image}
          alt={`${d.name}, ${d.country}`}
          width={1024}
          height={1024}
          sizes="(min-width: 1280px) 576px, (min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
          className="object-fill w-full h-full"
        />
      </div>

      <p
        aria-hidden
        className="absolute left-6 top-5 font-display text-6xl font-semibold text-white/40 lg:text-7xl"
      >
        {d.code}
      </p>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-5 pt-24 text-white lg:p-7 lg:pt-28">
        <h3 className="font-display text-2xl font-semibold lg:text-3xl">
          {d.name}
        </h3>
        <p className="text-sm text-white/75 lg:text-base">{d.country}</p>
        <p className="mt-2 text-base text-white/90 lg:text-lg">{d.blurb}</p>
        <div className="mt-4 flex items-center justify-between lg:mt-5">
          <p className="text-base lg:text-lg">
            Flights from{" "}
            <span className="font-semibold">{formatPrice(d.from)}</span>
          </p>
          <button
            type="button"
            onClick={showFlights}
            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent hover:text-ink lg:text-base"
          >
            Search
          </button>
        </div>
      </div>
    </article>
  );
}
