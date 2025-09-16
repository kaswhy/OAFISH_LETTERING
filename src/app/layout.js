import "@/styles/globals.css";
import "@/design-system/tokens.css";
import "@/design-system/typography.css";

import GAListener from "./_ga-listener";
import Script from "next/script";

export const metadata = {
  title: "OAFISH WISH PROJECT",
  description: "꿈을 담은 쪽지와 씨앗을 심어보세요",
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    title: "OAFISH WISH PROJECT",
    description: "꿈을 담은 쪽지와 씨앗을 심어보세요",
    url: "https://oafishproject.site",
    siteName: "OAFISH",
    images: [
      {
        url: "https://oafishproject.site/assets/favicon.png",
        alt: "OAFISH",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  alternates: {
    canonical: "https://oafishproject.site/",
    languages: {
      "x-default": "https://oafishproject.site",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko">
      <body>
        {children}

        {process.env.NODE_ENV === "production" && GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
            <GAListener />
          </>
        )}
      </body>
    </html>
  );
}
