# API Specification

Base path: `/api`

Response shapes match the TypeScript interfaces in `src/data/reviews.ts` and
`src/data/blogPosts.ts` exactly, so `ReviewsPage.tsx` and `BlogsPage.tsx` can
swap their data source without touching a component.

---

## Conventions

**Every response is wrapped.** Never return a bare array — you will want to add
pagination or metadata later, and changing the shape afterwards breaks clients.

```jsonc
// Success
{ "ok": true, "data": [ ... ], "meta": { "total": 12 } }

// Failure
{ "ok": false, "error": { "code": "VALIDATION_FAILED", "message": "Human-readable", "fields": { "rating": "must be 1-5" } } }
```

**`_id` is serialised as `id`.** The frontend types say `id: string`. Do the
conversion in the API layer, not in the component.

**Dates are ISO 8601 strings** (`2026-09-14` or a full timestamp). Not Date
objects, not epoch numbers.

**Public endpoints only ever return `published: true` records.** Filtering by a
query parameter the client controls is how draft reviews leak.

---

## Public endpoints — no authentication

### `GET /api/reviews`

| Query | Type | Default | Notes |
|---|---|---|---|
| `country` | string | — | Destination slug (`uk`, `canada`) |
| `limit` | number | 50 | Max 100 |
| `cursor` | string | — | Opaque. Use cursor pagination, not `page` + `offset` |

```jsonc
{
  "ok": true,
  "data": [
    {
      "id": "66f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Priyanka",
      "city": "Nashik",
      "course": "MSc Data Science",
      "university": "University of Leeds",
      "country": "uk",
      "rating": 5,
      "quote": "…in their own words…",
      "year": "2026",
      "photo": null,
      "loanAmount": null
    }
  ],
  "meta": { "total": 12, "averageRating": 4.8, "nextCursor": null }
}
```

**Do not return `consentOn`, `consentReference` or `source` on the public
endpoint.** They are internal records, and `consentReference` may name a private
document.

`averageRating` is computed server-side across all published reviews — not just
the current page, or the number on the page contradicts the number in the
`AggregateRating` schema.

> ⚠️ `ReviewsPage.tsx` only emits `AggregateRating` structured data at **three or
> more** reviews (`MIN_REVIEWS_FOR_AGGREGATE`). Google requires an aggregate
> rating to reflect genuine reviews collected by the site and to be visible on
> the page carrying the markup. Keep that threshold.

### `GET /api/videos`

Same conventions. Returns published video reviews, ordered by `sortOrder` desc
then `publishedAt` desc.

```jsonc
{
  "ok": true,
  "data": [
    {
      "id": "…",
      "title": "How I funded a Master's in Ireland",
      "name": "Rohan",
      "city": "Pune",
      "course": "MSc Computing",
      "university": "University College Dublin",
      "country": "ireland",
      "youtubeId": "dQw4w9WgXcQ",
      "thumbnail": null,
      "description": "Rohan talks through the loan file, the sanction letter timing and the visa appointment.",
      "publishedAt": "2026-10-02",
      "durationSeconds": 253
    }
  ],
  "meta": { "total": 4 }
}
```

`thumbnail` may be `null` — the frontend derives it from `youtubeId`
(`videoThumbnail()` in `src/data/reviews.ts`).

### `GET /api/posts` and `GET /api/posts/:slug`

Listing returns everything except `body` (keeps the payload small). The single
endpoint returns `body` as Markdown. `404` for an unknown or unpublished slug —
never `200` with an empty object, or the page renders a blank article.

---

## Admin endpoints — authentication required

All under `/api/admin`, all requiring `Authorization: Bearer <jwt>`.

### `POST /api/admin/login`

```jsonc
// Request
{ "email": "…", "password": "…" }

// Response
{ "ok": true, "data": { "token": "…", "expiresIn": 86400 } }
```

- **Rate-limit this endpoint.** It is the only thing here worth attacking. Five
  attempts per IP per fifteen minutes is plenty.
- Return the **same** error and the **same** timing for "unknown email" and
  "wrong password". Different responses tell an attacker which emails exist.
