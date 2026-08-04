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
  title: "Разработка на софтуер",
  description:
    "Учебен сайт за паралелка „Разработка на софтуер“ — материали по специалните предмети по класове, теми и седмици.",
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
