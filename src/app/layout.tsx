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
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} pb-20 antialiased`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
