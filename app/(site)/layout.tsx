import { Nav } from "@/components/nav/Nav";
import { MobileStickyCta } from "@/components/nav/MobileStickyCta";
import { Footer } from "@/components/sections/Footer";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { SectionTracker } from "@/components/analytics/SectionTracker";
import { GoogleTag } from "@/components/analytics/GoogleTag";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTag />
      <PageViewTracker />
      <SectionTracker />
      <Nav />
      <MobileStickyCta />
      {children}
      <Footer />
      <ConsentBanner />
    </>
  );
}
