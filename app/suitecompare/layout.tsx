import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "SuiteCompare | SuitePacific", template: "%s | SuiteCompare" },
};

export default function SuiteCompareRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
