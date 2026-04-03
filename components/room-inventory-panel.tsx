"use client";

import { useMemo, useState } from "react";

import { useRoomInventory } from "@/lib/room-inventory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { RoomStatus } from "@/lib/site-content";

function statusClasses(status: RoomStatus) {
  if (status === "empty") return "bg-emerald-100 text-emerald-900";
  if (status === "occupied") return "bg-amber-100 text-amber-900";
  return "bg-rose-100 text-rose-900";
}

export function RoomInventoryPanel({ admin = false, previewLimit }: { admin?: boolean; previewLimit?: number }) {
  const { rooms, updateRoom, setAllRooms, resetRooms } = useRoomInventory();
  const [query, setQuery] = useState("");

  const filteredRooms = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const baseRooms = !admin && previewLimit ? rooms.slice(0, previewLimit) : rooms;
    if (!normalized) return baseRooms;

    return baseRooms.filter((room) => {
      return (
        room.room_number.toLowerCase().includes(normalized) ||
        room.room_type.toLowerCase().includes(normalized) ||
        room.status.toLowerCase().includes(normalized)
      );
    });
  }, [admin, previewLimit, query, rooms]);

  const emptyRooms = rooms.filter((room) => room.status === "empty").length;
  const occupiedRooms = rooms.filter((room) => room.status === "occupied").length;
  const maintenanceRooms = rooms.filter((room) => room.status === "maintenance").length;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <p className="text-sm text-muted-foreground">Total Rooms</p>
          <p className="mt-3 font-heading text-4xl text-accent">{rooms.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Empty Rooms</p>
          <p className="mt-3 font-heading text-4xl text-accent">{emptyRooms}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Occupied Rooms</p>
          <p className="mt-3 font-heading text-4xl text-accent">{occupiedRooms}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Maintenance</p>
          <p className="mt-3 font-heading text-4xl text-accent">{maintenanceRooms}</p>
        </Card>
      </div>

      <Card className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-accent/70">
              {admin ? "Admin Room Control" : "Room Availability"}
            </p>
            <h2 className="mt-3 font-heading text-3xl text-accent">
              {admin
                ? "Update room status manually from one place."
                : "See which rooms are empty, occupied, or under maintenance."}
            </h2>
          </div>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search room number, type, or status"
            className="lg:max-w-xs"
          />
        </div>

        {admin ? (
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setAllRooms("empty")}>
              Mark all empty
            </Button>
            <Button variant="secondary" onClick={() => setAllRooms("occupied")}>
              Mark all occupied
            </Button>
            <Button variant="secondary" onClick={() => setAllRooms("maintenance")}>
              Mark all maintenance
            </Button>
            <Button variant="outline" onClick={resetRooms}>
              Reset defaults
            </Button>
          </div>
        ) : null}
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl text-accent">{room.room_number}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {room.room_type} | Capacity {room.capacity}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses(room.status)}`}>
                {room.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">₹{room.price.toLocaleString("en-IN")} nightly base</p>
            <p className="text-sm leading-7 text-muted-foreground">{room.note}</p>

            {admin ? (
              <div className="space-y-3 border-t border-border pt-4">
                <label className="block text-sm font-medium text-foreground">Status</label>
                <select
                  value={room.status}
                  onChange={(event) =>
                    updateRoom(room.id, { status: event.target.value as RoomStatus })
                  }
                  className="h-11 w-full rounded-2xl border border-border bg-white/80 px-4 text-sm outline-none"
                >
                  <option value="empty">Empty</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>

                <label className="block text-sm font-medium text-foreground">Note</label>
                <textarea
                  value={room.note}
                  onChange={(event) => updateRoom(room.id, { note: event.target.value })}
                  className="min-h-24 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none"
                />
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </section>
  );
}
