"use client";

import { useEffect, useState } from "react";
import { Menu, Plane, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { site } from "@/data/site";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "bg-white/95 text-ink shadow-sm backdrop-blur"
            : "bg-transparent text-white"
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="#top"
            className="flex items-center gap-2 font-display text-xl font-semibold"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-ink">
              <Plane className="size-4" aria-hidden />
            </span>
            {site.name}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium opacity-80 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#search"
              className={buttonStyles("accent", "h-10 px-5")}
            >
              Book now
            </Link>
          </nav>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-black/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </Container>
      </header>

      <MobileNavigation open={open} onClose={() => setOpen(false)} />
    </>
  );
}
