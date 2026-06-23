"use client";

import { NJ_COUNTIES, NJ_VIEWBOX } from "@/lib/nj-counties";
import { Check } from "@/components/icons";

/* "Where we work" map.
   Shows the detailed New Jersey county map. By default it also lists the 21
   counties beside the map; pass `mapOnly` to render just the map + primary
   county chips. Pass `light` to render on a light background. */

function NJMap({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox={NJ_VIEWBOX} className={className} role="img" aria-label="Map of New Jersey's 21 counties" fill="none">
      {NJ_COUNTIES.map((c) => (
        <path
          key={c.name}
          d={c.d}
          className={c.primary ? "fill-brand" : light ? "fill-stone/35" : "fill-steel"}
          stroke={light ? "#FFFFFF" : "#0B0B0C"}
          strokeWidth={1}
          strokeOpacity={light ? 0.9 : 0.7}
        />
      ))}
    </svg>
  );
}

export default function NJServiceMap({ light = false, mapOnly = false }: { light?: boolean; mapOnly?: boolean }) {
  const primary = NJ_COUNTIES.filter((c) => c.primary);
  const others = NJ_COUNTIES.filter((c) => !c.primary);

  /* Map + primary-county chips, no full directory beside it. */
  if (mapOnly) {
    return (
      <div>
        <NJMap light={light} className="w-full max-w-[17rem] lg:max-w-[20rem] mx-auto h-auto" />
        <div className="mt-8">
          <span className="spec text-brand mb-3 block">Primary Service Areas</span>
          <div className="flex flex-wrap gap-2">
            {primary.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-white text-sm font-display font-semibold">
                <Check className="w-3.5 h-3.5" />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14 items-center">
      {/* NJ map */}
      <div>
        <NJMap light={light} className="w-full max-w-[15rem] lg:max-w-[17rem] mx-auto lg:mx-0 h-auto" />
      </div>

      {/* counties list */}
      <div>
        <div className="mb-6">
          <span className="spec text-brand mb-3 block">Primary Service Areas</span>
          <div className="flex flex-wrap gap-2">
            {primary.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-white text-sm font-display font-semibold">
                <Check className="w-3.5 h-3.5" />
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <span className={`spec mb-3 block ${light ? "text-ash" : "text-bone/40"}`}>All 21 Counties Served</span>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-2.5">
          {others.map((c) => (
            <li key={c.name} className={`flex items-center gap-2 text-sm ${light ? "text-coal/70" : "text-bone/70"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-brand/70 flex-shrink-0" />
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
