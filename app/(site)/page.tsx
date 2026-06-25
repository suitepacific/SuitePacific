import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { Timeline } from "@/components/sections/Timeline";
import { Services } from "@/components/sections/Services";
import { Comparison } from "@/components/sections/Comparison";
import { BoutiqueBenefits } from "@/components/sections/BoutiqueBenefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <Timeline />
      <Services />
      <Comparison />
      <BoutiqueBenefits />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
