import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SuiteCompare | SuitePacific",
};

export default function SuiteCompareRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
