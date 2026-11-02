import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { site, siteUrl } from "@/data/site";
import "./globals.css";
import SmoothScroll from "@/hooks/SmoothScroll";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Visa, flights, hotels and car rental in Karachi`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "travel agency Karachi",
    "visa services",
    "flight tickets",
    "hotel booking",
    "car rental",
  ],
};

export const viewport: Viewport = {
  themeColor: "#08252d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} bg-page font-sans text-ink antialiased`}
      >
        <ScrollProgress />
        <Header />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
