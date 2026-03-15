import type { Metadata } from "next";

import "./globals.css";

import { PwaRegister } from "@/components/pwa-register";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | Luxury Spiritual Stays & Event Booking`,
    template: `%s | ${siteConfig.name}`
  },

  description: siteConfig.description,

  keywords: [
    "Mahapragya Vihar Bhuwana Udaipur",
    "Jain Dharamshala Udaipur",
    "Udaipur wedding hall booking",
    "Bhuwana event venue",
    "Mahapragya Vihar rooms",
    "Pravachan hall Udaipur",
    "Jain accommodation Udaipur"
  ],

  authors: [
    {
      name: "Gauransh Jaroli",
      url: "https://parshwebcraft.in"
    }
  ],

  creator: "Gauransh Jaroli",
  publisher: "ParshWebCraft",

  manifest: "/manifest.json",

  icons: {
    icon: "/icon?size=512",
    apple: "/apple-icon"
  },

  openGraph: {
    title: `${siteConfig.name} | Luxury Spiritual Stays`,
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

  category: "Hotel Booking Platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />

        <div className="relative min-h-screen overflow-x-hidden">
          <SiteHeader />
          {children}
        </div>

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              creator: {
                "@type": "Person",
                name: "Gauransh Jaroli",
                worksFor: {
                  "@type": "Organization",
                  name: "ParshWebCraft"
                }
              }
            })
          }}
        />
      </body>
    </html>
  );
}
