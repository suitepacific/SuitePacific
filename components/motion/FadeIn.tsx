"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  /** Animate on mount instead of waiting for scroll-into-view. Use for sections
   * that can be jumped to directly via anchor link, where a scroll-triggered
   * fade can stay visibly mid-transition until native smooth-scroll finishes. */
  onMount?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  y = 16,
  className = "",
  once = true,
  onMount = false,
}: FadeInProps) {
  const viewportProps = onMount
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once, amount: 0.3 } };

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      {...viewportProps}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
