import { ArrowUpRight } from "lucide-react";
import { serviceIcons } from "@/lib/icons";
import type { Service } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.id as keyof typeof serviceIcons];

  return (
    <article
      key={service.id}
      className="group relative isolate flex min-h-97.5 overflow-hidden rounded-[28px] border border-white/70 bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Background image */}
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-[20px]"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/55 to-slate-950/10 rounded-[28px]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-between p-5 sm:p-6">
        {/* Top icon */}
        <div className="flex items-start justify-between">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-xl transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-slate-950">
            <Icon size={21} strokeWidth={1.8} />
          </div>

          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-md">
            Travel service
          </span>
        </div>

        {/* Bottom content */}
        <Link
          href={"#contact"}
          className="rounded-[22px] border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-xl transition-all duration-500 group-hover:bg-white/15 sm:p-5 flex items-center justify-between"
        >
          <h3 className="font-display text-xl font-semibold tracking-tight leading-none">
            {service.title}
          </h3>

          <span className=" text-sm font-semibold text-white transition-colors hover:text-amber-300">
            {/* {service.cta} */}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
