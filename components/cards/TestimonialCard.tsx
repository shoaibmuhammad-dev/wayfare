import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

export default function TestimonialCard({ item }: { item: Testimonial }) {
  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <figure
      data-reveal
      className="flex flex-col rounded-2xl border border-line bg-white p-6"
    >
      <div
        className="flex gap-0.5 text-accent"
        role="img"
        aria-label={`${item.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`size-5 ${i < item.rating ? "fill-current" : "text-line"}`}
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-brand font-semibold text-white">
          {initials}
        </span>
        <span>
          <span className="block font-semibold">{item.name}</span>
          <span className="block text-sm text-ink/60">{item.trip}</span>
        </span>
      </figcaption>
    </figure>
  );
}
