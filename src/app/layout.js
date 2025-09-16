import "@/styles/globals.css";
import "@/design-system/tokens.css";
import "@/design-system/typography.css";

export const metadata = {
  title: "OAFISH WISH PROJECT",
  description: "꿈을 담은 쪽지와 씨앗을 심어보세요",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
