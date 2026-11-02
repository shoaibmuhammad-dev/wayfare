import type { RefObject } from "react";

const ROUTE = "M40 230 Q 90 130 180 125 Q 290 120 360 50";
const NODES = [
  { code: "KHI", x: 40, y: 230, dx: 12, dy: 28 },
  { code: "DXB", x: 180, y: 125, dx: -6, dy: 32 },
  { code: "LHR", x: 360, y: 50, dx: -46, dy: -14 },
];

interface HeroAnimationProps {
  pathRef: RefObject<SVGPathElement | null>;
  planeRef: RefObject<SVGGElement | null>;
}

const HeroAnimation = ({ pathRef, planeRef }: HeroAnimationProps) => {
  return (
    <div
      data-route-card
      className="hidden rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur lg:col-span-2 lg:block"
    >
      <p className="text-sm text-white/70">Most booked route this month</p>
      <svg
        viewBox="0 0 400 280"
        className="mt-2 w-full"
        role="img"
        aria-label="Flight route from Karachi through Dubai to London"
      >
        <path
          ref={pathRef}
          d={ROUTE}
          fill="none"
          className="stroke-white/50"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
        {NODES.map((n) => (
          <g key={n.code} data-node>
            <circle cx={n.x} cy={n.y} r="6" className="fill-accent" />
            <circle
              cx={n.x}
              cy={n.y}
              r="13"
              fill="none"
              className="stroke-accent/40"
            />
            <text
              x={n.x + n.dx}
              y={n.y + n.dy}
              className="fill-white font-display text-lg font-semibold"
            >
              {n.code}
            </text>
          </g>
        ))}
        <g ref={planeRef} className="opacity-0">
          <path d="M14 0 L-10 -8 L-5 0 L-10 8 Z" className="fill-accent" />
        </g>
      </svg>
    </div>
  );
};

export default HeroAnimation;
