export const GA_ID = "G-JKJ2GZCB79";

type Gtag = (...args: unknown[]) => void;

export function trackLead(form: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "generate_lead", { form_name: form, page_path: window.location.pathname });
}
