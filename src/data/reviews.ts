/**
 * Student reviews, testimonials and video stories.
 *
 * ⚠️ READ THIS BEFORE ADDING ANYTHING.
 *
 * This site previously shipped six invented testimonials — made-up students,
 * named universities, stock portraits presented as their photographs. They were
 * removed because fabricated reviews are grounds for a Google manual action
 * against the whole domain, and because India's Central Consumer Protection
 * Authority guidelines on fake reviews make them a consumer-protection matter.
 *
 * Every entry below must be a real student who actually used
 * DreamDestination, with their written permission on file. Nothing else goes
 * in this file, ever — not "representative" examples, not composites, not a
 * quote you tidied up on their behalf.
 *
 * ── WHAT EACH ENTRY NEEDS ──
 *   1. A real student. Keep the permission on file, dated.
 *   2. Their own words. Fix a typo; do not rewrite the sentiment.
 *   3. Permission for the specific details you publish — first name, course,
 *      university, city. Any of those can be omitted if they would rather.
 *   4. A photo only if they supplied it. Never a stock portrait.
 *   5. A loan amount only if they agreed to publish it.
 *
 * ── VIDEO REVIEWS ──
 * `VIDEO_REVIEWS` is separate because a video needs different handling: a
 * thumbnail, a duration, and VideoObject structured data so Google can show it
 * as a video result. YouTube is the recommended host — you already have a
 * channel, it costs nothing to serve, and a YouTube-hosted video can rank in
 * both Google Search and YouTube search. Self-hosted MP4s do neither, and they
 * cost bandwidth.
 *
 * ── WHEN THE BACKEND ARRIVES ──
 * These arrays become the fallback. The API returns the same shapes, so the page
 * swaps its data source without any change to the components. See
 * backend/API-SPEC.md.
 */

export interface Review {
  /** Stable id — used as a React key and, later, as the database id. */
  id: string;
  /** First name, or full name if they agreed to it. */
  name: string;
  /** Optional: where they are from. Adds credibility and local relevance. */
  city?: string;
  /** What they studied. */
  course?: string;
  /** Where. Only with permission — naming a university is a specific claim. */
  university?: string;
  /** Destination country, for filtering. */
  country?: string;
  /** 1–5. Publish what they gave; do not round up. */
  rating: number;
  /** Their words. */
  quote: string;
  /** Year of the intake, e.g. "2026". */
  year: string;
  /** Optional, only if the student supplied it. Never stock. */
  photo?: string;
  /** Optional, only with explicit permission. */
  loanAmount?: string;
  /** Where this came from — "google", "direct", "whatsapp". Useful for your own records. */
  source?: "google" | "direct" | "whatsapp" | "email";
  /** Date the written permission was given. Keep this filled in. */
  consentOn?: string;
}

export interface VideoReview {
  id: string;
  /** Shown as the card heading and used as the VideoObject name. */
  title: string;
  /** Student's name, with permission. */
  name: string;
  city?: string;
  course?: string;
  university?: string;
  country?: string;
  /**
   * YouTube video ID — the part after `watch?v=`. Preferred host: it is free,
   * it serves fast worldwide, and the video can rank in Google and in YouTube.
   */
  youtubeId?: string;
  /** Only if not on YouTube. A direct MP4 URL. Costs bandwidth and does not rank. */
  videoUrl?: string;
  /** Thumbnail. Derived from the YouTube ID when absent — see videoThumbnail(). */
  thumbnail?: string;
  /** One or two sentences describing what the student talks about. Feeds VideoObject.description. */
  description: string;
  /** ISO date the video was published. Required by VideoObject. */
  publishedAt: string;
  /** Length in seconds. Required by VideoObject; converted to ISO 8601 duration. */
  durationSeconds?: number;
  consentOn?: string;
}

/** Real, consented text reviews. Empty until you have them. */
export const REVIEWS: Review[] = [];

/** Real, consented video reviews. Empty until you have them. */
export const VIDEO_REVIEWS: VideoReview[] = [];

/** YouTube serves a thumbnail for every video at a predictable URL. */
export const videoThumbnail = (v: VideoReview): string | undefined => {
  if (v.thumbnail) return v.thumbnail;
  if (v.youtubeId) return `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
  return undefined;
};

/** Watch URL for a video review. */
export const videoWatchUrl = (v: VideoReview): string | undefined =>
  v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : v.videoUrl;

/** Privacy-friendly embed host — no cookie until the viewer presses play. */
export const videoEmbedUrl = (v: VideoReview): string | undefined =>
  v.youtubeId ? `https://www.youtube-nocookie.com/embed/${v.youtubeId}` : undefined;

/** Seconds → ISO 8601 duration ("PT4M13S"), the format VideoObject requires. */
export const isoDuration = (seconds?: number): string | undefined => {
  if (!seconds || seconds <= 0) return undefined;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m > 0 ? `${m}M` : ""}${s > 0 ? `${s}S` : ""}` || undefined;
};

/**
 * Average rating across real reviews.
 *
 * NOTE ON AggregateRating STRUCTURED DATA: Google requires that an aggregate
 * rating reflect genuine reviews collected by the site, and it must be visible
 * on the page it is marked up on. With fewer than a handful of reviews the star
 * snippet is also unlikely to show and easy to get wrong, so the Reviews page
 * only emits AggregateRating once there are at least three. That threshold is
 * in ReviewsPage.tsx — raise it, never lower it.
 */
export const averageRating = (reviews: Review[] = REVIEWS): number | null => {
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
};
