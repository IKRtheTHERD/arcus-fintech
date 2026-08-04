import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCUS FINTECH — Algorithmic Quantitative Investment Platform",
  description:
    "Institutional quantitative investment management engine utilizing machine learning portfolio optimization, market-neutral statistical arbitrage, and real-time risk control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="bg-bgDark text-textMain min-h-screen flex flex-col antialiased selection:bg-accentCyan selection:text-bgDark">
        <Header />
        <main className="flex-1"><SmoothScrollProvider>{children}</SmoothScrollProvider></main>
        <Footer />
      </body>
    </html>
  );
}
\nimport SmoothScrollProvider from '@/components/SmoothScrollProvider';