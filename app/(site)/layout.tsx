import { Nav } from "@/components/nav/Nav";
import { MobileStickyCta } from "@/components/nav/MobileStickyCta";
import { Footer } from "@/components/sections/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <PageViewTracker />
      <Nav />
      <MobileStickyCta />
      {children}
      <Footer />
    </>
  );
}
