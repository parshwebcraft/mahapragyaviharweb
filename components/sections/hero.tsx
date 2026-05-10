import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Images, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  { icon: CalendarDays, label: "Pravachan & banquet halls" },
  { icon: Images, label: "Venue & room gallery" },
  { icon: PhoneCall, label: "Bhuwana Udaipur contact" },
  { icon: Building2, label: "Jain stay & events" },
];

const heroImage = "/WhatsApp Image 2026-05-10 at 11.18.10.jpeg";

export function HeroSection() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="grid overflow-hidden rounded-[34px] border border-white/60 bg-white/76 shadow-soft backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
          <div className="inline-flex w-fit items-center rounded-full border border-accent/15 bg-primary/35 px-4 py-2 text-xs uppercase tracking-[0.32em] text-accent">
            Mahapragya Vihar • Bhuwana Udaipur
          </div>

          <h1 className="mt-6 font-heading text-5xl leading-tight text-accent md:text-6xl">
            Rooms, Jain Bhojanshala & Wedding Hall in Bhuwana, Udaipur
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Mahapragya Vihar offers luxury AC rooms, wedding halls, garden space
            and pravachan venue for family visits, spiritual programs and
            community events.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/rooms">
              <Button size="lg">Explore Venue</Button>
            </Link>
            <Link href="/events">
              <Button variant="secondary" size="lg">
                Book Event Space
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-accent/10 bg-secondary/70 p-4 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/65 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] lg:min-h-[650px]">
          <Image
            src={heroImage}
            alt="Mahapragya Vihar Udaipur venue"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
