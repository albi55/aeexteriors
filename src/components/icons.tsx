import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { className?: string };

/* ── Solid glyphs ── */
export const Phone = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.37 1.8z" />
  </svg>
);

export const Star = ({ className = "w-4 h-4", ...p }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Quote = ({ className = "w-8 h-8", ...p }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M7.5 6C4.46 6 2 8.46 2 11.5S4.46 17 7.5 17c.4 0 .79-.04 1.16-.13C8 18.6 6.46 19.7 4.5 20l.6 1.5C8.7 20.7 11 17.7 11 13.5V11.5C11 8.46 9.04 6 7.5 6zm11 0C15.46 6 13 8.46 13 11.5S15.46 17 18.5 17c.4 0 .79-.04 1.16-.13C19 18.6 17.46 19.7 15.5 20l.6 1.5c3.6-.8 5.9-3.8 5.9-8V11.5C22 8.46 20.04 6 18.5 6z" />
  </svg>
);

export const Facebook = ({ className = "w-4 h-4", ...p }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z" />
  </svg>
);

export const Instagram = ({ className = "w-4 h-4", ...p }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.93 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
);

export const Google = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true" {...p}>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 002 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

/* ── Stroke glyphs ── */
const stroke = (className: string, p: IconProps, d: React.ReactNode) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.85}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    {d}
  </svg>
);

export const ArrowRight = ({ className = "w-4 h-4", ...p }: IconProps) =>
  stroke(className, { ...p, strokeWidth: 2.4 } as IconProps, <path d="M5 12h14M13 6l6 6-6 6" />);

export const ArrowUpRight = ({ className = "w-4 h-4", ...p }: IconProps) =>
  stroke(className, { ...p, strokeWidth: 2.4 } as IconProps, <path d="M7 17L17 7M8 7h9v9" />);

export const Check = ({ className = "w-4 h-4", ...p }: IconProps) =>
  stroke(className, { ...p, strokeWidth: 2.6 } as IconProps, <path d="M4 12.5l5 5L20 6" />);

export const Mail = ({ className = "w-5 h-5", ...p }: IconProps) =>
  stroke(className, p, <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>);

export const MapPin = ({ className = "w-5 h-5", ...p }: IconProps) =>
  stroke(className, p, <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" /><circle cx="12" cy="10" r="2.6" /></>);

export const Clock = ({ className = "w-5 h-5", ...p }: IconProps) =>
  stroke(className, p, <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>);

export const ShieldCheck = ({ className = "w-5 h-5", ...p }: IconProps) =>
  stroke(className, p, <><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>);

export const Bolt = ({ className = "w-5 h-5", ...p }: IconProps) =>
  stroke(className, p, <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />);

export const Plus = ({ className = "w-4 h-4", ...p }: IconProps) =>
  stroke(className, { ...p, strokeWidth: 2.4 } as IconProps, <path d="M12 5v14M5 12h14" />);

/* ── Service icons (keyed by slug) ──
   Illustrated PNG icons from /public/icons. Rendered as inline images so
   they keep the same `<Icon className="w-N h-N" />` contract used everywhere. */
const serviceIconSrc: Record<string, string> = {
  masonry: "/icons/mansory.png",
  roofing: "/icons/roofing.png",
  siding: "/icons/siding.png",
  gutters: "/icons/gutters.png",
  chimneys: "/icons/chimney.png",
  foundation: "/icons/foundation.png",
  waterproofing: "/icons/waterproofing.png",
};

const serviceIconAlt: Record<string, string> = {
  masonry: "Masonry icon",
  roofing: "Roofing icon",
  siding: "Siding icon",
  gutters: "Gutters icon",
  chimneys: "Chimneys icon",
  foundation: "Foundation icon",
  waterproofing: "Waterproofing icon",
};

const makeServiceIcon = (slug: string): React.FC<IconProps> => {
  const Icon = ({ className = "w-7 h-7" }: IconProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={serviceIconSrc[slug]}
      alt={serviceIconAlt[slug]}
      className={`${className} object-contain`}
      loading="lazy"
      decoding="async"
    />
  );
  Icon.displayName = `ServiceIcon(${slug})`;
  return Icon;
};

export const serviceIcons: Record<string, React.FC<IconProps>> = {
  masonry: makeServiceIcon("masonry"),
  roofing: makeServiceIcon("roofing"),
  siding: makeServiceIcon("siding"),
  gutters: makeServiceIcon("gutters"),
  chimneys: makeServiceIcon("chimneys"),
  foundation: makeServiceIcon("foundation"),
  waterproofing: makeServiceIcon("waterproofing"),
};
