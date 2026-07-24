"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Building2, Rocket, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TIMELINE_STEPS, TIMELINE_BENEFITS } from "@/lib/content";

const STEP_ICONS = [Building2, Rocket, Sparkles];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: "easeInOut" as const } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Timeline() {
  return (
    <section id="timeline" className="py-24 sm:py-32 bg-brand-50/40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The SuitePacific Difference"
          title="We're Your Post-Go-Live NetSuite Partner"
          subtitle="Your business evolves. Your NetSuite should too."
        />

        <Card className="mt-16 p-8 sm:p-12 lg:p-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-0"
          >
            {TIMELINE_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <div key={step.label} className="flex sm:flex-1 items-center">
                  <motion.div variants={nodeVariants} className="flex flex-col items-center text-center sm:flex-1">
                    <div
                      className={`flex items-center justify-center rounded-full transition-colors ${
                        step.emphasis
                          ? "h-20 w-20 bg-brand text-white shadow-soft-lg ring-4 ring-accent/30"
                          : "h-16 w-16 bg-white text-brand-400 shadow-soft border border-brand-100"
                      }`}
                    >
                      <Icon className={step.emphasis ? "h-8 w-8" : "h-6 w-6"} strokeWidth={1.75} />
                    </div>
                    <p
                      className={`mt-4 font-semibold ${
                        step.emphasis ? "text-brand-900 text-lg" : "text-brand-600"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs text-brand-400 max-w-[160px]">{step.description}</p>
                  </motion.div>

                  {index < TIMELINE_STEPS.length - 1 && (
                    <motion.div
                      variants={lineVariants}
                      style={{ originX: 0 }}
                      className="hidden sm:block h-1 flex-1 rounded-full bg-gradient-to-r from-brand-200 via-accent to-accent mx-3 mb-12"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>

          <div className="mt-12 pt-10 border-t border-brand-50">
            <p className="text-center text-sm font-semibold text-brand-400 uppercase tracking-wide mb-8">
              What that means for you, every month
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={listVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-5"
            >
              {TIMELINE_BENEFITS.map((benefit) => (
                <motion.div
                  key={benefit}
                  variants={listItemVariants}
                  className="flex items-center gap-2 text-sm text-brand-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  {benefit}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
