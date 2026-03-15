"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { autoAssignRoom } from "@/services/booking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function BookingPanel() {
  const [checkin, setCheckin] = useState("2026-03-20");
  const [checkout, setCheckout] = useState("2026-03-22");
  const [guests, setGuests] = useState(2);

  const assignedRoom = useMemo(
    () =>
      autoAssignRoom({
        checkin,
        checkout,
        guests
      }),
    [checkin, checkout, guests]
  );

  return (
    <Card className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Instant Search</p>
        <h2 className="mt-3 font-heading text-4xl text-accent">Search rooms with smart assignment.</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Check-in</label>
            <Input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Check-out</label>
            <Input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Guests</label>
            <Input
              min={1}
              max={6}
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="rounded-[28px] bg-accent p-6 text-accent-foreground shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Suggested Allocation</p>
        {assignedRoom ? (
          <>
            <h3 className="mt-4 font-heading text-3xl">{assignedRoom.room_number}</h3>
            <p className="mt-2 text-sm text-accent-foreground/80">
              {assignedRoom.room_type} room for {guests} guests
            </p>
            <p className="mt-6 text-sm">Estimated stay total</p>
            <p className="mt-1 font-heading text-4xl">
              ₹{Math.round(assignedRoom.pricing.total).toLocaleString("en-IN")}
            </p>
            <p className="mt-2 text-sm text-accent-foreground/80">
              {assignedRoom.pricing.nights} nights with smart weekday/weekend logic
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-accent-foreground/80">
            No matching room was found for the selected dates.
          </p>
        )}
        <Link href="/book" className="mt-6 inline-block">
          <Button variant="secondary">Continue to booking</Button>
        </Link>
      </div>
    </Card>
  );
}
