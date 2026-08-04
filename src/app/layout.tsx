import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://software.kunev.dev"),
  title: {
    default: "Разработка на софтуер — учебен сайт",
    template: "%s · Разработка на софтуер",
  },
  description:
    "Учебен сайт за паралелка „Разработка на софтуер“ (код 061303) — материали по специалните предмети, подредени по класове, раздели, теми и седмици според официалната учебна програма.",
  keywords: [
    "Разработка на софтуер",
    "061303",
    "Дигитални технологии",
    "учебна програма",
    "VIII клас",
    "професионално образование",
  ],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "/",
    siteName: "Разработка на софтуер — учебен сайт",
    title: "Разработка на софтуер — учебен сайт",
    description:
      "Материали по специалните предмети на паралелка „Разработка на софтуер“ — по класове, раздели, теми и седмици.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
