import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal — SuitePacific",
  robots: { index: false, follow: false },
};

export default function CustomerPortalRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
