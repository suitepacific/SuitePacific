import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CASE_STUDIES } from "@/lib/content";

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Success Stories"
          title="Recent Client Success Stories"
          subtitle="Representative examples of the kind of work we take on after a NetSuite account is live."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CASE_STUDIES.map((study) => (
            <StaggerItem key={study.industry}>
              <Card className="p-7 h-full">
                <div className="flex items-center gap-3">
                  <IconBadge icon={study.icon} />
                  <h3 className="font-semibold text-brand-900">{study.industry}</h3>
                </div>

                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-accent">Challenge</dt>
                    <dd className="mt-1.5 text-sm text-brand-400">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-accent">Solution</dt>
                    <dd className="mt-1.5 text-sm text-brand-400">{study.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-accent">Outcome</dt>
                    <dd className="mt-1.5 text-sm text-brand-400">{study.outcome}</dd>
                  </div>
                </dl>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
