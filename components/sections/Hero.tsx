import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { DashboardMockup } from "@/components/graphics/DashboardMockup";
import { TRUST_BADGES, CTA_SUPPORT_LINE } from "@/lib/content";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 to-white" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-900 text-balance">
            Your NetSuite Journey Doesn&apos;t End After Go-Live.
          </h1>
          <p className="mt-6 text-lg text-brand-400 max-w-xl text-balance">
            We become your dedicated NetSuite team, delivering ongoing
            enhancements, custom development, workflow automation, reporting,
            and expert support as your business grows.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" size="lg">
              Book a Free Consultation
            </Button>
            <Button href="#timeline" variant="secondary" size="lg">
              See How We Help
            </Button>
          </div>

          <p className="mt-4 text-sm text-brand-400">{CTA_SUPPORT_LINE}</p>

          <Link
            href="https://clutch.co/profile/suitepacific"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm text-brand-700 shadow-sm hover:border-brand-200 transition-colors"
          >
            <span className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="font-semibold text-brand-900">5.0</span>
            <span className="text-brand-400">&middot; 1 verified review on Clutch</span>
          </Link>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRUST_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-brand-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                {badge}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <DashboardMockup />
        </FadeIn>
      </div>
    </section>
  );
}
