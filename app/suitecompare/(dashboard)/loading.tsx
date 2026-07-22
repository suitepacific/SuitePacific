export default function Loading() {
  return (
    <div className="max-w-4xl animate-pulse">
      <div className="mb-8">
        <div className="h-7 w-48 bg-brand-100 rounded-lg mb-2" />
        <div className="h-4 w-72 bg-brand-50 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="h-24 bg-brand-50 rounded-2xl" />
        <div className="h-24 bg-brand-50 rounded-2xl" />
        <div className="h-24 bg-brand-50 rounded-2xl" />
      </div>
    </div>
  );
}
