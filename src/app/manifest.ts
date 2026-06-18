import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "A&E Exteriors LLC",
    short_name: "A&E Exteriors",
    description:
      "NJ licensed exterior contractor — Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. Serving all of New Jersey.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#B40A0A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
