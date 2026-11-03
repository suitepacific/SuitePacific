import Script from "next/script";
import { GA_ID } from "@/lib/gtag";
import { INTERNAL_COOKIE, INTERNAL_COOKIE_MAX_AGE } from "@/lib/internal-traffic";

export function GoogleTag() {
  if (process.env.VERCEL_ENV !== "production") return null;

  // ?sp_internal=1 marks a team browser as internal (=0 clears it); internal browsers send nothing to Google.
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`(function(){
var q=new URLSearchParams(location.search).get('${INTERNAL_COOKIE}');
if(q==='1')document.cookie='${INTERNAL_COOKIE}=1; path=/; max-age=${INTERNAL_COOKIE_MAX_AGE}; samesite=lax; secure';
if(q==='0')document.cookie='${INTERNAL_COOKIE}=; path=/; max-age=0; samesite=lax; secure';
if(document.cookie.split('; ').some(function(c){return c.indexOf('${INTERNAL_COOKIE}=1')===0;}))return;
window.dataLayer=window.dataLayer||[];
window.gtag=function(){dataLayer.push(arguments);};
gtag('js',new Date());
gtag('config','${GA_ID}');
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
document.head.appendChild(s);
})();`}
      </Script>
    </>
  );
}
