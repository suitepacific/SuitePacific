export default function Loading() {
  return (
    <div className="max-w-4xl animate-pulse">
      {/* Back link */}
      <div className="h-3 w-20 bg-brand-100 rounded mb-4" />

      {/* Header */}
      <div className="mb-8">
        <div className="h-7 w-48 bg-brand-100 rounded-lg mb-2" />
        <div className="h-4 w-36 bg-brand-50 rounded-lg" />
      </div>

      {/* Environments */}
      <div className="mb-8">
        <div className="h-4 w-24 bg-brand-100 rounded mb-3" />
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="h-32 bg-brand-50 rounded-2xl" />
          <div className="h-32 bg-brand-50 rounded-2xl" />
          <div className="h-32 bg-brand-50 rounded-2xl border-2 border-dashed border-brand-100" />
        </div>
      </div>

      {/* Browse script */}
      <div className="mb-8">
        <div className="h-4 w-32 bg-brand-100 rounded mb-1" />
        <div className="h-3 w-64 bg-brand-50 rounded mb-3" />
        <div className="h-11 bg-brand-50 rounded-xl" />
      </div>

      {/* Scripts table placeholder */}
      <div className="h-4 w-28 bg-brand-100 rounded mb-3" />
      <div className="h-48 bg-brand-50 rounded-2xl" />
    </div>
  );
}
