# Data Model

Written for MongoDB + Mongoose, but the shapes translate to Postgres unchanged.

Field names match `src/data/reviews.ts` and `src/data/blogPosts.ts` exactly, so
the frontend can swap its data source without touching a component.

---

## `reviews` — written student reviews

| Field | Type | Required | Notes |
|---|---|---|---|
| `_id` | ObjectId | auto | Serialised to the frontend as `id` |
| `name` | String | **yes** | First name, or full name if they agreed. Trim, max 80 |
| `city` | String | no | Adds local relevance |
| `course` | String | no | e.g. "MSc Data Science" |
| `university` | String | no | **Only with explicit permission** — naming an institution is a specific claim |
| `country` | String | no | Destination, for filtering. Store the slug (`uk`, `canada`) |
| `rating` | Number | **yes** | Integer 1–5. Publish what they gave; never round up |
| `quote` | String | **yes** | Their words. 20–1200 chars. Fix a typo, never the sentiment |
| `year` | String | **yes** | Intake year, `"2026"`. 4 digits |
| `photo` | String | no | URL. Only if the student supplied it — **never a stock portrait** |
| `loanAmount` | String | no | **Only with explicit permission** |
| `source` | Enum | no | `google` \| `direct` \| `whatsapp` \| `email` |
| `consentOn` | Date | **yes** | When written permission was given |
| `consentReference` | String | **yes** | Where the proof lives — WhatsApp thread, email subject, signed form ID |
| `published` | Boolean | **yes** | Default `false`. Nothing appears until it is flipped |
| `createdAt` / `updatedAt` | Date | auto | |

### Validation that must live in the schema, not the form

```js
// Consent is structural, not advisory.
consentOn:        { type: Date,   required: [true, "Consent date is required"] },
consentReference: { type: String, required: [true, "Consent proof reference is required"], trim: true },

// Only publishable once consent exists.
published: {
  type: Boolean,
  default: false,
  validate: {
    validator(v) { return !v || (this.consentOn && this.consentReference); },
    message: "Cannot publish a review without a consent date and reference",
  },
},

rating: { type: Number, required: true, min: 1, max: 5, validate: Number.isInteger },
quote:  { type: String, required: true, minlength: 20, maxlength: 1200, trim: true },
```

The point of putting this in the schema rather than the admin form: a form can be
bypassed, a script can write directly, and a future you in a hurry can forget.
The database should refuse.

### Indexes

```js
{ published: 1, createdAt: -1 }   // the listing query
{ country: 1, published: 1 }      // filtering by destination
```

---

## `video_reviews` — video stories

| Field | Type | Required | Notes |
|---|---|---|---|
| `_id` | ObjectId | auto | → `id` |
| `title` | String | **yes** | Card heading and `VideoObject.name`. Max 120 |
| `name` | String | **yes** | Student's name, with permission |
| `city` / `course` / `university` / `country` | String | no | As above |
| `youtubeId` | String | **preferred** | 11-char YouTube ID. See README on why |
| `videoUrl` | String | no | Direct MP4, only when YouTube is genuinely impossible |
| `thumbnail` | String | no | Derived from `youtubeId` when absent |
| `description` | String | **yes** | 1–2 sentences. Feeds `VideoObject.description`. Max 400 |
| `publishedAt` | Date | **yes** | Required by `VideoObject` |
| `durationSeconds` | Number | no | Required by `VideoObject`; converted to ISO 8601 (`PT4M13S`) |
| `consentOn` | Date | **yes** | |
| `consentReference` | String | **yes** | Video consent should be explicit — a face is more identifying than a name |
| `published` | Boolean | **yes** | Default `false` |
| `sortOrder` | Number | no | Manual ordering. Default 0, descending |

```js
// One of the two must be present, or there is no video.
validate: {
  validator() { return Boolean(this.youtubeId || this.videoUrl); },
  message: "A video review needs either a youtubeId or a videoUrl",
}

// YouTube IDs are exactly 11 chars of [A-Za-z0-9_-].
youtubeId: { type: String, match: /^[A-Za-z0-9_-]{11}$/, trim: true },
```

**A note on the YouTube ID field:** people paste the whole URL. Accept it and
extract the ID server-side rather than making the admin do it — handle
`youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/` and a bare ID.

---

## `blog_posts` — later, not first

Matches `BlogPost` in `src/data/blogPosts.ts`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | String | **yes** | Unique, indexed. Lowercase, hyphenated. **Immutable once published** |
| `title` | String | **yes** | Max 120 |
| `excerpt` | String | **yes** | Doubles as the meta description — enforce **max 160** |
| `body` | String | **yes** | Markdown |
| `author` | String | **yes** | A named author is an E-E-A-T signal on a money-related site |
| `category` | Enum | **yes** | From `BLOG_CATEGORIES` |
| `publishedAt` | Date | **yes** | |
| `updatedAt` | Date | no | Set on material revision — Google shows it |
| `coverImage` / `coverImageAlt` | String | no | `coverImageAlt` **required if** `coverImage` is set |
| `relatedRoutes` | [String] | no | Internal links the post should carry |
| `published` | Boolean | **yes** | Default `false` |

**Slug immutability matters.** Once a post is published and indexed, changing its
slug breaks every inbound link and loses whatever ranking it earned. Enforce it:

```js
slug: { type: String, required: true, unique: true, immutable: (doc) => doc.published },
```

**Two things to remember when the blog goes live:**

1. Build the `/blogs/:slug` route. It does not exist yet — deliberately, because
   a route rendering an empty article is a thin page Google will hold against
   the domain.
2. Add published post URLs to `scripts/generate-sitemap.mjs`. A post that is not
   in the sitemap gets found late, if at all.

---

## `admin_users` — one row, probably

| Field | Type | Notes |
|---|---|---|
| `email` | String | Unique |
| `passwordHash` | String | **bcrypt or argon2. Never plaintext, never MD5/SHA1** |
| `lastLoginAt` | Date | |

Do not build registration, roles or password reset for a single-person CMS. If
you lose the password, write a one-off script.

---

## Consent: keep it outside the database too

The database stores *that* consent exists and *where the proof is*. It does not
store the proof itself.

Keep a folder — Drive, Dropbox, anywhere backed up — with the actual WhatsApp
screenshot, email, or signed form, named to match `consentReference`. If a
student later asks you to remove their review, or a question is ever raised
about whether a review is genuine, that folder is the answer.

Also plan for withdrawal: a student can change their mind. Un-publishing must be
one flag flip (`published: false`), never a delete — you want the consent record
to survive so you can show the review *was* legitimate while it was up.
