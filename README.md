# Wayfare: Travel Agency Website

A fast, animated, SEO-ready travel agency site for four services: **Visa Services, Flight Tickets, Hotel Booking and Car Rental**. Built with Next.js (App Router), TypeScript, Tailwind CSS and GSAP. It runs on mock data, so no backend or API keys are needed.

## Quick start

Requires Node.js 18.18+ (20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
```

## Change the colors

All theme colors live in one place: the `:root` block at the top of `app/globals.css`.

```css
:root {
  --page: #ffffff;       /* page background */
  --surface: #f1f6f6;    /* alternate section background */
  --ink: #08252d;        /* text and dark sections */
  --brand: #0e7c86;      /* buttons, links, highlights */
  --brand-dark: #0a5f67; /* brand hover */
  --accent: #f2b01e;     /* call-to-action accents */
  --line: #d3e0e1;       /* borders */
}
```

Components use plain Tailwind classes such as `bg-brand`, `text-ink` and `border-line`, which read these variables. Font sizes use standard Tailwind classes directly in the components (no custom size tokens).

Two files cannot read CSS variables and use hard-coded hex values: `app/opengraph-image.tsx` (social share image) and `app/icon.svg` (favicon).

## Animations (GSAP)

| Effect | File |
| --- | --- |
| Hero: headline line reveal, parallax photo, route card with a looping plane (MotionPath), content fades as you scroll away | `components/sections/Hero.tsx` |
| Scroll progress bar at the top | `components/layout/ScrollProgress.tsx` |
| Marquee: two rows of large type slide in opposite directions as you scroll | `components/sections/Marquee.tsx` |
| Destinations: section pins and the cards scroll sideways (desktop); normal grid on smaller screens | `components/sections/Destinations.tsx` |
| Parallax and clip-path image reveal | `components/ui/ParallaxImage.tsx` |
| Scroll reveals (`data-reveal`), counters, card hover effects | `ui/Reveal.tsx`, `ui/Counter.tsx`, `hooks/useLift.ts` |

All motion is skipped when the visitor has "reduce motion" enabled.

## Speed

- Server components by default. Only interactive and animated pieces are client components.
- `next/image` with AVIF/WebP, responsive `sizes`, lazy loading and a priority hero image.
- Fonts through `next/font` (self-hosted, no layout shift).
- GSAP plugins are registered once in `lib/gsap.ts`; `optimizePackageImports` is enabled for GSAP and lucide-react.
- Content stays visible if JavaScript is slow or disabled (animations only enhance it).

For the best scores, download the photos into `public/images/` and point the URLs in `data/site.ts` to local paths. Photos are currently loaded from Unsplash (free license) and fall back to a brand gradient if one fails to load.

## SEO

- Title template, description, Open Graph, Twitter card, canonical URL and theme color (`app/layout.tsx`).
- JSON-LD `TravelAgency` schema with the service list.
- `app/sitemap.ts`, `app/robots.ts`, generated social image (`app/opengraph-image.tsx`) and favicon.
- Semantic HTML: one `h1`, section headings, landmarks, labelled forms, descriptive image alt text.
- Set your domain with an environment variable: create `.env.local` containing `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`.

## Project structure

```
app/                 layout, page, globals.css (theme), sitemap, robots, OG image, icon
components/
  layout/            Header, Footer, ScrollProgress
  sections/          Hero, SearchSection, Marquee, Services, Destinations,
                     WhyUs, Testimonials, Contact
  search/            SearchPanel, Flight/Hotel/Car/Visa forms, Results
  cards/             ServiceCard, DestinationCard, TestimonialCard
  ui/                Button, Field, Container, SectionHeading, Reveal,
                     Counter, SafeImage, ParallaxImage
data/                site.ts (brand, copy, images), mock.ts (search data)
hooks/               useLift.ts
lib/                 gsap setup, formatting, icons
types/               shared TypeScript types
```

## Mock search

Search logic is in `data/mock.ts`: flights are generated per route, hotels and cars are filtered from static lists, and visa results come from a country rules table. Replace `searchFlights`, `searchHotels`, `searchCars` and `searchVisa` with real API calls that return the same types to go live.

## Notes

- Brand name, phone, address, stats and reviews are placeholders: edit `data/site.ts`.
- The contact form validates input and simulates sending; connect it to an API route or email service.
- Deploy on Vercel: no environment variables are required (except the optional site URL).
# wayfare
