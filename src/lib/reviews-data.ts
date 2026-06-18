/* ── Live Google reviews via Featurable (our design) ──
   Pulls the same data the Featurable widget uses, keyed only by the widget ID,
   from their public JSON API. Rendered through our own <ReviewCards/> so it
   matches the site. Fetched server-side and cached; new Google reviews appear
   automatically (revalidates hourly). */

export const FEATURABLE_WIDGET_ID = "d74abb33-21dc-480a-8b1d-f6bcf876a3d6";
const API_URL = `https://api.featurable.com/v1/widgets/${FEATURABLE_WIDGET_ID}`;

export type Review = {
  id: string;
  name: string;
  photo: string | null;
  when: string;
  /** epoch ms of the review, for sorting newest-first */
  ts: number;
  rating: number;
  text: string;
};

export type ReviewsData = {
  rating: string;
  count: number;
  reviewUrl: string;
  reviews: Review[];
};

const FALLBACK_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ-06T8A-wgikRiwMVRSp9qjg";

/* relative-time label from an ISO timestamp (e.g. "2 weeks ago") */
function relativeWhen(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.max(0, Math.round((Date.now() - then) / 86_400_000));
  if (days <= 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return months <= 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.round(months / 12);
  return years <= 1 ? "1 year ago" : `${years} years ago`;
}

type ApiReview = {
  reviewId: string;
  reviewer?: { displayName?: string; profilePhotoUrl?: string };
  starRating?: number;
  comment?: string;
  createTime?: string;
};

const EMPTY: ReviewsData = { rating: "5.0", count: 0, reviewUrl: FALLBACK_REVIEW_URL, reviews: [] };

export async function getReviews(): Promise<ReviewsData> {
  try {
    const res = await fetch(API_URL, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return EMPTY;
    const data = await res.json();
    const list: ApiReview[] = Array.isArray(data?.reviews) ? data.reviews : [];

    const reviews: Review[] = list
      .filter((r) => (r.comment ?? "").trim().length > 0)
      .map((r) => {
        const ts = r.createTime ? new Date(r.createTime).getTime() : 0;
        return {
          id: r.reviewId,
          name: r.reviewer?.displayName?.trim() || "Google User",
          photo: r.reviewer?.profilePhotoUrl || null,
          when: r.createTime ? relativeWhen(r.createTime) : "",
          ts: Number.isNaN(ts) ? 0 : ts,
          rating: Math.round(r.starRating ?? 5),
          text: (r.comment ?? "").trim(),
        };
      })
      // newest first
      .sort((a, b) => b.ts - a.ts);

    const avg = typeof data?.averageRating === "number" ? data.averageRating : 5;
    return {
      rating: avg.toFixed(1),
      count: typeof data?.totalReviewCount === "number" ? data.totalReviewCount : reviews.length,
      reviewUrl: typeof data?.profileUrl === "string" ? data.profileUrl : FALLBACK_REVIEW_URL,
      reviews,
    };
  } catch {
    return EMPTY;
  }
}
