"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const services = [
  { slug: "masonry", label: "Masonry" },
  { slug: "roofing", label: "Roofing" },
  { slug: "siding", label: "Siding" },
  { slug: "gutters", label: "Gutters" },
  { slug: "chimneys", label: "Chimneys" },
  { slug: "foundation", label: "Foundation" },
  { slug: "waterproofing", label: "Waterproofing" },
];

interface County {
  name: string;
  primary?: boolean;
  cities: string[];
}

/* Bold the matched slice of a town name as the visitor types. */
function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent text-brand font-semibold">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function AreasGrid({ counties }: { counties: County[] }) {
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const cityToSlug = (city: string) => city.toLowerCase().replace(/\s+/g, "-");
  const getCityHref = (city: string) => {
    const slug = cityToSlug(city);
    return selectedService ? `/areas/${slug}/${selectedService}` : `/areas/${slug}`;
  };
  const activeLabel = services.find((s) => s.slug === selectedService)?.label;

  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      counties
        .map((c) => ({ ...c, matched: q ? c.cities.filter((city) => city.toLowerCase().includes(q)) : c.cities }))
        .filter((c) => c.matched.length > 0),
    [counties, q]
  );

  const totalMatches = useMemo(() => filtered.reduce((n, c) => n + c.matched.length, 0), [filtered]);

  const filters: { slug: string | null; label: string }[] = [
    { slug: null, label: "All Towns" },
    ...services,
  ];

  return (
    <>
      {/* ── Search ── */}
      <div className="relative mb-5">
        <span className="field-wrap block">
          <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your town…"
            aria-label="Search for your town"
            className="field !py-4 !text-base !pr-12"
          />
        </span>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full text-ash hover:bg-concrete hover:text-brand transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Service filter + count ── */}
      <div className="flex items-center justify-between gap-x-6 gap-y-4 flex-wrap mb-9 lg:mb-10">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {filters.map((f) => {
            const on = selectedService === f.slug;
            return (
              <button
                key={f.slug ?? "all"}
                onClick={() => setSelectedService(f.slug)}
                aria-pressed={on}
                className={`inline-flex items-center rounded-full px-4 py-2.5 border-2 font-display text-sm tracking-[0.01em] transition-all duration-200 ${
                  on
                    ? "bg-brand border-brand text-white shadow-[0_10px_24px_-12px_rgba(180,10,10,0.6)]"
                    : "bg-bone border-line text-coal/75 hover:border-brand/50 hover:text-brand"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <p className="spec text-ash text-[0.62rem] flex-shrink-0 flex items-center gap-2">
          <span className="w-6 h-px bg-line" aria-hidden="true" />
          {selectedService ? `${activeLabel} · ` : ""}
          {totalMatches} {totalMatches === 1 ? "Town" : "Towns"}
        </p>
      </div>

      {/* ── Directory ── */}
      {filtered.length > 0 ? (
        <div className="rounded-2xl border border-line bg-bone overflow-hidden divide-y divide-line">
          {filtered.map((county) => (
            <div
              key={county.name}
              className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-x-8 gap-y-3.5 px-6 lg:px-7 py-5 lg:py-6 hover:bg-concrete/60 transition-colors"
            >
              <div className="flex md:flex-col items-center md:items-start justify-between gap-2 md:gap-1.5">
                <h3 className="font-display font-bold text-coal text-lg tracking-tight">{county.name}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {county.primary && (
                    <span className="inline-flex items-center rounded-full bg-brand/10 text-brand text-[0.55rem] font-bold uppercase tracking-[0.16em] px-2 py-0.5">
                      Primary
                    </span>
                  )}
                  <span className="spec text-stone text-[0.56rem]">{county.matched.length} towns</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                {county.matched.map((city) => (
                  <Link
                    key={city}
                    href={getCityHref(city)}
                    className="group inline-flex items-center gap-1.5 text-coal/75 text-sm hover:text-brand transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand/40 group-hover:bg-brand group-hover:scale-150 transition-all flex-shrink-0" />
                    <Highlight text={city} q={q} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-bone px-6 py-16 text-center">
          <p className="font-display font-bold text-coal text-xl tracking-tight">
            No towns match &ldquo;{query}&rdquo;
          </p>
          <p className="text-ash text-sm mt-2.5 max-w-sm mx-auto">
            We may still serve your area — give us a call and we&apos;ll let you know.
          </p>
        </div>
      )}

      {selectedService && filtered.length > 0 && (
        <p className="spec text-ash mt-7 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
          Town links open <span className="text-brand">{activeLabel}</span> pages.
        </p>
      )}
    </>
  );
}
