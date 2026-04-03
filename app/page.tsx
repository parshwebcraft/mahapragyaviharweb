import Link from "next/link";
import { BedDouble, CircleHelp, Home, Images, PhoneCall } from "lucide-react";

import { HeroSection } from "@/components/sections/hero";
import { GallerySection } from "@/components/sections/gallery";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoomInventoryPanel } from "@/components/room-inventory-panel";
import { contactDetails, siteHighlights } from "@/lib/site-content";

const systemFeatures = [
  {
    icon: BedDouble,
    title: "Room overview",
    copy: "See how many rooms are empty, occupied, or under maintenance at a glance."
  },
  {
    icon: Images,
    title: "Gallery preview",
    copy: "A calm visual section with room and campus imagery for visitors."
  },
  {
    icon: PhoneCall,
    title: "Contact and support",
    copy: "Phone, email, and support pages keep visitor inquiries simple."
  },
  {
    icon: Home,
    title: "Static and fast",
    copy: "No booking flow, no payment stack, just a clean website experience."
  },
  {
    icon: CircleHelp,
    title: "Manual admin control",
    copy: "Admin can update room status manually and keep the public view current."
  }
];

export default function HomePage() {
  return (
    <main className="pb-24">
      <HeroSection />

      <section className="section-shell py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent/70">What is on this site</p>
            <h2 className="mt-3 font-heading text-4xl text-accent">Simple navigation for visitors and staff.</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {systemFeatures.map((feature) => (
            <Card key={feature.title} className="min-h-[220px]">
              <feature.icon className="h-10 w-10 text-accent" />
              <h3 className="mt-8 font-heading text-2xl text-accent">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-accent/70">About the site</p>
            <h2 className="font-heading text-4xl text-accent">Clear room info without the booking clutter.</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Visitors can browse rooms, view images, contact the property, and read the policy
              pages. The admin panel is for manual room availability updates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rooms">
                <Button>View Rooms</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary">Contact Us</Button>
              </Link>
            </div>
          </Card>
          <GallerySection />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Room availability</p>
          <h2 className="mt-3 font-heading text-4xl text-accent">Current room status summary.</h2>
        </div>
        <RoomInventoryPanel previewLimit={6} />
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {siteHighlights.map((item) => (
            <Card key={item}>
              <h3 className="font-heading text-2xl text-accent">{item}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Designed for a quick, simple, and useful visitor experience.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <Card>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Contact</p>
          <h2 className="mt-3 font-heading text-4xl text-accent">Need help? Reach out directly.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{contactDetails.address}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{contactDetails.phone}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{contactDetails.email}</p>
        </Card>
      </section>
    </main>
  );
}
