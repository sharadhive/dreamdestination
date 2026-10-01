# DreamDestination — Backend

**Nothing is built here yet.** This directory holds the specification for a
backend that does not exist, written now so that when it is built it slots into
the existing frontend without changing a single component.

| File | What it is |
|---|---|
| `README.md` | This file — what the backend is for, and the decisions worth making before writing code |
| `API-SPEC.md` | The endpoints, request/response shapes and validation rules |
| `DATA-MODEL.md` | Tables, fields and relationships |

---

## What this backend is for

Exactly two things, and it is worth being strict about that:

1. **Success stories and student reviews** — so reviews can be added without a
   developer, a build and a redeploy.
2. **Review videos** — so a video can be uploaded, given a title and a consent
   record, and appear on `/reviews`.

Everything else on the site — the 22 destination pages, the 513 location pages,
the nine service pages — stays in the codebase as static data. They change
rarely, they benefit from version control and code review, and they are
prerendered into HTML at build time. Moving them behind an API would make the
site slower, harder to prerender, and worse for SEO, in exchange for an editing
convenience nobody needs.

**The test for whether something belongs here: does it change more often than
you deploy?** Reviews do. Country tuition tables do not.

---

## The one rule that matters

> **Every review and every video must belong to a real student who gave written
> permission.**

This is not a style preference. The site previously carried six fabricated
testimonials with stock photographs. They were removed because:

- Google's spam policies treat fabricated reviews as grounds for a **manual
  action against the whole domain**, not one page.
- India's **Central Consumer Protection Authority** guidelines on fake reviews,
  and **IS 19000:2022**, make publishing invented consumer reviews a
  consumer-protection matter.
- Stock portraits are licensed images of real people. Attaching an invented name
  and an invented quote to one is its own problem.

So the schema makes consent a **required field, not an optional note**. The API
must reject a review with no `consent_on` date and no `consent_reference`. Make
it impossible to add a fake review by accident, because the pressure to add one
always arrives on a slow week.

---

## Current state: the frontend already works without this

`/reviews` and `/blogs` are live routes today, reading from:

- `src/data/reviews.ts` → `REVIEWS` and `VIDEO_REVIEWS` (both empty arrays)
- `src/data/blogPosts.ts` → `BLOG_POSTS` (empty array)

Empty arrays render an honest empty state. **Add an entry to those files and it
appears on the site immediately** — no backend needed. That is the right way to
publish the first five or ten reviews.

The backend earns its place at roughly the point where:

- you are adding reviews weekly rather than occasionally, **or**
- someone who does not use a code editor needs to add them, **or**
- you want a student to submit a review themselves through a form.

Until one of those is true, this directory should stay as documentation.

---

## When it is built, build it as a fallback, not a replacement

```
Page loads
  → fetch /api/reviews
      ├─ success → render API data
      └─ failure → render src/data/reviews.ts
```

The static arrays stay in the codebase as the fallback. This matters more than
it sounds: it means a backend outage degrades the page to "slightly out of date"
rather than "blank", and — critically — it means **prerendering still works**.

`scripts/prerender.mjs` snapshots the rendered DOM at build time so that GPTBot,
ClaudeBot, PerplexityBot and social scrapers (none of which run JavaScript) see
real content. If reviews only ever arrive from a client-side fetch, they will be
invisible in that snapshot. Two acceptable answers:

- **Build-time fetch** — the build pulls reviews from the API and writes them
  into the bundle. Simple, fully prerenderable, needs a redeploy per change.
- **Client fetch + static fallback** — what the diagram above describes. Crawlers
  see the fallback; humans see live data.

Pick one deliberately. Do not end up with reviews that only exist for visitors
with JavaScript.

---

## Video hosting: use YouTube

You already have a channel: <https://www.youtube.com/@DreamDestination-v6d>

| | YouTube | Self-hosted MP4 |
|---|---|---|
| Bandwidth cost | Free | You pay, per view |
| Global delivery | Google's CDN | Whatever you configure |
| Can rank in Google video results | **Yes** | Effectively no |
| Can rank in YouTube search | **Yes** | No |
| Adaptive bitrate on poor connections | Built in | You build it |
| Player, captions, chapters | Built in | You build it |

For an Indian student audience on mixed mobile connections, adaptive bitrate
alone settles it.

**So the backend stores a `youtube_id`, not a video file.** The upload flow is:
upload to YouTube → paste the video ID into the admin form → done. That removes
the single hardest part of this backend (large file uploads, transcoding,
storage, CDN) and replaces it with an 11-character text field.

`src/data/reviews.ts` already derives the thumbnail, the watch URL and a
cookieless embed URL from a `youtubeId`. The API returns the same field name.

Keep the `videoUrl` field for the rare case where a video genuinely cannot go on
YouTube. Do not make it the default.

---

## Decisions to make before writing code

**Stack.** You are a MERN developer, so Node + Express + MongoDB is the obvious
choice and there is no reason to fight it. Mongoose gives you schema validation,
which is exactly where the consent rules should live.

**Hosting.** The frontend is on Vercel. Options, roughly in order of effort:

- **Vercel Serverless Functions** — an `/api` directory in this same repo. One
  deployment, no CORS, no separate domain. Cold starts on a free plan, and a
  persistent MongoDB connection needs care (`Mongoose` connection caching).
- **A small VPS or Render/Railway instance** — a normal always-on Express server.
  Simplest mental model, a separate deployment to keep in sync.
- **MongoDB Atlas** for the database either way. Do not self-host Mongo for this.

**Admin authentication.** One admin account is enough. Do **not** build user
registration, roles or password reset for a single-person CMS. A hashed password
in an env var plus a signed JWT is proportionate. Whatever you do:

- Never store a plaintext password.
- Put the JWT secret in an environment variable, never in the repo.
- Rate-limit the login endpoint — it is the only thing on this backend worth
  attacking.

**Image uploads.** Student photos are the one file type that genuinely has to be
stored. Cloudinary or S3, not the filesystem — a Vercel serverless function has
no persistent disk, and a VPS disk is not backed up unless you back it up.
Validate MIME type on the **server**, not just in the browser, and cap the size.

---

## What NOT to build

Scope creep is what kills a side-project backend. Explicitly out of scope:

- ❌ A full CMS for the country and location pages — they belong in the codebase
- ❌ User accounts for students — there is nothing for a student to log into
- ❌ A comment system — moderation cost, spam target, no SEO benefit
- ❌ Analytics — GA4, Clarity and GTM are already installed
- ❌ A newsletter system — use an existing provider
- ❌ Lead capture — enquiries already hand off to WhatsApp via
  `src/lib/leadToWhatsApp.ts`, which is faster to answer and costs nothing

---

## Getting started, when you do

1. Read `DATA-MODEL.md` and `API-SPEC.md`.
2. Build the **read** endpoints first (`GET /api/reviews`, `GET /api/videos`) and
   point `/reviews` at them with the static fallback in place. Ship that.
3. Add the admin write endpoints second.
4. Add blog posts last — the blog can live in `src/data/blogPosts.ts` for a long
   time, and posts benefit from version control more than reviews do.

Do not build all three at once.
