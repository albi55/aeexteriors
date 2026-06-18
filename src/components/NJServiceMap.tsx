"use client";

import { useEffect, useRef, useState } from "react";
import { US_STATES } from "@/lib/us-states";
import { NJ_COUNTIES, NJ_VIEWBOX } from "@/lib/nj-counties";
import { Check } from "@/components/icons";

/* Animated "Where we work" map.
   Phase flow (auto-plays once when scrolled into view):
     usa   → full United States, NJ highlighted (held ~1s)
     zoom  → camera zooms into NJ (USA still on screen, scaling up).
     split → the USA fades out; the detailed NJ county map slides in on the LEFT
             and the list of all 21 counties we serve slides in on the RIGHT.
   Respects prefers-reduced-motion (jumps straight to `split`). */

const NJ_ORIGIN_X = 88.3; // % — NJ center in the 960×600 US projection
const NJ_ORIGIN_Y = 38; // %
const ZOOM = 8;

type Phase = "usa" | "zoom" | "split";

function NJMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={NJ_VIEWBOX} className={className} role="img" aria-label="Map of New Jersey's 21 counties" fill="none">
      {NJ_COUNTIES.map((c) => (
        <path
          key={c.name}
          d={c.d}
          className={c.primary ? "fill-brand" : "fill-steel"}
          stroke="#0B0B0C"
          strokeWidth={1}
          strokeOpacity={0.7}
        />
      ))}
    </svg>
  );
}

export default function NJServiceMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [phase, setPhase] = useState<Phase>(reduced ? "split" : "usa");

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers.push(setTimeout(() => setPhase("zoom"), 1000));   // hold full USA ~1s, then zoom
        timers.push(setTimeout(() => setPhase("split"), 2800));  // zoom resolves, then slide into split
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const usa = phase === "usa";
  const split = phase === "split";

  const primary = NJ_COUNTIES.filter((c) => c.primary);
  const others = NJ_COUNTIES.filter((c) => !c.primary);

  return (
    <div ref={ref} className="relative min-h-[26rem] lg:min-h-[34rem]">

      {/* ── USA layer — zooms into NJ, then fades out as the split appears ── */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          split ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden={split}
      >
        <svg
          viewBox="0 0 960 600"
          className="w-full max-w-4xl h-auto text-steel transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transformOrigin: `${NJ_ORIGIN_X}% ${NJ_ORIGIN_Y}%`,
            transform: usa ? "scale(1)" : `scale(${ZOOM})`,
          }}
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
                strokeWidth={isNJ ? 1.2 : 0.75}
              />
            );
          })}
        </svg>
      </div>

      {/* ── Final split: NJ map (left) + counties list (right) — real grid, fades in ── */}
      <div
        className={`relative z-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14 items-center min-h-[26rem] lg:min-h-[34rem] transition-opacity duration-700 ${
          split ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!split}
      >
        {/* NJ map — slides in from the left */}
        <div className={`transition-all duration-700 ${split ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <NJMap className="w-full max-w-[15rem] lg:max-w-[17rem] mx-auto lg:mx-0 h-auto" />
        </div>

        {/* counties list — slides in from the right */}
        <div className={`transition-all duration-700 delay-150 ${split ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
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

          <span className="spec text-bone/40 mb-3 block">All 21 Counties Served</span>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-2.5">
            {others.map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-bone/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand/70 flex-shrink-0" />
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
