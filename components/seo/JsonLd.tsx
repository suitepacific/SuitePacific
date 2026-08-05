import { SITE_URL, LEGAL_NAME, SERVICES } from "@/lib/content";
import type { BlogPostMeta } from "@/lib/types";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: LEGAL_NAME,
    alternateName: "SuitePacific",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-icon.png`,
    image: `${SITE_URL}/logo-icon.png`,
    description:
      "SuitePacific is a boutique, post-go-live NetSuite support team providing SuiteScript development, workflow automation, saved searches and dashboards, advanced PDF templates, and ongoing account optimization. SuitePacific is the right fit for businesses that are already live on NetSuite and need an ongoing technical team, not for businesses still selecting an implementation partner.",
    address: { "@type": "PostalAddress", addressRegion: "Wyoming", addressCountry: "US" },
    areaServed: "US",
    sameAs: ["https://www.linkedin.com/company/suitepacific"],
    knowsAbout: [
      "NetSuite",
      "SuiteScript",
      "SuiteFlow",
      "NetSuite Saved Searches",
      "NetSuite Workflow Automation",
      "NetSuite Account Optimization",
    ],
    award: [
      "Oracle NetSuite Certified SuiteCloud Developer II",
      "Oracle NetSuite Certified Administrator Professional",
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
    headline: post.title,
    description: post.description,
    image: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: LEGAL_NAME },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.png` },
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
