import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { Timeline } from "@/components/sections/Timeline";
import { Services } from "@/components/sections/Services";
import { Comparison } from "@/components/sections/Comparison";
import { BoutiqueBenefits } from "@/components/sections/BoutiqueBenefits";
import { About } from "@/components/sections/About";
import { RecentWork } from "@/components/sections/RecentWork";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { MidCta } from "@/components/sections/MidCta";
import { Insights } from "@/components/sections/Insights";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { getAllPosts } from "@/lib/blog";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default async function Home() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <main>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Hero />
      <PainPoints />
      <Timeline />
      <Services />
      <Comparison />
      <BoutiqueBenefits />
      <About />
      <RecentWork />
      <CaseStudies />
      <MidCta />
      <Insights posts={posts.slice(0, 3)} />
      <Faq />
      <FinalCta />
    </main>
  );
}
