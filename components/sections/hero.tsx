import Link from "next/link";
import { CalendarDays, Landmark, Sparkles, Trees } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const highlights = [
  { icon: CalendarDays, label: "Instant room allocation" },
  { icon: Landmark, label: "Wedding & pravachan venues" },
  { icon: Trees, label: "Garden + kitchen reservations" },
  { icon: Sparkles, label: "Luxury Jain palace aesthetics" }
];

export function HeroSection() {
  return (
    <section className="section-shell relative py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-accent/15 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.32em] text-accent">
            Premium Spiritual Stay & Celebration Platform
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-heading text-5xl leading-tight text-accent md:text-7xl">
              Book sacred hospitality with luxury-level convenience.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Discover 36 serene rooms, elegant halls, lush garden events, and curated
              wedding packages designed for Mahapragya Vihar’s Jain spiritual campus.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/book">
              <Button size="lg">Book Rooms</Button>
            </Link>
            <Link href="/events">
              <Button variant="secondary" size="lg">
                Explore Event Spaces
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/65 p-4 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/55 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-aura" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent/80">
                Signature Experience
              </p>
              <h2 className="mt-3 max-w-md font-heading text-3xl leading-tight text-accent">
                Weddings, retreats, and stays wrapped in stillness and ceremony.
              </h2>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[26px] bg-accent p-6 text-accent-foreground shadow-soft">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Wedding Package</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="font-heading text-4xl">₹2.8L</p>
                    <p className="mt-1 text-sm text-accent-foreground/80">
                      Hall, garden, kitchen, and 12 premium rooms
                    </p>
                  </div>
                  <p className="rounded-full bg-white/10 px-4 py-2 text-xs">Custom quote</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-accent/10 bg-white/75 p-5">
                  <p className="text-sm text-muted-foreground">Available Rooms</p>
                  <p className="mt-2 font-heading text-4xl text-accent">36</p>
                </div>
                <div className="rounded-[24px] border border-accent/10 bg-white/75 p-5">
                  <p className="text-sm text-muted-foreground">Event Spaces</p>
                  <p className="mt-2 font-heading text-4xl text-accent">5</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
