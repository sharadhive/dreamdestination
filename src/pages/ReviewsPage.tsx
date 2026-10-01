import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Play, ShieldCheck, ChevronRight, ArrowRight, MessageSquareQuote, Youtube } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { SITE, CONTACT, SOCIALS } from "@/config/site";
import {
  REVIEWS, VIDEO_REVIEWS, averageRating, videoThumbnail, videoEmbedUrl, videoWatchUrl, isoDuration,
} from "@/data/reviews";

/**
 * /reviews — student reviews, testimonials and video stories.
 *
 * ── THE RULE THIS PAGE EXISTS UNDER ──
 * Nothing on this page may be invented. The site previously carried six
 * fabricated testimonials with stock portraits; they were removed because
 * fabricated reviews are grounds for a Google manual action against the whole
 * domain and are a consumer-protection matter under India's CCPA guidelines.
 *
 * So this page renders only what is in src/data/reviews.ts, and with nothing
 * there it renders an honest empty state. That is not a placeholder to be
 * replaced with filler — it is the correct state of the page until real,
 * consented reviews exist.
 *
 * ── AggregateRating ──
 * Emitted only at three or more real reviews (MIN_REVIEWS_FOR_AGGREGATE below).
 * Google requires an aggregate rating to reflect genuine reviews collected by
 * the site and to be visible on the page carrying the markup. Below a handful
 * the star snippet rarely shows anyway, and a wrong one is a structured-data
 * penalty. Raise this threshold if you like; do not lower it.
 *
 * ── VIDEO ──
 * Videos are embedded from youtube-nocookie.com and only load an iframe after
 * the viewer presses play. Before that it is a static thumbnail — so the page
 * sets no YouTube cookie, and a page with six videos does not load six players.
 * Each video also emits VideoObject schema so it can appear as a video result.
 */

const MIN_REVIEWS_FOR_AGGREGATE = 3;

const PAGE_TITLE = "Student Reviews & Video Stories | DreamDestination";
const PAGE_DESCRIPTION =
  "Reviews and video stories from students we have worked with. Published with permission, in their own words — we do not write our own testimonials.";

