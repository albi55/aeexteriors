"use client";

import { useEffect } from "react";

const WIDGET_ID = "d74abb33-21dc-480a-8b1d-f6bcf876a3d6";
const SCRIPT_SRC = "https://featurable.com/assets/bundle.js";

/**
 * Live Google reviews pulled from the A&E Exteriors Business Profile via
 * Featurable. The widget itself is configured at featurable.com — new Google
 * reviews sync in automatically (no code change needed). Loads the Featurable
 * bundle on mount; it scans for [data-featurable-async] containers and renders.
 */
export default function FeaturableReviews() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.charset = "UTF-8";
    document.body.appendChild(script);
  }, []);

  return <div id={`featurable-${WIDGET_ID}`} data-featurable-async />;
}
