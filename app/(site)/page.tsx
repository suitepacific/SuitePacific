import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
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
import { LeadFormLight } from "@/components/sections/LeadFormLight";
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
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />
      <Hero />
      <SocialProof />
      <PainPoints />
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to fix it?</p>
          <p className="text-sm text-brand-400 mb-5">Tell us what you are working on. We will respond within one business day.</p>
          <LeadFormLight />
        </div>
      </section>
      <Timeline />
      <Services />
      <Comparison />
      <BoutiqueBenefits />
      <About />
      <section className="py-8" data-section="intro-video">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <a
                href="https://www.youtube.com/shorts/IQvWN_yZ24A"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-44 shrink-0 overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.ytimg.com/vi/IQvWN_yZ24A/hqdefault.jpg"
                  alt="SuitePacific introduction video"
                  className="w-full h-full object-cover"
                  width={480}
                  height={360}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <svg className="w-4 h-4 ml-0.5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
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
