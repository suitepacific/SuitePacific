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
import { OrganizationJsonLd, WebSiteJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
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
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        uploadDate="2026-08-12"
        isShort
      />
      <Hero />
      <PainPoints />
      <Timeline />
      <Services />
      <Comparison />
      <BoutiqueBenefits />
      <About />
      <section className="py-8" data-section="intro-video">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div
                className="w-32 shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-xl"
                style={{ aspectRatio: "9/16" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/IQvWN_yZ24A"
                  title="SuitePacific Introduction: NetSuite Post-Go-Live Support"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-900">About SuitePacific</p>
                <p className="mt-2 text-sm text-brand-400">
                  A short overview of what SuitePacific does, who we work with, and how post-go-live
                  NetSuite support works in practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RecentWork />
      <CaseStudies />
      <MidCta />
      <Insights posts={posts.slice(0, 3)} />
      <Faq />
      <FinalCta />
    </main>
  );
}