- JWT secret in an environment variable. Never in the repo.

### `POST /api/admin/reviews`

```jsonc
{
  "name": "Priyanka",
  "city": "Nashik",
  "course": "MSc Data Science",
  "university": "University of Leeds",
  "country": "uk",
  "rating": 5,
  "quote": "…",
  "year": "2026",
  "source": "whatsapp",
  "consentOn": "2026-09-30",
  "consentReference": "WhatsApp thread 2026-09-30, saved to Drive/consent/priyanka-2026.png",
  "published": false
}
```

**`consentOn` and `consentReference` are required. Reject with `422` if either is
missing.** This is the single most important validation in the whole API — see
the README for why. It must be enforced here *and* in the Mongoose schema; an
admin form is not a security boundary.

`published` defaults to `false`. Create, look at it on the page, then publish.

### `PATCH /api/admin/reviews/:id`

Partial update. The common use is `{ "published": true }` or
`{ "published": false }`.

**Un-publishing must never delete.** A student may withdraw permission; you want
the consent record to survive so you can show the review was legitimate while it
was up.

### `DELETE /api/admin/reviews/:id`

Soft delete (`deletedAt` timestamp), not a hard delete, for the same reason.

### `POST /api/admin/videos` · `PATCH` · `DELETE`

Same pattern. One helper worth writing:

```js
// People paste the whole URL. Accept it.
const extractYouTubeId = (input) => {
  const s = String(input || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;                       // bare ID
  const m = s.match(/(?:v=|youtu\.be\/|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};
```

Reject with a clear message if it comes back `null` — "That does not look like a
YouTube link" beats a silent save that renders a broken player.

### `POST /api/admin/upload`

For student photos only. Videos go to YouTube.

- `multipart/form-data`, field `file`
- **Validate the MIME type server-side**, not just in the browser. Check the
  actual bytes (magic number), not the declared `Content-Type` — that is
  attacker-controlled.
- Allow `image/jpeg`, `image/png`, `image/webp`. Nothing else.
- Cap at 5 MB.
- Store on Cloudinary or S3. A Vercel serverless function has no persistent disk;
  a VPS disk is not backed up unless you back it up.
- Return `{ "ok": true, "data": { "url": "https://…" } }`.

---

## CORS

Allow exactly your own origins:

```
https://www.dreamdestinationstudyabroad.com
https://www.dreamdestinationstudyabroad.com
http://localhost:8080          (dev only — the Vite port this project uses)
```

Not `*`. The admin endpoints sit on the same server.

---

## Caching

Reviews change rarely and are read constantly.

```
Cache-Control: public, max-age=300, stale-while-revalidate=3600
```

Five minutes fresh, an hour of serving stale while revalidating. A review
appearing five minutes late costs nothing; a database query on every page view
costs money and latency.

Admin endpoints: `Cache-Control: no-store`.

---

## Wiring the frontend up

When the read endpoints exist, `ReviewsPage.tsx` changes in one place. The
fallback is the point:

```tsx
const [reviews, setReviews] = useState(REVIEWS);       // static import = fallback
const [videos, setVideos]   = useState(VIDEO_REVIEWS);

useEffect(() => {
  let cancelled = false;
  Promise.all([
    fetch("/api/reviews").then((r) => r.json()),
    fetch("/api/videos").then((r) => r.json()),
  ])
    .then(([rv, vd]) => {
      if (cancelled) return;
      if (rv.ok) setReviews(rv.data);
      if (vd.ok) setVideos(vd.data);
    })
    .catch(() => {
      /* Keep the static fallback. A backend outage must not blank the page. */
    });
  return () => { cancelled = true; };
}, []);
```

**Read the prerendering section in `README.md` before you do this.** Content that
only arrives from a client-side fetch is invisible to GPTBot, ClaudeBot,
PerplexityBot and social scrapers, none of which run JavaScript — and invisible
in the snapshot `scripts/prerender.mjs` writes at build time. The static
fallback is what those crawlers will see, so keep it populated with your best
few reviews even after the API is live.
