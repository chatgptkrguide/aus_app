import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "호주 워홀 메이트 | 워킹홀리데이 준비 가이드",
  description:
    "게임처럼 재미있게! 호주 워킹홀리데이 비자 신청부터 출발까지 단계별 가이드",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "워홀메이트",
  },
  openGraph: {
    title: "호주 워홀 메이트",
    description:
      "게임처럼 재미있게! 호주 워킹홀리데이 비자 신청부터 출발까지 단계별 가이드",
    url: "https://ausapp-tau.vercel.app",
    siteName: "호주 워홀 메이트",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "호주 워홀 메이트",
    description:
      "게임처럼 재미있게! 호주 워킹홀리데이 비자 신청부터 출발까지 단계별 가이드",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${notoSansKR.variable} antialiased`}>
        {children}
        <BottomNav />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
