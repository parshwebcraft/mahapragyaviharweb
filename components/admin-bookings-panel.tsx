"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, CalendarDays, RefreshCw, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { RoomBooking } from "@/lib/booking-store";

type BookingFilter = "upcoming" | "today" | "all";

function todayIsoDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function AdminBookingsPanel() {
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [filter, setFilter] = useState<BookingFilter>("upcoming");
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", { cache: "no-store" });
      if (response.ok) {
        setBookings(await response.json());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const today = todayIsoDate();

  const filteredBookings = useMemo(() => {
    if (filter === "today") {
      return bookings.filter((booking) => booking.checkIn <= today && booking.checkOut > today);
    }

    if (filter === "upcoming") {
      return bookings.filter((booking) => booking.checkOut >= today);
    }

    return bookings;
  }, [bookings, filter, today]);

  const summary = useMemo(() => {
    const activeToday = bookings.filter((booking) => booking.checkIn <= today && booking.checkOut > today);
    const upcoming = bookings.filter((booking) => booking.checkOut >= today);

    return {
      todayRooms: activeToday.reduce((total, booking) => total + booking.roomCount, 0),
      upcomingRooms: upcoming.reduce((total, booking) => total + booking.roomCount, 0),
      upcomingBookings: upcoming.length
    };
  }, [bookings, today]);

  const dateTotals = useMemo(() => {
    const totals = new Map<string, number>();

    filteredBookings.forEach((booking) => {
      totals.set(booking.checkIn, (totals.get(booking.checkIn) || 0) + booking.roomCount);
    });

    return Array.from(totals.entries())
      .sort(([first], [second]) => first.localeCompare(second))
      .slice(0, 8);
  }, [filteredBookings]);

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent/70">Room Booking Data</p>
          <h2 className="mt-2 text-3xl font-heading text-accent">Quick booking overview</h2>
        </div>

        <Button variant="outline" onClick={loadBookings} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <CalendarCheck className="h-6 w-6 text-accent" />
          <p className="mt-3 text-sm text-muted-foreground">Rooms booked today</p>
          <p className="mt-1 text-4xl font-heading text-accent">{summary.todayRooms}</p>
        </Card>

        <Card className="p-5">
          <Users className="h-6 w-6 text-accent" />
          <p className="mt-3 text-sm text-muted-foreground">Upcoming rooms</p>
          <p className="mt-1 text-4xl font-heading text-accent">{summary.upcomingRooms}</p>
        </Card>

        <Card className="p-5">
          <CalendarDays className="h-6 w-6 text-accent" />
          <p className="mt-3 text-sm text-muted-foreground">Upcoming bookings</p>
          <p className="mt-1 text-4xl font-heading text-accent">{summary.upcomingBookings}</p>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {(["upcoming", "today", "all"] as BookingFilter[]).map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={filter === value ? "default" : "outline"}
            onClick={() => setFilter(value)}
          >
            {value === "upcoming" ? "Upcoming" : value === "today" ? "Today" : "All"}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-5">
          <h3 className="text-xl font-heading text-accent">Rooms by check-in date</h3>
          <div className="mt-4 grid gap-3">
            {dateTotals.length === 0 && <p className="text-sm text-muted-foreground">No booking data yet.</p>}

            {dateTotals.map(([date, total]) => (
              <div key={date} className="flex items-center justify-between rounded-2xl border bg-white/70 px-4 py-3">
                <span className="font-medium">{formatDate(date)}</span>
                <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                  {total} rooms
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xl font-heading text-accent">Booking requests</h3>
          <div className="mt-4 grid max-h-[520px] gap-3 overflow-auto pr-1">
            {loading && <p className="text-sm text-muted-foreground">Loading bookings...</p>}

            {!loading && filteredBookings.length === 0 && (
              <p className="text-sm text-muted-foreground">No bookings in this view.</p>
            )}

            {filteredBookings.map((booking) => (
              <div key={booking.id} className="rounded-2xl border bg-white/75 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-accent">{booking.guestName}</p>
                    <p className="text-sm text-muted-foreground">{booking.phone}</p>
                  </div>
                  <span className="w-fit rounded-full border border-accent/20 px-3 py-1 text-sm font-semibold text-accent">
                    {booking.roomCount} rooms
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <p>
                    <b className="text-foreground">In:</b> {formatDate(booking.checkIn)}
                  </p>
                  <p>
                    <b className="text-foreground">Out:</b> {formatDate(booking.checkOut)}
                  </p>
                  <p>
                    <b className="text-foreground">Type:</b> {booking.roomType}
                  </p>
                  <p>
                    <b className="text-foreground">Saved:</b>{" "}
                    {new Date(booking.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {booking.notes && <p className="mt-3 text-sm text-muted-foreground">{booking.notes}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
