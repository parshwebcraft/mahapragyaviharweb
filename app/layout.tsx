import type { Metadata } from "next";

import "./globals.css";

import { PwaRegister } from "@/components/pwa-register";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} Bhuwana Udaipur – Rooms, Wedding Hall & Booking`,
    template: `%s | ${siteConfig.name}`
  },

  description: siteConfig.description,

  keywords: [
    "Mahapragya Vihar Udaipur",
    "Rooms in Bhuwana Udaipur",
    "Wedding hall Udaipur",
    "Jain Dharamshala Udaipur",
    "Event venue Bhuwana Udaipur",
    "Pravachan hall Udaipur"
  ],

  authors: [
    {
      name: "Gauransh Jaroli",
      url: "https://parshwebcraft.in"
    }
  ],

  creator: "Gauransh Jaroli",
  publisher: "ParshWebCraft",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: "/icon?size=512",
    apple: "/apple-icon"
  },

  openGraph: {
    title: `${siteConfig.name} Udaipur`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },

  robots: {
    index: true,
    follow: true
  },

  category: "Hotel Booking & Event Venue"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />

        <div className="relative min-h-screen overflow-x-hidden">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig?.contact?.area || "Bhuwana",
                addressRegion: siteConfig?.contact?.city || "Udaipur",
                addressCountry: siteConfig?.contact?.country || "India"
              }
            })
          }}
        />
      </body>
    </html>
  );
}