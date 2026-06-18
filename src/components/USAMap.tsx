/* USA map (SVG) — every state in a muted tone, New Jersey highlighted in brand red.
   Self-contained, zero-dependency. Paths use the standard 960×600 albersUsa
   projection (the same geometry D3 ships). `currentColor` drives the base
   state fill so it adapts to whatever surface it sits on; NJ is fixed brand red. */

import { US_STATES } from "@/lib/us-states";

export default function USAMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 600"
      className={className}
      role="img"
      aria-label="Map of the United States with New Jersey highlighted"
      fill="none"
    >
      {US_STATES.map((s) => {
        const isNJ = s.id === "NJ";
        return (
          <path
            key={s.id}
            d={s.d}
            className={isNJ ? "fill-brand" : "fill-current"}
            stroke={isNJ ? "#FF2A2A" : "currentColor"}
            strokeOpacity={isNJ ? 1 : 0.18}
            strokeWidth={isNJ ? 1.5 : 0.75}
          />
        );
      })}
    </svg>
  );
}
