import { ScAdminTabs } from "./ScAdminTabs";

export default function SuiteCompareAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-brand-900 mb-4">SuiteCompare</h1>
        <ScAdminTabs />
      </div>
      {children}
    </div>
  );
}
