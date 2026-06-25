"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "@/components/icons";

// Circumference of the progress ring (r = 22).
const R = 22;
const CIRC = 2 * Math.PI * R;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0 → 1 down the page

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      // Throttle to one update per animation frame.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.min(Math.max(ratio, 0), 1));
        // Reveal after the user has scrolled ~60% of one viewport.
        setVisible(scrollTop > window.innerHeight * 0.6);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] grid place-items-center w-14 h-14 rounded-full transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-concrete ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      {/* progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-coal/10"
        />
        <circle
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-coal transition-[stroke-dashoffset] duration-150 ease-linear motion-reduce:transition-none"
          style={{
            strokeDasharray: CIRC,
            strokeDashoffset: CIRC * (1 - progress),
          }}
        />
      </svg>

      {/* solid brand pill that floats + lifts on hover */}
      <span
        className="relative grid place-items-center w-11 h-11 rounded-full bg-brand text-white shadow-[0_12px_28px_-10px_rgba(180,10,10,0.7)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-brand-deep group-hover:scale-105 group-hover:shadow-[0_18px_34px_-12px_rgba(180,10,10,0.85)] group-active:scale-95"
      >
        {/* soft glow that pulses on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-brand/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:hidden"
        />
        <ChevronUp className="relative w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 motion-reduce:transition-none" />
      </span>
    </button>
  );
}
