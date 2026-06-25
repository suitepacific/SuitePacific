export function GradientBlob({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="blob-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4f7fff" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#0b1f4d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0b1f4d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="300" fill="url(#blob-gradient)" />
    </svg>
  );
}
