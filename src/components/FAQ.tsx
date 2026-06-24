"use client";

import { useState } from "react";

type QA = { q: string; a: string };

export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "bg-bone border-stone/30 shadow-soft"
                : "bg-bone/60 border-line hover:border-stone/40 hover:bg-bone"
            }`}
          >
            {/* brand accent bar on the active item */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 h-full w-1 bg-brand transition-transform duration-300 origin-top ${
                isOpen ? "scale-y-100" : "scale-y-0"
              }`}
            />

            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 sm:gap-5 text-left px-5 sm:px-7 py-5"
            >
              <span className={`spec flex-shrink-0 tabular-nums transition-colors ${isOpen ? "text-brand" : "text-stone"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`flex-1 font-display font-bold text-base lg:text-lg tracking-tight transition-colors ${isOpen ? "text-coal" : "text-coal group-hover:text-brand"}`}>
                {item.q}
              </span>

              {/* +/− toggle: a clean morphing glyph, no rotation gimmick */}
              <span
                className={`flex-shrink-0 relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 ${
                  isOpen ? "bg-brand text-white" : "bg-concrete text-coal group-hover:bg-coal group-hover:text-white"
                }`}
              >
                {/* horizontal bar (always) */}
                <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                {/* vertical bar — collapses to a minus when open */}
                <span className={`absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
              </span>
            </button>

            <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="pl-5 sm:pl-[4.25rem] pr-5 sm:pr-7 pb-6">
                  <span aria-hidden="true" className="block h-px w-full bg-line mb-4" />
                  <p className="text-ash text-sm lg:text-base leading-relaxed max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
