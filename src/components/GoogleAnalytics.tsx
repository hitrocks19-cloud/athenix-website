import Script from "next/script";

/**
 * Google Analytics 4. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is
 * set (for example G-XXXXXXXXXX), so local work and previews send no data.
 * The ID is baked in at build time: after changing it in Vercel, redeploy.
 * GA4's built-in page-view tracking also covers navigation between pages.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
