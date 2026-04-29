import Link from "next/link";
import { Sparkles, MessageCircle, Globe } from "lucide-react";

import { footerLinks, contactDetails } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";
import { PwaInstallButton } from "@/components/pwa-install-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/40 bg-white/70">
      <div className="section-shell py-6">
        <div className="rounded-[34px] border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            {/* Left */}
            <div className="space-y-4">
              <p className="font-heading text-2xl text-accent">
                {siteConfig.name}
              </p>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Comfortable rooms, event venue and peaceful stay destination in
                Bhuwana, Udaipur for families, guests and spiritual visitors.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-accent/10 bg-primary/35 px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Premium Visitor Experience</span>
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

              <div className="mt-4 space-y-3 text-sm text-foreground/75">
                <p>{contactDetails.address}</p>
                <p>{contactDetails.phone}</p>
                <p>{contactDetails.email}</p>
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
                  Website Development • Booking Systems • Branding • SEO
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
                  href="https://wa.me/919521347419?text=Hi%20Gauransh%20Jaroli,%20I%20need%20a%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-accent hover:bg-primary/30"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}