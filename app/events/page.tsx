import Link from "next/link";
import {
  HeartHandshake,
  Building2,
  Music,
  Users,
  PhoneCall
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Events & Celebrations
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          Wedding, Functions & Special Events in Udaipur
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar offers a peaceful and spacious venue in Bhuwana,
          Udaipur for weddings, engagements, family functions, spiritual
          gatherings and community programs.
        </p>
      </div>

      {/* Event Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl p-6">
          <HeartHandshake className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Wedding Events
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ideal venue for marriage functions and guest stay.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Users className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Engagements
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Elegant space for ring ceremony and family gatherings.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Music className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Social Functions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Birthday, celebrations and cultural programs.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Building2 className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Community Events
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Meetings, pravachan and samaj events.
          </p>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-14 rounded-3xl border bg-white/80 p-8">
        <h2 className="text-3xl font-heading text-accent">
          Need Event Booking Assistance?
        </h2>

        <p className="mt-3 text-muted-foreground">
          For wedding booking, hall availability, guest stay or event inquiry,
          contact our management team directly.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/contact">
            <Button size="lg">Contact Team</Button>
          </Link>

          <a href="tel:+917733992007">
            <Button variant="secondary" size="lg">
              <PhoneCall className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}