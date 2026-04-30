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
  const WHATSAPP = "919829074922";

  const openWhatsApp = (message: string) => {
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Booking
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          Book Rooms & Wedding Venue in Udaipur
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          For room booking, wedding events and group stays, connect directly
          with our team for quick confirmation and best pricing.
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
            AC rooms for families, wedding guests and group stay.
          </p>

          <a
            href={openWhatsApp("Hello, I want to book rooms at Mahapragya Vihar Udaipur.")}
            target="_blank"
          >
            <Button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white">
              Book on WhatsApp
            </Button>
          </a>
        </Card>

        <Card className="rounded-3xl p-6 text-center">
          <HeartHandshake className="mx-auto h-10 w-10 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Wedding Booking
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Jain wedding venue, engagement and celebration functions.
          </p>

          <a
            href={openWhatsApp("Hello, I want to inquire about wedding booking at Mahapragya Vihar Udaipur.")}
            target="_blank"
          >
            <Button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white">
              Wedding Inquiry
            </Button>
          </a>
        </Card>

        <Card className="rounded-3xl p-6 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Event Booking
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Social, spiritual and community event reservations.
          </p>

          <a
            href={openWhatsApp("Hello, I want to book an event at Mahapragya Vihar Udaipur.")}
            target="_blank"
          >
            <Button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white">
              Book Event
            </Button>
          </a>
        </Card>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-14 max-w-3xl rounded-3xl border bg-white/80 p-8 text-center">
        <h2 className="text-3xl font-heading text-accent">
          Need Help? Talk Directly
        </h2>

        <p className="mt-3 text-muted-foreground">
          Get instant response on WhatsApp or call our reception team.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={openWhatsApp("Hello, I want booking details for Mahapragya Vihar Udaipur.")}
            target="_blank"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg">
              WhatsApp Now
            </Button>
          </a>

          <a href="tel:+917733992007">
            <Button variant="secondary" size="lg">
              <PhoneCall className="mr-2 h-4 w-4" />
              Call Reception
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}