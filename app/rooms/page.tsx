import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Snowflake, BedDouble, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RoomsPage() {
  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Rooms Booking
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          50 Comfortable Rooms in Udaipur
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar offers 36 AC Rooms and 14 Non-AC Rooms for families,
          wedding guests, spiritual stays and group visits in Bhuwana, Udaipur.
        </p>
      </div>

      {/* Booking Search */}
      <div className="mt-10 rounded-3xl border bg-white/80 p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-accent">
              Check In
            </label>
            <input
              type="date"
              className="w-full rounded-2xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-accent">
              Check Out
            </label>
            <input
              type="date"
              className="w-full rounded-2xl border px-4 py-3 outline-none"
            />
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
      </div>

      {/* Summary */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border p-6 bg-white/70">
          <h2 className="text-2xl font-heading text-accent">50 Total Rooms</h2>
          <p className="mt-2 text-muted-foreground">
            Spacious stay options for all visitors.
          </p>
        </div>

        <div className="rounded-3xl border p-6 bg-white/70">
          <h2 className="text-2xl font-heading text-accent">36 AC Rooms</h2>
          <p className="mt-2 text-muted-foreground">
            Comfortable air-conditioned premium rooms.
          </p>
        </div>

        <div className="rounded-3xl border p-6 bg-white/70">
          <h2 className="text-2xl font-heading text-accent">14 Non-AC Rooms</h2>
          <p className="mt-2 text-muted-foreground">
            Budget-friendly peaceful stay rooms.
          </p>
        </div>
      </div>

      {/* Room Cards */}
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {/* Deluxe AC */}
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="relative h-72 w-full">
            <Image
              src="/room-1.jpg"
              alt="Deluxe AC Room"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-heading text-accent">
              Deluxe AC Room
            </h2>

            <p className="mt-3 text-muted-foreground">
              Spacious premium room with air conditioning, attached bathroom,
              clean interiors and peaceful stay.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border px-3 py-1">
                <Snowflake className="mr-1 inline h-4 w-4" />
                AC
              </span>

              <span className="rounded-full border px-3 py-1">
                <BedDouble className="mr-1 inline h-4 w-4" />
                Double Bed
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-2xl font-semibold text-accent">
                ₹2,000 / night
              </p>

              <Link href="/login">
                <Button>Book Now</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Standard Non AC */}
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="relative h-72 w-full">
            <Image
              src="/room-2.JPG"
              alt="Standard Non AC Room"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-heading text-accent">
              Standard Non-AC Room
            </h2>

            <p className="mt-3 text-muted-foreground">
              Comfortable and budget-friendly room for peaceful stay, family
              visits and wedding guest accommodation.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border px-3 py-1">
                <Wind className="mr-1 inline h-4 w-4" />
                Ventilated
              </span>

              <span className="rounded-full border px-3 py-1">
                <BedDouble className="mr-1 inline h-4 w-4" />
                Double Bed
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-2xl font-semibold text-accent">
                ₹1,500 / night
              </p>

              <Link href="/login">
                <Button variant="secondary">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
