import Link from "next/link";
import {
  CalendarDays,
  BedDouble,
  HeartHandshake,
  PhoneCall
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BookPage() {
  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Booking
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          Room & Event Booking Assistance
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Online instant booking will be available soon. For now, room booking,
          wedding functions, guest stay and event reservations are handled
          directly by our management team.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        <Card className="rounded-3xl p-6 text-center">
          <BedDouble className="mx-auto h-10 w-10 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Room Booking
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            AC and Non-AC rooms for families, guests and peaceful stay.
          </p>
        </Card>

        <Card className="rounded-3xl p-6 text-center">
          <HeartHandshake className="mx-auto h-10 w-10 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Wedding Booking
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Venue booking for marriage, engagement and celebrations.
          </p>
        </Card>

        <Card className="rounded-3xl p-6 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Event Reservation
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Social, spiritual and community functions booking support.
          </p>
        </Card>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-14 max-w-3xl rounded-3xl border bg-white/80 p-8 text-center">
        <h2 className="text-3xl font-heading text-accent">
          Need Immediate Booking Help?
        </h2>

        <p className="mt-3 text-muted-foreground">
          Contact our reception or management team for availability, pricing and
          booking confirmation.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/rooms">
            <Button size="lg">View Rooms</Button>
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