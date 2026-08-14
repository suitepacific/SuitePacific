import type { LucideIcon } from "lucide-react";

export type NavLink =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: { label: string; href: string; description?: string }[] };

export type IconItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

export type TimelineStep = {
  label: string;
  description: string;
  emphasis?: boolean;
};

export type CaseStudy = {
  icon: LucideIcon;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type KpiStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogPostVideo = {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  duration?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  readingTime: string;
  calloutText?: string;
  video?: BlogPostVideo;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};
