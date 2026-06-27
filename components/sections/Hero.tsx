import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { DashboardMockup } from "@/components/graphics/DashboardMockup";
import { TRUST_BADGES, CTA_SUPPORT_LINE } from "@/lib/content";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 to-white" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
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

          <div className="mt-6 flex items-center gap-2 text-sm text-brand-600">
            <Clock className="h-4 w-4 text-accent shrink-0" />
            <span>
              Most requests move in <span className="font-semibold text-brand-900">days, not weeks</span>.
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
