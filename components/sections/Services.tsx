"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Ongoing NetSuite Expertise, On Demand"
          subtitle="The day-to-day work that keeps your NetSuite account running and improving."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-soft border border-brand-50 p-6 h-full hover:shadow-soft-lg hover:border-brand-100 transition-shadow"
              >
                {service.href ? (
                  <Link href={service.href} className="flex flex-col h-full group">
                    <IconBadge icon={service.icon} size="lg" />
                    <h3 className="mt-5 font-semibold text-brand-900 text-lg">{service.title}</h3>
                    <p className="mt-2 text-sm text-brand-400 flex-1">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ) : (
                  <>
                    <IconBadge icon={service.icon} size="lg" />
                    <h3 className="mt-5 font-semibold text-brand-900 text-lg">{service.title}</h3>
                    <p className="mt-2 text-sm text-brand-400">{service.description}</p>
                  </>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
