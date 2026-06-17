"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { services } from "@/lib/seo-data";

type Item = { src: string; slug: string; title: string };

const allItems: Item[] = services.flatMap((s) =>
  s.images.map((src) => ({ src, slug: s.slug, title: s.title }))
);

const filters = [{ slug: "all", title: "All Work" }, ...services.map((s) => ({ slug: s.slug, title: s.title }))];

export default function GalleryGrid() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const items = useMemo(
    () => (active === "all" ? allItems : allItems.filter((i) => i.slug === active)),
    [active]
  );

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap mb-10">
        {filters.map((f) => (
          <button
            key={f.slug}
            onClick={() => setActive(f.slug)}
            className={`font-display uppercase text-xs tracking-[0.06em] px-4 py-2.5 border-2 transition-colors ${
              active === f.slug ? "bg-brand border-brand text-white" : "bg-bone border-line text-coal/70 hover:border-brand hover:text-brand"
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            onClick={() => setLightbox(item)}
            className="group relative aspect-square overflow-hidden ticks bg-cement"
          >
            <Image
              src={item.src}
              alt={`${item.title} project by A&E Exteriors LLC in New Jersey`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-3 left-3 spec text-bone opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/85 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-5 right-5 inline-flex items-center justify-center w-11 h-11 bg-bone/10 hover:bg-brand text-bone transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3] ticks" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.src} alt={`${lightbox.title} project by A&E Exteriors LLC`} fill className="object-contain" sizes="100vw" />
            <span className="absolute -bottom-px left-0 surface-ink px-4 py-2 spec text-brand">{lightbox.title}</span>
          </div>
        </div>
      )}
    </>
  );
}
