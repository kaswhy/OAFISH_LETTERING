import "../styles/globals.css";

export const metadata = { title: "OAFISH" };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
