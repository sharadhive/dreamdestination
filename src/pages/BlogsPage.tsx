import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, PenLine, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { SITE, SERVICE_ROUTES } from "@/config/site";
import { BLOG_POSTS, BLOG_CATEGORIES, sortedPosts, readingTime, type BlogCategory } from "@/data/blogPosts";

/**
 * /blogs — the listing page.
 *
 * Renders whatever is in src/data/blogPosts.ts. With nothing published it shows
 * an honest empty state and routes the visitor to the pages that can actually
 * help them today, rather than fabricating placeholder posts.
 *
 * The individual post route (/blogs/:slug) is deliberately NOT built yet. A
 * route that renders an empty article is worse than no route — it produces
 * thin pages Google will crawl and hold against the domain. Add it when there
 * are posts, and add the posts to the sitemap at the same time.
 */

const PAGE_TITLE = "Study Abroad Blog | Loans, Visas & Admissions";
const PAGE_DESCRIPTION =
  "Practical guides for Indian students — education loans for abroad and India, student visa rules, admissions, scholarships and destination costs.";

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const posts = sortedPosts();
  const hasPosts = posts.length > 0;

  const visible =
    activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "DreamDestination Study Abroad Blog",
      description: PAGE_DESCRIPTION,
      url: `${SITE.domain}/blogs`,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
      publisher: { "@type": "EducationalOrganization", name: SITE.name, url: `${SITE.domain}/` },
      // Only emit blogPost entries when posts genuinely exist. Structured data
      // describing an empty list is worse than none.
      ...(hasPosts && {
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.publishedAt,
          ...(p.updatedAt && { dateModified: p.updatedAt }),
          author: { "@type": "Person", name: p.author },
          url: `${SITE.domain}/blogs/${p.slug}`,
        })),
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.domain}/blogs` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonicalUrl="/blogs"
        keywords={[
          "study abroad blog",
          "education loan guide India",
          "student visa guide",
          "study abroad tips for Indian students",
          "scholarship guide India",
          "cost of studying abroad",
        ]}
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-1 pt-20">
        {/* ── Header ── */}
        <section className="border-b bg-gradient-subtle">
          <div className="container mx-auto px-4 py-10 sm:py-14">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
                <li aria-current="page" className="font-semibold text-foreground">Blog</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <PenLine className="w-3.5 h-3.5" />
                <span>Guides for students and parents</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Study Abroad Blog
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Education loans for courses abroad and inside India, student visa rules as they
                actually apply, what a course really costs after the waivers nobody mentions, and
                the mistakes that cost students an intake.
              </p>
            </div>
          </div>
        </section>

        {/* ── Category filter — only useful once posts exist ── */}
        {hasPosts && (
          <section className="sticky top-[73px] z-30 bg-card/95 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                {(["All", ...BLOG_CATEGORIES] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as BlogCategory | "All")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-smooth ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            {hasPosts ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {visible.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt ?? ""}
                        width={800}
                        height={450}
                        loading="lazy"
                        className="w-full h-44 object-cover"
                      />
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                        {post.category}
                      </span>
                      <h2 className="text-lg font-extrabold leading-snug mb-2">
                        <Link to={`/blogs/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {readingTime(post)} min read
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* ── Empty state ──
                 No fake posts. Tell the visitor plainly that the blog is new,
                 then send them to the pages that answer their question today. */
              <div className="max-w-3xl mx-auto">
                <div className="bg-card border border-border/80 rounded-2xl p-8 sm:p-10 shadow-soft text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                    <PenLine className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
                    The first guides are being written
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2">
                    We would rather publish nothing than publish the same recycled "Top 10
                    Universities" post every other consultancy runs. What goes here will be the
                    specific things students get wrong — the document a bank asked for at the last
                    minute, the visa rule that changed mid-intake, the fee waiver that has its own
                    separate deadline.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In the meantime, the pages below already answer most of it.
                  </p>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Start here instead
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { to: "/financial-assistance", label: "Education loan guidance", note: "Secured, unsecured and PM-Vidyalaxmi explained" },
                      { to: "/visa-assistance", label: "Student visa assistance", note: "Where files actually get refused" },
                      { to: "/scholarship-assistance", label: "Scholarships", note: "Many close before university deadlines" },
                      { to: "/countries", label: "All 22 destinations", note: "Costs, universities and visa routes" },
                      { to: "/admission-guidance", label: "Admission guidance", note: "Building a shortlist that is not all reach" },
                      { to: "/locations", label: "Find your city", note: "480+ cities across 35 states" },
                    ].map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="group flex items-start justify-between gap-3 bg-card border border-border/70 rounded-xl p-4 hover:border-primary/40 hover:shadow-soft transition-all"
                      >
                        <span>
                          <span className="block font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                            {l.label}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{l.note}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Services strip: internal links on every visit, posts or not ── */}
        <section className="py-12 border-t bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg font-extrabold mb-5">What we help with</h2>
              <div className="flex flex-wrap gap-2">
                {SERVICE_ROUTES.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="px-3.5 py-2 bg-card border border-border/70 rounded-lg text-xs font-semibold hover:border-primary/40 hover:text-primary transition-all"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild className="font-semibold">
                  <Link to="/contact">Book a free consultation<ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogsPage;