const Stars = ({ rating }: { rating: number }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? "text-accent fill-current" : "text-muted-foreground/30"}`}
      />
    ))}
  </span>
);

const ReviewsPage = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  const avg = averageRating();
  const hasReviews = REVIEWS.length > 0;
  const hasVideos = VIDEO_REVIEWS.length > 0;
  const showAggregate = REVIEWS.length >= MIN_REVIEWS_FOR_AGGREGATE && avg !== null;

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE.domain}/reviews`,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE.domain}/reviews` },
      ],
    },
  ];

  if (showAggregate) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: `${SITE.domain}/`,
      telephone: CONTACT.phone,
      ...(CONTACT.emailVerified && CONTACT.email ? { email: CONTACT.email } : {}),
      sameAs: SOCIALS.map((s) => s.href),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avg,
        reviewCount: REVIEWS.length,
        bestRating: 5,
        worstRating: 1,
      },
      review: REVIEWS.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: r.year,
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        reviewBody: r.quote,
      })),
    });
  }

  VIDEO_REVIEWS.forEach((v) => {
    const thumb = videoThumbnail(v);
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title,
      description: v.description,
      uploadDate: v.publishedAt,
      ...(thumb && { thumbnailUrl: [thumb] }),
      ...(isoDuration(v.durationSeconds) && { duration: isoDuration(v.durationSeconds) }),
      ...(v.youtubeId && { embedUrl: `https://www.youtube.com/embed/${v.youtubeId}` }),
      ...(videoWatchUrl(v) && { contentUrl: videoWatchUrl(v) }),
      publisher: { "@type": "Organization", name: SITE.name, url: `${SITE.domain}/` },
    });
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonicalUrl="/reviews"
        keywords={[
          "DreamDestination reviews",
          "study abroad consultant reviews",
          "education loan consultant reviews India",
          "student testimonials study abroad",
          "study abroad success stories",
        ]}
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-1 pt-20">
        <section className="border-b bg-gradient-subtle">
          <div className="container mx-auto px-4 py-10 sm:py-14">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
                <li aria-current="page" className="font-semibold text-foreground">Reviews</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Published with permission, in their own words</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Student Reviews &amp; Video Stories
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {hasReviews || hasVideos
                  ? "Every review here is from a student who actually worked with us, published with their written permission and in their own words."
                  : "We do not write our own testimonials. This page fills up as students agree to share their experience — and stays empty until they do."}
              </p>

              {showAggregate && (
                <div className="mt-6 inline-flex items-center gap-3 bg-card border border-border/70 rounded-xl px-4 py-3 shadow-soft">
                  <Stars rating={avg} />
                  <span className="text-sm font-bold text-foreground">{avg.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">
                    from {REVIEWS.length} student {REVIEWS.length === 1 ? "review" : "reviews"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Video reviews ── */}
        {hasVideos && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Video stories</h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
                  Students talking about their own experience — course choice, funding, the visa, and
                  what they would do differently.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {VIDEO_REVIEWS.map((v) => {
                    const thumb = videoThumbnail(v);
                    const embed = videoEmbedUrl(v);
                    const isPlaying = playing === v.id;
                    return (
                      <article key={v.id} className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-soft">
                        <div className="relative aspect-video bg-muted max-w-full">
                          {isPlaying && embed ? (
                            <iframe
                              src={`${embed}?autoplay=1&rel=0`}
                              title={v.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPlaying(v.id)}
                              className="group absolute inset-0 w-full h-full"
                              aria-label={`Play: ${v.title}`}
                            >
                              {thumb && (
                                <img
                                  src={thumb}
                                  alt=""
                                  width={480}
                                  height={360}
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                />
                              )}
                              <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  <Play className="w-6 h-6 text-primary ml-0.5 fill-current" />
                                </span>
                              </span>
                            </button>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-extrabold text-base leading-snug mb-1.5">{v.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {[v.name, v.course, v.university, v.city].filter(Boolean).join(" · ")}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Text reviews ── */}
        {hasReviews && (
          <section className={`py-12 lg:py-16 ${hasVideos ? "border-t bg-gradient-subtle" : ""}`}>
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-8">What students said</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {REVIEWS.map((r) => (
                    <article key={r.id} className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft flex flex-col">
                      <Stars rating={r.rating} />
                      <blockquote className="text-sm text-muted-foreground leading-relaxed my-4 flex-1">
                        "{r.quote}"
                      </blockquote>
                      <footer className="pt-4 border-t border-border/50">
                        <p className="font-bold text-sm text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {[r.course, r.university, r.city, r.year].filter(Boolean).join(" · ")}
                        </p>
                      </footer>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {!hasReviews && !hasVideos && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="bg-card border border-border/80 rounded-2xl p-8 sm:p-10 shadow-soft">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
                    No reviews here yet — and that is deliberate
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    Most consultancy websites carry a wall of five-star testimonials from students who
                    do not exist, with stock photographs attached. This one did too, until they were
                    removed.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    Reviews appear on this page only when a real student agrees to share their
                    experience, in their own words, in writing. Video stories go up the same way. Until
                    then the page stays empty, because an empty page costs far less than a dishonest
                    one.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    In the meantime, judge the advice rather than the testimonials: the first
                    consultation is free, and you will get a straight answer about what your plan
                    costs and what it risks before you commit to anything.
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="font-semibold">
                      <Link to="/contact">Book a free consultation<ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                    <Button asChild variant="outline" className="font-semibold">
                      <Link to="/about">How we actually work</Link>
                    </Button>
                  </div>
                </div>

                {/* Real social proof that does exist today: the YouTube channel. */}
                <div className="mt-6 bg-card border border-border/70 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm mb-1">Our YouTube channel</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Student stories and guidance videos go up there first. Video reviews will be
                      embedded on this page as students agree to share them.
                    </p>
                    <a
                      href={SOCIALS.find((s) => s.icon === "youtube")?.href ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1.5"
                    >
                      Visit the channel <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Ask for a review — the thing that actually fills this page ── */}
        {(hasReviews || hasVideos) && (
          <section className="py-12 border-t">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-gradient-hero rounded-2xl p-8 text-white text-center shadow-elegant">
                <h2 className="text-2xl font-extrabold mb-3">Worked with us? Tell other students.</h2>
                <p className="opacity-90 mb-6">
                  A written note or a two-minute video helps the next student far more than anything
                  we could write ourselves.
                </p>
                <Button asChild size="lg" className="bg-gradient-gold text-secondary-foreground font-bold shadow-gold">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    Share your experience
                  </a>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
