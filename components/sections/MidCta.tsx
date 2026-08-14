import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTA_SUPPORT_LINE } from "@/lib/content";

export function MidCta() {
  return (
    <section id="mid-cta" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-brand-50/60 border border-brand-100 px-5 sm:px-8 py-10 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-900 text-balance">
              Ready to Get More From Your NetSuite Account?
            </h2>
            <div className="mt-7">
              <Button href="/#contact" size="lg">
                Book a Free Consultation
              </Button>
            </div>
            <p className="mt-4 text-sm text-brand-400 max-w-md mx-auto text-balance">
              {CTA_SUPPORT_LINE}
            </p>
            <Link
              href="https://clutch.co/profile/suitepacific"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs text-brand-400 hover:text-accent transition-colors"
            >
              <span className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
              </span>
              5.0 on Clutch
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
