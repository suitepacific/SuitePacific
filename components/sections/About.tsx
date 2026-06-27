import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ABOUT_INTRO, ABOUT_FEATURES } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow={ABOUT_INTRO.eyebrow} title={ABOUT_INTRO.title} />

        <div className="mt-8 max-w-3xl mx-auto space-y-5 text-center">
          {ABOUT_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg text-brand-400 text-balance">
              {paragraph}
            </p>
          ))}
        </div>

        <StaggerGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <Card className="p-6 h-full">
                <IconBadge icon={feature.icon} />
                <h3 className="mt-5 font-semibold text-brand-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-brand-400">{feature.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
