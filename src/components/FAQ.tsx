"use client";

import { useState } from "react";
import { Plus } from "@/components/icons";

type QA = { q: string; a: string };

export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t-2 border-coal">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-5 text-left py-6 group"
            >
              <span className={`spec flex-shrink-0 transition-colors ${isOpen ? "text-brand" : "text-ash"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`flex-1 font-display uppercase text-lg lg:text-xl tracking-[0.01em] transition-colors ${isOpen ? "text-brand" : "text-coal group-hover:text-brand"}`}>
                {item.q}
              </span>
              <span
                className={`flex-shrink-0 inline-flex items-center justify-center w-9 h-9 border-2 transition-all duration-300 ${
                  isOpen ? "bg-brand border-brand text-white rotate-45" : "border-coal/20 text-coal group-hover:border-brand group-hover:text-brand"
                }`}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="text-ash text-sm lg:text-base leading-relaxed max-w-3xl pl-[3.25rem]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
