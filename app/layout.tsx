import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hollowyard-assets.lede-7716.chatgpt.site"),
  title: "HOLLOWYARD — Game Assets for Worlds Yet to Exist",
  description:
    "할로우야드는 게임의 분위기를 완성하는 에셋과 콘텐츠를 만드는 독립 브랜드입니다. Hollowyard creates game assets for worlds yet to exist.",
  openGraph: {
    title: "HOLLOWYARD",
    description: "Game assets for worlds yet to exist.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 939,
        alt: "Hollowyard — Game assets for worlds yet to exist.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOLLOWYARD",
    description: "Game assets for worlds yet to exist.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
