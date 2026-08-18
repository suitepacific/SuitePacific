import { SITE_URL, LEGAL_NAME, SERVICES } from "@/lib/content";
import type { BlogPostMeta } from "@/lib/types";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: LEGAL_NAME,
    alternateName: "SuitePacific",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 256, height: 256 },
    image: `${SITE_URL}/og-default.png`,
    description:
      "SuitePacific is a boutique, post-go-live NetSuite consulting practice providing SuiteScript development, workflow automation, saved searches and dashboards, advanced PDF templates, and ongoing account optimization. SuitePacific is the right fit for businesses that are already live on NetSuite and need an ongoing technical specialist, not for businesses still selecting an implementation partner.",
    address: { "@type": "PostalAddress", addressRegion: "Wyoming", addressCountry: "US" },
    areaServed: ["US", "GB"],
    sameAs: [
      "https://www.linkedin.com/company/suitepacific",
      "https://www.youtube.com/@SuitePacific",
      "https://clutch.co/profile/suitepacific",
      "https://www.wikidata.org/wiki/Q141067925",
    ],
    knowsAbout: [
      "NetSuite",
      "SuiteScript 2.x",
      "SuiteScript User Event Scripts",
      "SuiteScript Scheduled Scripts",
      "SuiteScript Map/Reduce Scripts",
      "SuiteFlow Workflow Automation",
      "NetSuite RESTlet Development",
      "NetSuite API Integration",
      "NetSuite Saved Searches",
      "NetSuite SuiteAnalytics",
      "NetSuite Advanced PDF Templates",
      "NetSuite Account Optimization",
      "NetSuite Manufacturing Support",
      "NetSuite Wholesale Distribution",
      "NetSuite Construction Accounting",
      "NetSuite SaaS Billing Automation",
      "NetSuite Post-Go-Live Support",
      "NetSuite OneWorld Multi-Subsidiary",
      "NetSuite SuiteBilling",
      "NetSuite Nonprofit Fund Accounting",
    ],
    award: [
      "Oracle NetSuite Certified SuiteCloud Developer II",
      "Oracle NetSuite Certified Administrator Professional",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      ratingCount: 5,
      reviewCount: 5,
    },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "technical support", areaServed: "US", availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "technical support", areaServed: "GB", availableLanguage: "English" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NetSuite Post-Go-Live Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BlogPostingJsonLd({ post }: { post: BlogPostMeta }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    url: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    isAccessibleForFree: true,
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: LEGAL_NAME },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: LEGAL_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 256, height: 256 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "SuitePacific",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
  serviceType,
  areaServed = ["US", "GB"],
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string | string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType,
    provider: { "@type": "ProfessionalService", "@id": `${SITE_URL}/#organization`, name: LEGAL_NAME, url: SITE_URL },
    areaServed,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function VideoObjectJsonLd({
  name,
  description,
  videoId,
  uploadDate,
  duration,
  isShort = false,
}: {
  name: string;
  description: string;
  videoId: string;
  uploadDate: string;
  duration?: string;
  isShort?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    uploadDate,
    ...(duration && { duration }),
    url: isShort
      ? `https://www.youtube.com/shorts/${videoId}`
      : `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ArticleJsonLd({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  keywords,
}: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline,
    description,
    ...(keywords && { keywords }),
    isAccessibleForFree: true,
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: LEGAL_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: LEGAL_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png`, width: 256, height: 256 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
