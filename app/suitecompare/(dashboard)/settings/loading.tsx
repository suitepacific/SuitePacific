export default function SettingsLoading() {
  return (
    <div className="max-w-2xl animate-pulse">
      <div className="mb-6">
        <div className="h-7 w-32 bg-brand-100 rounded-lg mb-2" />
        <div className="h-4 w-64 bg-brand-50 rounded-lg" />
      </div>
      <div className="flex gap-1 border-b border-brand-100 mb-6">
        <div className="h-8 w-16 bg-brand-50 rounded-t-lg" />
        <div className="h-8 w-20 bg-brand-50 rounded-t-lg" />
      </div>
      <div className="space-y-4">
        <div className="h-40 bg-brand-50 rounded-2xl" />
        <div className="h-64 bg-brand-50 rounded-2xl" />
      </div>
    </div>
  );
}
