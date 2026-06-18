"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Final value to count to. */
  to: number;
  /** Text appended after the number (e.g. "+", "%", "★"). */
  suffix?: string;
  /** Text shown before the number. */
  prefix?: string;
  /** Non-numeric override — render this string instead of counting (e.g. "Free"). */
  display?: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 → `to` the first time it scrolls into view.
 * Respects prefers-reduced-motion (jumps straight to the final value).
 */
export default function CountUp({ to, suffix = "", prefix = "", display, duration = 1600, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // resolve reduced-motion once, lazily — start at final value if reduced
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (display || reduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, display, reduced]);

  return (
    <span ref={ref} className={className}>
      {display ?? `${prefix}${value}${suffix}`}
    </span>
  );
}
