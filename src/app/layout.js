import "@/styles/globals.css"; 
import "@/design-system/tokens.css";
import "@/design-system/typography.css"; 

export const metadata = { title: "OAFISH" };

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
