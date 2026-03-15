import { findAvailableRooms } from "@/services/booking";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookPage() {
  const rooms = findAvailableRooms({
    checkin: "2026-03-20",
    checkout: "2026-03-23",
    guests: 2
  }).slice(0, 6);

  return (
    <main className="section-shell py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Booking Flow</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">Select your stay, pay online, and receive instant confirmation.</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl text-accent">{room.room_number}</h2>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs text-accent">
                {room.room_type}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {room.pricing.nights} nights | Total ₹
              {Math.round(room.pricing.total).toLocaleString("en-IN")}
            </p>
            <Button className="mt-6 w-full">Reserve with Razorpay</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
