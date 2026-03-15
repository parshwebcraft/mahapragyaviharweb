import { rooms } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

export default function RoomsPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Rooms</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">36 restful rooms, split between AC and Non-AC.</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl text-accent">{room.room_number}</h2>
              <span className="rounded-full bg-primary/60 px-3 py-1 text-xs text-accent">
                {room.room_type}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Capacity {room.capacity} | ₹{room.price.toLocaleString("en-IN")} nightly base
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {room.amenities.join(" • ")}
            </p>
          </Card>
        ))}
      </div>
    </main>
  );
}
