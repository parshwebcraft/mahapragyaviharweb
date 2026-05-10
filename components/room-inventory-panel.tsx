"use client";

import { BedDouble, Brush, CheckCircle2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoomInventory } from "@/lib/room-inventory";
import type { RoomStatus } from "@/lib/site-content";

const statusCopy: Record<RoomStatus, string> = {
  empty: "Vacant",
  occupied: "Occupied",
  maintenance: "Maintenance"
};

const statusClass: Record<RoomStatus, string> = {
  empty: "border-green-200 bg-green-50 text-green-800",
  occupied: "border-amber-200 bg-amber-50 text-amber-800",
  maintenance: "border-red-200 bg-red-50 text-red-800"
};

export default function RoomInventoryPanel() {
  const { rooms, ready, updateRoom, setAllRooms, resetRooms } = useRoomInventory();

  const empty = rooms.filter((room) => room.status === "empty").length;
  const occupied = rooms.filter((room) => room.status === "occupied").length;
  const maintenance = rooms.filter((room) => room.status === "maintenance").length;

  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent/70">Live Room Status</p>
          <h2 className="mt-2 text-3xl font-heading text-accent">Reception room board</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setAllRooms("empty")}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            All Vacant
          </Button>
          <Button variant="outline" onClick={resetRooms}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <CheckCircle2 className="h-6 w-6 text-green-700" />
          <p className="mt-3 text-sm text-muted-foreground">Vacant rooms</p>
          <p className="mt-1 text-4xl font-heading text-accent">{empty}</p>
        </Card>

        <Card className="p-5">
          <BedDouble className="h-6 w-6 text-amber-700" />
          <p className="mt-3 text-sm text-muted-foreground">Occupied rooms</p>
          <p className="mt-1 text-4xl font-heading text-accent">{occupied}</p>
        </Card>

        <Card className="p-5">
          <Brush className="h-6 w-6 text-red-700" />
          <p className="mt-3 text-sm text-muted-foreground">Maintenance rooms</p>
          <p className="mt-1 text-4xl font-heading text-accent">{maintenance}</p>
        </Card>
      </div>

      <Card className="mt-6 p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room) => (
            <div key={room.id} className="rounded-2xl border bg-white/75 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-accent">{room.room_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {room.room_type} · {room.capacity} guests · ₹{room.price}
                  </p>
                </div>

                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[room.status]}`}>
                  {statusCopy[room.status]}
                </span>
              </div>

              <input
                value={room.note}
                onChange={(event) => updateRoom(room.id, { note: event.target.value })}
                className="mt-3 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent/40"
                aria-label={`${room.room_number} note`}
              />

              <div className="mt-3 grid grid-cols-3 gap-2">
                {(["empty", "occupied", "maintenance"] as RoomStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateRoom(room.id, { status })}
                    className={`rounded-full border px-2 py-2 text-xs font-semibold transition ${
                      room.status === status ? statusClass[status] : "border-border bg-white text-muted-foreground"
                    }`}
                  >
                    {statusCopy[status]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!ready && <p className="mt-4 text-sm text-muted-foreground">Loading saved room status...</p>}
      </Card>
    </section>
  );
}
