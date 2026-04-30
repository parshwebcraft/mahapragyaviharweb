import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Snowflake,
  Users,
  Wifi,
  Bath,
  ShieldCheck,
  CalendarDays,
  PhoneCall,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const rooms = [
  {
    title: "Deluxe AC Room",
    image: "/room-1.jpg",
    price: "₹2,000",
    guests: "2 Guests (Double Bed)",
    desc: "Comfortable air-conditioned room ideal for couples and wedding guests.",
  },
  {
    title: "Super Deluxe AC Room",
    image: "/room-2.JPG",
    price: "₹2,500",
    guests: "3–4 Guests (Double Bed Setup)",
    desc: "Spacious room perfect for families and group stay during weddings.",
  },
  {
    title: "Premium Family AC Room",
    image: "/room-1.jpg",
    price: "₹2,800",
    guests: "4 Guests (2 Double Beds)",
    desc: "Large luxury room designed for family comfort and group accommodation.",
  },
];

export default function RoomsPage() {
  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Rooms Booking
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          50 Fully AC Rooms in Udaipur for Wedding Guests
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          All rooms at Mahapragya Vihar are fully air-conditioned and designed
          for comfortable stay. Ideal for wedding guests, families and group
          bookings in Bhuwana, Udaipur.
        </p>
      </div>

      {/* Date Selection */}
      <Card className="mt-12 rounded-3xl p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Check In</label>
            <input type="date" className="w-full rounded-xl border px-4 py-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Check Out</label>
            <input type="date" className="w-full rounded-xl border px-4 py-3" />
          </div>

          <div className="flex items-end">
            <Link href="/login" className="w-full">
              <Button size="lg" className="w-full">
                <CalendarDays className="mr-2 h-4 w-4" />
                Login & Book
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Room Cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {rooms.map((room) => (
          <Card key={room.title} className="overflow-hidden rounded-3xl p-0">
            <div className="relative h-64 w-full">
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-heading text-accent">
                    {room.title}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {room.desc}
                  </p>
                </div>

                <p className="text-2xl font-bold text-accent">{room.price}</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Snowflake className="h-4 w-4" />
                  Fully AC
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  {room.guests}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="h-4 w-4" />
                  Free WiFi
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Bath className="h-4 w-4" />
                  Attached Bathroom
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/login" className="flex-1">
                  <Button className="w-full">Book Now</Button>
                </Link>

                <Link href="/contact" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Enquiry
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Why Stay */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Card className="rounded-3xl p-6">
          <BedDouble className="h-8 w-8 text-accent" />
          <h3 className="mt-4 text-2xl font-heading text-accent">
            50 AC Rooms
          </h3>
          <p className="mt-2 text-muted-foreground">
            Fully air-conditioned rooms designed for comfort and group stay.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <ShieldCheck className="h-8 w-8 text-accent" />
          <h3 className="mt-4 text-2xl font-heading text-accent">
            Safe & Trusted Stay
          </h3>
          <p className="mt-2 text-muted-foreground">
            Clean, peaceful and trusted environment for families.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <PhoneCall className="h-8 w-8 text-accent" />
          <h3 className="mt-4 text-2xl font-heading text-accent">
            Direct Booking Support
          </h3>
          <p className="mt-2 text-muted-foreground">
            Contact management team for instant booking help.
          </p>
        </Card>
      </div>
    </main>
  );
}
