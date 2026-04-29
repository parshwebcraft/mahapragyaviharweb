import type { Metadata } from "next";

import "./globals.css";

import { PwaRegister } from "@/components/pwa-register";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingBranding } from "@/components/floating-branding";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} Udaipur | Jain Wedding Venue, Rooms & Dharamshala`,
    template: `%s | ${siteConfig.name}`,
  },

  description:
    "Mahapragya Vihar Bhuwana Udaipur offers Jain wedding venue, engagement hall, family rooms, guest stay, pravachan hall and peaceful accommodation for visitors from all over India.",

  keywords: [
    "Mahapragya Vihar Udaipur",
    "Mahapragya Vihar Bhuwana",
    "Jain wedding venue Udaipur",
    "Jain marriage hall Rajasthan",
    "Jain wedding destination India",
    "Jain community wedding hall",
    "Jain dharamshala Udaipur",
    "Rooms in Udaipur for wedding guests",
    "Wedding hall Bhuwana Udaipur",
    "Engagement hall Udaipur",
    "Pravachan hall Udaipur",
    "Group stay Udaipur",
    "Family stay Udaipur",
    "Best Jain venue in Udaipur",
    "Terapanth Jain venue Udaipur",
    "Jain samaj function hall Rajasthan",
    "Stay for wedding guests Udaipur",
    "Marriage venue near Udaipur",
  ],

  authors: [
    {
      name: "Gauransh Jaroli",
      url: "https://parshwebcraft.in",
    },
  ],

  creator: "Gauransh Jaroli",
  publisher: "ParshWebCraft",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: "/icon?size=512",
    apple: "/apple-icon",
  },

  openGraph: {
    title: `${siteConfig.name} | Jain Wedding Venue & Rooms in Udaipur`,
    description:
      "Premium Jain wedding venue, guest rooms, pravachan hall and peaceful stay in Bhuwana, Udaipur.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} Udaipur`,
    description: "Jain wedding venue, rooms and event space in Udaipur.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Wedding Venue, Rooms & Hospitality",
};

export default function RootLayout({
  children,
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

        {/* Floating Branding */}
        <FloatingBranding />

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: siteConfig.name,
              url: siteConfig.url,
              description:
                "Jain wedding venue, rooms, family stay and spiritual accommodation in Udaipur.",
              telephone: siteConfig?.contact?.phone,
              email: siteConfig?.contact?.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bhuwana",
                addressLocality: "Udaipur",
                addressRegion: "Rajasthan",
                postalCode: "313001",
                addressCountry: "IN",
              },
              areaServed: "India",
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Wedding Hall",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Guest Rooms",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Jain Community Events",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Pravachan Hall",
                  value: true,
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
