import Link from "next/link";
import {
  HeartHandshake,
  Building2,
  Music,
  Users,
  PhoneCall,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EventsPage() {
  const WHATSAPP = "919829074922";

  const wa = (msg: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Events & Celebrations
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          Jain Wedding & Event Venue in Udaipur
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar offers a peaceful and spacious Jain wedding venue in
          Bhuwana, Udaipur with 50 fully air-conditioned rooms for guest stay,
          making it ideal for complete wedding arrangements.
        </p>

        {/* TOP CTA */}
        <div className="mt-6">
          <a
            href={wa(
              "Hello, I want to inquire about wedding booking at Mahapragya Vihar Udaipur.",
            )}
            target="_blank"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              WhatsApp Wedding Inquiry
            </Button>
          </a>
        </div>
      </div>

      {/* Event Types */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl p-6">
          <HeartHandshake className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Wedding Events
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Perfect venue for Jain weddings with guest accommodation.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Users className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Engagements
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ideal for ring ceremony and close family celebrations.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Music className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Social Functions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cultural programs, birthday and private celebrations.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Building2 className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-heading text-accent">
            Community Events
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pravachan, samaj meetings and spiritual gatherings.
          </p>
        </Card>
      </div>
      {/* Guest Stay Section */}
      <div className="mt-14 rounded-3xl border bg-white/80 p-8">
        <h2 className="text-3xl font-heading text-accent">
          Stay for Wedding Guests
        </h2>

        <p className="mt-3 text-muted-foreground">
          50 fully air-conditioned rooms available for wedding guests and family
          stay. Ideal for group accommodation with peaceful environment.
        </p>

        <div className="mt-6 flex gap-4">
          <Link href="/rooms">
            <Button>View Rooms</Button>
          </Link>

          <a
            href={wa(
              "Hello, I want room booking for wedding guests at Mahapragya Vihar Udaipur.",
            )}
            target="_blank"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Book Rooms on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Card className="p-6 rounded-3xl">
          <h3 className="text-xl font-heading text-accent">
            Peaceful Jain Environment
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Clean, calm and spiritually aligned venue for family functions.
          </p>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h3 className="text-xl font-heading text-accent">Rooms for Guests</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            50 rooms available for wedding guests and group stays.
          </p>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h3 className="text-xl font-heading text-accent">
            Easy Management Support
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Direct coordination with management for smooth event execution.
          </p>
        </Card>
      </div>

      {/* MID CTA */}
      <div className="mt-12 text-center">
        <a
          href={wa(
            "Hello, I want details for wedding/event booking at Mahapragya Vihar Udaipur.",
          )}
          target="_blank"
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Check Availability on WhatsApp
          </Button>
        </a>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Rooms get booked quickly during wedding season
      </p>

      {/* FINAL CTA */}
      <div className="mt-14 rounded-3xl border bg-white/80 p-8">
        <h2 className="text-3xl font-heading text-accent">
          Plan Your Wedding with Stay Included
        </h2>

        <p className="mt-3 text-muted-foreground">
          Get pricing, availability and booking details directly from our team.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={wa(
              "Hello, I want to book an event at Mahapragya Vihar Udaipur.",
            )}
            target="_blank"
          >
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              WhatsApp Now
            </Button>
          </a>

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
