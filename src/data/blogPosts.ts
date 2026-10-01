/**
 * Blog posts.
 *
 * ── HOW THIS WORKS RIGHT NOW ──
 * Posts live in the array below, in code. `/blogs` renders whatever is here, and
 * an empty array renders an honest empty state rather than fake placeholder
 * posts. Add an entry and the listing page, the sitemap and the internal links
 * all pick it up.
 *
 * ── WHEN THE BACKEND ARRIVES ──
 * This file becomes the fallback, not the source. The listing page will fetch
 * from the API and fall back to this array if the request fails, so the page
 * never renders blank because a server is down. The shape below is deliberately
 * the same shape the API returns — see backend/API-SPEC.md.
 *
 * ── WHAT ACTUALLY RANKS ──
 * A study-abroad blog competes with hundreds of consultancy blogs all publishing
 * the same "Top 10 Universities in Canada" post. What wins is specificity that
 * requires having done the work: the exact document a bank asked for, what
 * changed in a visa rule this month and what it means for a February intake,
 * the real cost of a course after the fee waiver nobody mentions.
 *
 * Do not publish AI-written filler. Google's helpful-content guidance targets
 * exactly the "written for search engines" pattern, and on a YMYL site about
 * money it costs more than it earns.
 */

export interface BlogPost {
  /** URL segment: /blogs/<slug>. Lowercase, hyphenated, stable once published. */
  slug: string;
  title: string;
  /** One or two sentences. Doubles as the meta description, so keep it under ~155 characters. */
  excerpt: string;
  /** ISO date, e.g. "2026-09-14". Drives ordering and the datePublished in schema. */
  publishedAt: string;
  /** ISO date. Set when you materially revise a post — Google shows it and readers trust it. */
  updatedAt?: string;
  /** Who wrote it. Named authors are an E-E-A-T signal on a money-related site. */
  author: string;
  /** One primary category. Keep the set small — see BLOG_CATEGORIES. */
  category: BlogCategory;
  /** Reading time in minutes. Optional; computed if omitted. */
  readingMinutes?: number;
  /** Path under /public, or a full URL. Optional — the card handles its absence. */
  coverImage?: string;
  /** Alt text for the cover image. Required whenever coverImage is set. */
  coverImageAlt?: string;
  /** Markdown or HTML body. Left empty until the backend serves it. */
  body?: string;
  /** Internal links this post should carry — the whole point of a blog, SEO-wise. */
  relatedRoutes?: string[];
}

export const BLOG_CATEGORIES = [
  "Education Loans",
  "Student Visas",
  "Admissions",
  "Scholarships",
  "Destinations",
  "Test Preparation",
  "Life Abroad",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Add posts here. Example of the shape, commented out so the page stays honest
 * until there is something real to publish:
 *
 * {
 *   slug: "education-loan-documents-checklist-2026",
 *   title: "The education loan document checklist banks actually use",
 *   excerpt: "What lenders ask for, in the order they ask for it, and the three documents that hold up most applications.",
 *   publishedAt: "2026-09-20",
 *   author: "Rajesh Tiwari",
 *   category: "Education Loans",
 *   relatedRoutes: ["/financial-assistance", "/study-in-uk"],
 * }
 */
export const BLOG_POSTS: BlogPost[] = [];

/** Newest first. */
export const sortedPosts = (posts: BlogPost[] = BLOG_POSTS): BlogPost[] =>
  [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Rough reading time, used when a post does not set one. ~200 words a minute. */
export const readingTime = (post: BlogPost): number =>
  post.readingMinutes ?? Math.max(1, Math.round((post.body?.split(/\s+/).length ?? 0) / 200));
