"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, Plus, serviceIcons } from "@/components/icons";

export type GalleryService = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  blurb: string;
  included: string[];
  content: string[];
  gallery: string[];
};

/* Simple, reliable services list + accordion.
   Each service is a row; tap to expand its details (text + a few photos)
   inline. Works identically on desktop and mobile — no overflow traps. */
export default function ServiceGallery({ services }: { services: GalleryService[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {services.map((s, i) => {
        const isOpen = i === open;
        const Icon = serviceIcons[s.slug];
        const photos = s.gallery.slice(0, 3);
        return (
          <div
            key={s.slug}
            className={`group overflow-hidden rounded-2xl border transition-colors duration-300 ${
              isOpen ? "bg-bone border-stone/30 shadow-soft" : "bg-bone/60 border-line hover:border-stone/40 hover:bg-bone"
            }`}
          >
            {/* row header */}
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 text-left px-4 sm:px-6 py-4"
            >
              <span className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 transition-colors ${isOpen ? "bg-concrete ring-1 ring-line" : "bg-concrete"}`}>
                {Icon ? <Icon className="w-8 h-8" /> : null}
              </span>
              <span className="flex-1 min-w-0">
                <span className="font-display font-bold text-coal text-lg sm:text-xl tracking-tight block leading-tight">{s.title}</span>
                <span className="spec text-brand block mt-0.5 truncate">{s.tagline}</span>
              </span>
              <span className={`flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                isOpen ? "bg-brand text-white rotate-45" : "bg-concrete text-coal group-hover:bg-coal group-hover:text-white"
              }`}>
                <Plus className="w-4 h-4" />
              </span>
            </button>

            {/* expandable body */}
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="px-4 sm:px-6 pb-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8 items-start">

                  {/* text */}
                  <div>
                    <div className="flex flex-col gap-3 text-ash text-sm leading-relaxed mb-5">
                      {s.content.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>

                    <span className="spec text-coal/50 mb-2.5 block">What&apos;s Included</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                      {s.included.map((sub) => (
                        <li key={sub} className="flex items-center gap-2.5">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand/10 text-brand flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="text-coal/80 text-sm">{sub}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Link href={`/services/${s.slug}`} className="btn btn-red !shadow-none">
                        Explore {s.title}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link href="/contact" className="btn btn-outline">Get Free Estimate</Link>
                    </div>
                  </div>

                  {/* photos */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-2.5">
                      <Link href={`/services/${s.slug}`} className="col-span-2 relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-coal/10 group/img">
                        <Image src={photos[0]} alt={`${s.title} project by A&E Exteriors LLC`} fill className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" sizes="(max-width: 1024px) 100vw, 40vw" />
                      </Link>
                      {photos[1] && (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-coal/10 group/img">
                          <Image src={photos[1]} alt={`${s.title} detail`} fill className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" sizes="20vw" />
                        </div>
                      )}
                      {photos[2] ? (
                        <Link href={`/services/${s.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-coal/10 group/img">
                          <Image src={photos[2]} alt={`${s.title} detail`} fill className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" sizes="20vw" />
                          <span className="absolute inset-0 flex items-center justify-center bg-ink/55 spec text-bone gap-1.5">
                            More <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
