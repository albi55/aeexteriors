"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { services } from "@/lib/seo-data";

type Item = { src: string; slug: string; title: string };

const allItems: Item[] = services.flatMap((s) =>
  (s.images ?? []).map((src) => ({ src, slug: s.slug, title: s.title }))
);

const filters = [
  { slug: "all", title: "All Work", count: allItems.length },
  ...services
    .map((s) => ({ slug: s.slug, title: s.title, count: (s.images ?? []).length }))
    .filter((f) => f.count > 0),
];

/* Repeating mosaic rhythm — a few tiles break the grid for an editorial feel.
   Only applied to the full set; a filtered trade (often just a handful of
   photos) reads cleaner as a uniform grid. col-spans kick in at sm+ so
   mobile (2-col) never overflows. */
function tileSpan(i: number, featured: boolean): string {
  if (!featured) return "";
  switch (i % 10) {
    case 0:
      return "row-span-2 sm:col-span-2 sm:row-span-2"; // hero feature
    case 3:
      return "row-span-2"; // tall
    case 6:
      return "sm:col-span-2"; // wide
    case 8:
      return "row-span-2"; // tall
    default:
      return "";
  }
}

function ExpandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState("all");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (active === "all" ? allItems : allItems.filter((i) => i.slug === active)),
    [active]
  );

  const open = index !== null;
  const current = open ? items[index] : null;
  const featured = active === "all";

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)), [items.length]);

  // Switching filters resets the viewer so the index can't dangle.
  const selectFilter = (slug: string) => {
    setActive(slug);
    setIndex(null);
  };

  // Keyboard nav + body-scroll lock while the viewer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="flex items-center justify-between gap-x-6 gap-y-4 flex-wrap mb-9 lg:mb-11">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {filters.map((f) => {
            const on = active === f.slug;
            return (
              <button
                key={f.slug}
                onClick={() => selectFilter(f.slug)}
                aria-pressed={on}
                className={`group inline-flex items-center gap-2 rounded-full pl-4 pr-3 py-2.5 border-2 font-display text-sm tracking-[0.01em] transition-all duration-200 ${
                  on
                    ? "bg-brand border-brand text-white shadow-[0_10px_24px_-12px_rgba(180,10,10,0.6)]"
                    : "bg-bone border-line text-coal/75 hover:border-brand/50 hover:text-brand"
                }`}
              >
                {f.title}
                <span
                  className={`inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1.5 rounded-full text-[0.68rem] font-semibold tabular-nums ${
                    on ? "bg-white/20 text-white" : "bg-concrete text-ash group-hover:bg-brand/10 group-hover:text-brand"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="spec text-ash text-[0.62rem] tabular-nums flex-shrink-0 hidden md:flex items-center gap-2">
          <span className="w-6 h-px bg-line" aria-hidden="true" />
          {items.length} {items.length === 1 ? "Photo" : "Photos"}
        </p>
      </div>

      {/* ── Mosaic ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 [grid-auto-flow:dense] auto-rows-[44vw] sm:auto-rows-[29vw] md:auto-rows-[25vw] lg:auto-rows-[15.5rem] xl:auto-rows-[16.5rem]">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            onClick={() => setIndex(i)}
            aria-label={`View ${item.title} project, photo ${i + 1} of ${items.length}`}
            className={`group relative overflow-hidden ticks bg-cement ring-1 ring-coal/[0.06] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:ring-2 hover:ring-brand/40 hover:shadow-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${tileSpan(i, featured)}`}
          >
            <Image
              src={item.src}
              alt={`${item.title} project by A&E Exteriors LLC in New Jersey`}
              fill
              className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* legibility wash — subtle by default, deepens on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-300" />

            {/* expand affordance */}
            <span className="absolute right-3 top-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-bone/15 backdrop-blur-sm text-bone opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ExpandIcon />
            </span>

            {/* trade tag */}
            <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 spec text-[0.6rem] text-bone opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {open && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} project photo viewer`}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/90 backdrop-blur-md animate-modal-scrim"
          onClick={close}
        >
          {/* top bar — counter + close */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 sm:px-7 h-16 sm:h-20 text-bone" onClick={(e) => e.stopPropagation()}>
            <span className="spec text-bone/70 tabular-nums">
              {String(index! + 1).padStart(2, "0")}
              <span className="text-bone/35"> / {String(items.length).padStart(2, "0")}</span>
            </span>
            <button
              onClick={close}
              aria-label="Close viewer"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-bone/10 hover:bg-brand text-bone transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* prev / next */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-bone/10 hover:bg-brand text-bone transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-bone/10 hover:bg-brand text-bone transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* stage */}
          <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
            <div key={index} className="relative w-full aspect-[4/3] ticks shadow-hard animate-modal-pop">
              <Image
                src={current.src}
                alt={`${current.title} project by A&E Exteriors LLC`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <span className="absolute left-0 bottom-0 inline-flex items-center gap-2 surface-ink px-4 py-2.5 spec text-brand">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                {current.title}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
