import Link from "next/link";
import {
  BedDouble,
  Snowflake,
  Home,
  PhoneCall,
  Users,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RoomsPage() {
  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Rooms
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          50 Comfortable Rooms for Stay in Udaipur
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar offers peaceful AC and Non-AC rooms for families,
          wedding guests, spiritual visitors and group stays in Bhuwana,
          Udaipur.
        </p>
      </div>

      {/* Room Summary */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="rounded-3xl p-6">
          <BedDouble className="h-8 w-8 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            50 Total Rooms
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Spacious and clean stay options for all visitors.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Snowflake className="h-8 w-8 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            36 AC Rooms
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Premium air-conditioned rooms for comfortable stay.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Home className="h-8 w-8 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            14 Non-AC Rooms
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Budget-friendly rooms with peaceful environment.
          </p>
        </Card>
      </div>

      {/* Why Choose */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl p-6">
          <Users className="h-8 w-8 text-accent" />

          <h3 className="mt-4 text-2xl font-heading text-accent">
            Ideal for Families & Groups
          </h3>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Suitable for wedding guests, family visits, spiritual stays and
            group bookings.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <ShieldCheck className="h-8 w-8 text-accent" />

          <h3 className="mt-4 text-2xl font-heading text-accent">
            Safe & Peaceful Stay
          </h3>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Clean surroundings, calm environment and trusted management support.
          </p>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-3xl border bg-white/70 p-8">
        <h2 className="text-3xl font-heading text-accent">
          Need Room Booking Assistance?
        </h2>

        <p className="mt-3 text-muted-foreground">
          For room allotment, wedding guest stay or group booking, contact our
          reception team directly.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/contact">
            <Button size="lg">Contact Reception</Button>
          </Link>

          <a href="tel:+910000000000">
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