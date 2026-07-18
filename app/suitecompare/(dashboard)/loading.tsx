export default function Loading() {
  return (
    <div className="max-w-4xl animate-pulse">
      {/* Title */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="h-7 w-40 bg-brand-100 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-brand-50 rounded-lg" />
        </div>
        <div className="h-9 w-32 bg-brand-100 rounded-full shrink-0" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="h-24 bg-brand-50 rounded-2xl" />
        <div className="h-24 bg-brand-50 rounded-2xl" />
      </div>

      {/* Section heading */}
      <div className="h-4 w-24 bg-brand-100 rounded mb-3" />

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="h-44 bg-brand-50 rounded-2xl" />
        <div className="h-44 bg-brand-50 rounded-2xl" />
        <div className="h-44 bg-brand-50 rounded-2xl border-2 border-dashed border-brand-100" />
      </div>
    </div>
  );
}
