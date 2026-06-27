type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  as = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const Heading = as;

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span
          className={`inline-block text-sm font-semibold tracking-wide uppercase mb-3 ${
            light ? "text-accent-light" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <Heading
        className={`text-3xl sm:text-4xl font-semibold tracking-tight text-balance ${
          light ? "text-white" : "text-brand-900"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`mt-4 text-lg text-balance ${
            light ? "text-blue-50" : "text-brand-400"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
