import { findAvailableSpaces } from "@/services/booking";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const eventTypes = ["wedding", "engagement", "corporate", "pravachan", "music"] as const;

export default function EventsPage() {
  const spaces = findAvailableSpaces({
    bookingType: "full_day_event",
    eventType: "wedding"
  });

  return (
    <main className="section-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Event Engine</p>
          <h1 className="mt-3 font-heading text-5xl text-accent">Host weddings, pravachans, and celebrations.</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-accent/15 bg-white/70 px-4 py-2 text-sm capitalize text-foreground"
              >
                {type}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-8 text-muted-foreground">
            Event bookings support hourly reservations, full-day venue bookings, or an all-inclusive
            wedding package with admin approval before final confirmation.
          </p>
          <Button className="mt-8">Request venue booking</Button>
        </Card>
        <div className="grid gap-5 md:grid-cols-2">
          {spaces.map((space) => (
            <Card key={space.id}>
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-2xl text-accent">{space.name}</h2>
                <span className="rounded-full bg-primary/60 px-3 py-1 text-xs uppercase text-accent">
                  {space.type}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Capacity {space.capacity} | Quote from ₹
                {space.quotedPrice.toLocaleString("en-IN")}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
