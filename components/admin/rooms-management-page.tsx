"use client";

import { useMemo, useState } from "react";
import { Eye, Search, UserPlus } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { adminRooms, type AdminRoom, type AdminRoomStatus } from "@/lib/admin-mock-data";

const statuses: ("all" | AdminRoomStatus)[] = ["all", "available", "occupied", "reserved", "maintenance"];

export function RoomsManagementPage() {
  const [rooms, setRooms] = useState<AdminRoom[]>(adminRooms);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof statuses)[number]>("all");
  const [historyRoom, setHistoryRoom] = useState<AdminRoom | null>(null);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesFilter = filter === "all" || room.status === filter;
      const term = `${room.roomNumber} ${room.roomType} ${room.guestName}`.toLowerCase();
      return matchesFilter && term.includes(search.toLowerCase());
    });
  }, [filter, rooms, search]);

  function updateRoom(id: string, patch: Partial<AdminRoom>) {
    setRooms((current) => current.map((room) => (room.id === id ? { ...room, ...patch } : room)));
  }

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search room number, room type or guest"
              className="pl-11"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Button
                key={status}
                size="sm"
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
              >
                {status === "all" ? "All" : status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-2xl font-heading text-accent">{room.roomNumber}</p>
                <p className="text-sm text-muted-foreground">{room.roomType} · {room.occupancy} guests</p>
              </div>
              <StatusBadge value={room.status} />
            </div>

            <div className="mt-4 grid gap-3">
              <select
                value={room.status}
                onChange={(event) => updateRoom(room.id, { status: event.target.value as AdminRoomStatus })}
                className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm outline-none focus:border-accent/40"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>

              <Input
                value={room.guestName}
                onChange={(event) => updateRoom(room.id, { guestName: event.target.value })}
                placeholder="Guest name"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input type="date" value={room.checkIn} onChange={(event) => updateRoom(room.id, { checkIn: event.target.value })} />
                <Input type="date" value={room.checkOut} onChange={(event) => updateRoom(room.id, { checkOut: event.target.value })} />
              </div>

              <textarea
                value={room.notes}
                onChange={(event) => updateRoom(room.id, { notes: event.target.value })}
                className="min-h-20 rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-accent/40"
                placeholder="Room notes"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => updateRoom(room.id, { status: "occupied" })}>
                <UserPlus className="mr-2 h-4 w-4" />
                Assign
              </Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => setHistoryRoom(room)}>
                <Eye className="mr-2 h-4 w-4" />
                History
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">No rooms match this search.</Card>
      )}

      {historyRoom && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-accent/20 p-4">
          <Card className="w-full max-w-lg bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-heading text-accent">{historyRoom.roomNumber} history</h2>
                <p className="text-sm text-muted-foreground">{historyRoom.roomType}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setHistoryRoom(null)}>Close</Button>
            </div>
            <div className="mt-5 grid gap-3">
              {historyRoom.history.map((item) => (
                <div key={item} className="rounded-2xl border bg-secondary px-4 py-3 text-sm">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
