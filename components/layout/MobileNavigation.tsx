"use client";

import { useEffect } from "react";
import { ArrowUpRight, Plane, X } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNavigation({
  open,
  onClose,
}: MobileNavigationProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close navigation menu"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Navigation panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`absolute right-0 top-0 flex h-dvh w-[min(88vw,420px)] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-6">
          <Link
            href="#top"
            onClick={onClose}
            className="flex items-center gap-3 font-display text-xl font-semibold text-ink"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-ink">
              <Plane className="size-5" />
            </span>
            {site.name}
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex size-10 items-center justify-center rounded-full bg-surface text-ink transition-all duration-300 hover:rotate-90 hover:bg-accent"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation links */}
        <Container className="flex flex-1 flex-col px-6 py-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Explore
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Everything you need for your next journey.
            </p>
          </div>

          <nav aria-label="Mobile primary" className="flex flex-col">
            {site.nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                style={{
                  transitionDelay: open ? `${180 + index * 90}ms` : "0ms",
                }}
                className={`group flex items-center justify-between border-b border-line py-5 transition-all duration-500 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <span className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-teal-700">
                  {item.label}
                </span>

                <ArrowUpRight className="size-5 -translate-x-2 translate-y-2 text-teal-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div
            style={{
              transitionDelay: open ? "650ms" : "0ms",
            }}
            className={`mt-auto pt-12 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <Link
              href="#search"
              tabIndex={open ? 0 : -1}
              onClick={onClose}
              className={buttonStyles("primary", "w-full justify-center")}
            >
              Book your trip
              <ArrowUpRight className="size-4" />
            </Link>

            <p className="mt-5 text-center text-xs text-slate-400">
              Your journey starts here.
            </p>
          </div>
        </Container>
      </aside>
    </div>
  );
}
