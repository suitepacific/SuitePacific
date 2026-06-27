import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type IconItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type TimelineStep = {
  label: string;
  description: string;
  emphasis?: boolean;
};

export type CaseStudy = {
  icon: LucideIcon;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type KpiStat = {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  positive: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};
