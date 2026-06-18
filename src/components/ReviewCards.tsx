"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/reviews-data";
import { Star, Google, Quote, ArrowRight } from "@/components/icons";

/* Native, on-brand Google review carousel — live data from Featurable, our
   design. Auto-advances; pauses on hover; arrows + dots for manual control. */

const AVATAR_TONES = ["bg-brand", "bg-coal", "bg-iron"];
const AUTOPLAY_MS = 5000;

function ReviewCard({ r, tone }: { r: Review; tone: string }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:shadow-block hover:border-stone/40">
      <Quote aria-hidden="true" className="absolute right-6 top-6 w-9 h-9 text-line transition-colors group-hover:text-brand/15" />

      <div className="flex items-center gap-3.5">
        {r.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={r.photo}
            alt={r.name}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-line"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-white font-display font-bold text-lg ${tone}`}>
            {r.name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="leading-tight">
          <div className="font-display font-bold text-coal text-base">{r.name}</div>
          <div className="text-stone text-xs">{r.when}</div>
        </div>
      </div>

      <div className="flex items-center gap-0.5 text-brand mt-5">
        {Array(r.rating).fill(0).map((_, s) => <Star key={s} className="w-4 h-4" />)}
      </div>

      <p className="text-ash text-sm leading-relaxed mt-3 flex-1">{r.text}</p>

      <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-line">
        <span className="inline-flex items-center gap-1.5 text-stone text-xs font-semibold">
          <Google className="w-4 h-4" />
          Posted on Google
        </span>
      </div>
    </article>
  );
}

export default function ReviewCards({ reviews }: { reviews: Review[] }) {
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  // responsive cards-per-view
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pages = Math.max(1, Math.ceil(reviews.length / perView));
  // clamp at render time instead of via an effect (page state may lag perView)
  const current = Math.min(page, pages - 1);

  const go = useCallback((p: number) => setPage(((p % pages) + pages) % pages), [pages]);
  const next = useCallback(() => go(current + 1), [go, current]);
  const prev = useCallback(() => go(current - 1), [go, current]);

  // autoplay — keep latest `next` in a ref so the interval never goes stale
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [next]);
  useEffect(() => {
    if (paused || pages <= 1) return;
    const id = setInterval(() => nextRef.current(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, pages]);

  if (!reviews.length) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {Array.from({ length: pages }).map((_, p) => (
            <div key={p} className="w-full shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 px-px">
                {reviews.slice(p * perView, p * perView + perView).map((r, i) => (
                  <ReviewCard key={r.id} r={r} tone={AVATAR_TONES[(p * perView + i) % AVATAR_TONES.length]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      {pages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, p) => (
              <button
                key={p}
                type="button"
                onClick={() => go(p)}
                aria-label={`Go to review group ${p + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  p === current ? "w-7 bg-brand" : "w-2 bg-stone/40 hover:bg-stone"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous reviews"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-bone border border-line text-coal shadow-soft transition-all hover:border-brand hover:text-brand hover:-translate-y-0.5"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next reviews"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-coal border border-coal text-white shadow-soft transition-all hover:bg-brand hover:border-brand hover:-translate-y-0.5"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
