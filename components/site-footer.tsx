import Link from "next/link";
import Image from "next/image";
import { Sparkles, MessageCircle, Globe } from "lucide-react";

import { footerLinks, contactDetails } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";
import { PwaInstallButton } from "@/components/pwa-install-button";

export function SiteFooter() {
  const whatsappNumber = contactDetails.phone.replace(/\D/g, "");
  const mapCoordinates = "24.6106595,73.7074572";
  const googleMapsUrl = `https://www.google.com/maps?q=${mapCoordinates}`;
  const embedUrl = `https://maps.google.com/maps?q=${mapCoordinates}&z=16&output=embed`;

  return (
    <footer className="border-t border-white/40 bg-white/70">
      <div className="section-shell py-6">
        <div className="rounded-[34px] border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur-xl md:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">

            {/* Left */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-accent/10 bg-white shadow-sm">
                  <Image
                    src="/TS.png"
                    alt="Mahapragya Vihar logo"
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                </div>
                <p className="font-heading text-2xl text-accent">
                  {siteConfig.name}
                </p>
              </div>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                50 fully air-conditioned rooms in Bhuwana, Udaipur. Ideal for wedding guests, family stay and group bookings.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-accent/10 bg-primary/35 px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Luxury AC Rooms • Wedding Stay</span>
              </div>

              <div className="pt-2">
                <PwaInstallButton />
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent/70">
                Quick Links
              </p>

              <div className="mt-4 grid gap-3 text-sm">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/75 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent/70">
                Contact
              </p>

              <div className="mt-4 grid gap-3 text-sm leading-6 text-foreground/75">
                <p className="max-w-sm">{contactDetails.address}</p>

                {/* Clickable phone */}
                <a className="block hover:text-accent" href={`tel:${contactDetails.phone}`}>
                  {contactDetails.phone}
                </a>

                {/* Clickable email */}
                <a className="block break-all hover:text-accent" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>

                {/* WhatsApp CTA (STRONG) */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello,%20I%20want%20to%20book%20rooms%20at%20Mahapragya%20Vihar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block w-fit"
                >
                  <button className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700">
                    Chat on WhatsApp
                  </button>
                </a>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 block overflow-hidden rounded-2xl border border-accent/10 bg-white shadow-sm"
                  aria-label="Open Mahapragya Bhavan location in Google Maps"
                >
                  <div className="relative h-44">
                    <iframe
                      title="Mahapragya Bhavan location map"
                      src={embedUrl}
                      className="h-full w-full pointer-events-none"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-accent/90 px-4 py-2 text-xs font-semibold text-accent-foreground">
                      Mahapragya Bhavan - Open in Google Maps
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Branding Footer */}
          <div className="mt-8 border-t border-accent/10 pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-sm font-semibold text-accent">
                  Developed by Gauransh Jaroli | ParshWebCraft
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Websites • Booking Systems • SaaS • SEO
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <a
                  href="https://parshwebcraft.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-accent hover:bg-primary/30"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                </a>

                <a
                  href="https://wa.me/919521347419?text=Hi%20I%20want%20a%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hire Me
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
