"use client";

import Image from "next/image";
import { BedDouble, Building2, CalendarDays, MapPin, MessageCircle, PhoneCall, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const venues = [
  {
    title: "Pravachan Hall",
    image: "/WhatsApp Image 2026-05-10 at 11.18.10.jpeg",
    capacity: "Spiritual programs & community gatherings",
    icon: Building2,
    details: [
      "Peaceful hall for pravachan and religious programs",
      "Suitable for Jain samaj events and satsang",
      "Clean campus support with direct management coordination"
    ]
  },
  {
    title: "Banquet Hall",
    image: "/room-1.jpg",
    capacity: "Wedding, engagement & family functions",
    icon: CalendarDays,
    details: [
      "Indoor function space for wedding ceremonies",
      "Ideal for engagement, reception and family events",
      "Booking details and arrangements discussed on call"
    ]
  },
  {
    title: "Mahashraman Sabhagar",
    image: "/WhatsApp Image 2026-05-10 at 11.18.10.jpeg",
    capacity: "Large sabha, meetings & cultural programs",
    icon: Users,
    details: [
      "Spacious sabhagar for large community gatherings",
      "Suitable for programs, meetings and formal events",
      "Team support available for planning and scheduling"
    ]
  },
  {
    title: "AC Rooms",
    image: "/room3.jpg",
    capacity: "Family stay & wedding guest accommodation",
    icon: BedDouble,
    details: [
      "50 fully air-conditioned rooms for comfortable stay",
      "Best for wedding guests, families and group bookings",
      "Room availability and pricing discussed directly"
    ]
  }
];

const nearbyPlaces = ["Fateh Sagar Lake", "City Palace", "Saheliyon Ki Bari"];

export default function VenuePage() {
  const whatsapp = "919829074922";

  function openWhatsApp(title: string) {
    const message = `Hello, I want details for ${title} booking at Mahapragya Vihar, Bhuwana Udaipur. Please share availability and charges.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <main className="section-shell py-16">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Venue & Rooms</p>
        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          Pravachan Hall, Banquet Hall, Mahashraman Sabhagar & AC Rooms
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar in Bhuwana, Udaipur offers peaceful event spaces and
          comfortable AC rooms for pravachan, weddings, family functions,
          community programs and group stay.
        </p>
      </div>

      <Card className="mt-10 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-heading text-accent">Booking charges on discussion</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Venue and room charges depend on dates, function type, guest count
              and required arrangements. Please call or WhatsApp for exact details.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="tel:+917733992007">
              <Button size="lg">
                <PhoneCall className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </a>
            <Button size="lg" className="bg-green-600 text-white hover:bg-green-700" onClick={() => openWhatsApp("venue and rooms")}>
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {venues.map((venue) => {
          const Icon = venue.icon;

          return (
            <Card key={venue.title} className="overflow-hidden p-0">
              <div className="relative h-72 w-full">
                <Image src={venue.image} alt={venue.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/18 backdrop-blur-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-3xl">{venue.title}</h2>
                  <p className="mt-1 text-sm text-white/82">{venue.capacity}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
                  {venue.details.map((detail) => (
                    <div key={detail} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="flex-1" onClick={() => openWhatsApp(venue.title)}>
                    Discuss Booking
                  </Button>
                  <a href="tel:+917733992007" className="flex-1">
                    <Button variant="secondary" className="w-full">
                      Call Details
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-heading text-accent">Why Choose Mahapragya Vihar?</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Venue + Stay", "Event spaces and AC rooms available on one peaceful campus."],
            ["Ideal for Jain Programs", "Suitable for pravachan, sabha, weddings and community functions."],
            ["Prime Bhuwana Location", "Convenient Udaipur location with easy access for guests."]
          ].map(([title, copy]) => (
            <Card key={title} className="p-5">
              <p className="font-semibold text-accent">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-heading text-accent">Nearby Places in Udaipur</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {nearbyPlaces.map((place) => (
            <Card key={place} className="p-5">
              <MapPin className="h-5 w-5 text-accent" />
              <p className="mt-2 font-medium">{place}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
