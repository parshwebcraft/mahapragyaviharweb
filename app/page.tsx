import Link from "next/link";
import { BedDouble, Sparkles, Home, Images, PhoneCall } from "lucide-react";

import { HeroSection } from "@/components/sections/hero";
import { GallerySection } from "@/components/sections/gallery";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contactDetails, siteHighlights } from "@/lib/site-content";

const highlights = [
  {
    icon: BedDouble,
    title: "50 Luxury AC Rooms",
    copy: "Fully air-conditioned rooms designed for comfortable stay for families and wedding guests.",
  },
  {
    icon: Sparkles,
    title: "Peaceful Stay",
    copy: "Clean surroundings with a calm and spiritual atmosphere.",
  },
  {
    icon: Images,
    title: "Wedding & Events",
    copy: "Perfect venue for weddings, engagements, pravachan and gatherings.",
  },
  {
    icon: Home,
    title: "Prime Bhuwana Location",
    copy: "Convenient location in Udaipur with easy access for visitors.",
  },
  {
    icon: PhoneCall,
    title: "Direct Assistance",
    copy: "Connect directly with our team for room booking and event support.",
  },
];

export default function HomePage() {
  return (
    <main className="pb-24">
      <HeroSection />

      {/* Highlights */}
      <section className="section-shell py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
            Why Choose Mahapragya Vihar
          </p>

          <h2 className="mt-3 font-heading text-4xl text-accent">
            Comfortable stay, events and peaceful environment in Udaipur
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {highlights.map((item) => (
            <Card key={item.title} className="min-h-[220px]">
              <item.icon className="h-10 w-10 text-accent" />

              <h3 className="mt-8 font-heading text-2xl text-accent">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.copy}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section-shell py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
              About Mahapragya Vihar
            </p>

            <h2 className="font-heading text-4xl text-accent">
              A trusted place for stay and special occasions
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              Mahapragya Vihar offers 50 luxury air-conditioned rooms, event spaces and a peaceful environment for families, wedding guests and spiritual visitors in Bhuwana, Udaipur.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/rooms">
                <Button>View Venue</Button>
              </Link>

              <Link href="/contact">
                <Button variant="secondary">Contact Us</Button>
              </Link>
            </div>
          </Card>

          <GallerySection />
        </div>
      </section>

      {/* Quick Info */}
      <section className="section-shell py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {siteHighlights.map((item) => (
            <Card key={item}>
              <h3 className="font-heading text-2xl text-accent">{item}</h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Quality service and a comfortable visitor experience.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="section-shell py-16">
        <Card>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
            Contact
          </p>

          <h2 className="mt-3 font-heading text-4xl text-accent">
            Need help? Contact us directly
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {contactDetails.address}
          </p>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {contactDetails.phone}
          </p>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {contactDetails.email}
          </p>
        </Card>
      </section>
    </main>
  );
}
