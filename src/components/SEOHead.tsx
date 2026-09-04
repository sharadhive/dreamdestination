import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl: string;
  ogImage?: string;
  jsonLd?: object[];
}

const SITE_DOMAIN = "https://dreamdestinations.co.in";

const SEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = `${SITE_DOMAIN}/hero-education.jpg`,
  jsonLd = [],
}: SEOHeadProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    if (keywords.length > 0) {
      setMeta("name", "keywords", keywords.join(", "));
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "DreamDestinations");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // JSON-LD structured data
    // Remove old dynamic JSON-LD scripts
    document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());

    jsonLd.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", `schema-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
      // Reset to default title
      document.title = "DreamDestinations - Study Abroad Experts & Education Loans";
    };
  }, [title, description, keywords, canonicalUrl, ogImage, jsonLd]);

  return null; // This component renders nothing — it only manipulates <head>
};

export default SEOHead;
