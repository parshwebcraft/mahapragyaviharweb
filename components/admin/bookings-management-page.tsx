"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { BookingStatus, RoomBooking } from "@/lib/booking-store";

const emptyBooking: RoomBooking = {
  id: "",
  guestName: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  roomCount: 1,
  roomType: "AC Rooms",
  roomAssigned: "Pending",
  notes: "",
  status: "pending",
  createdAt: "",
  updatedAt: ""
};

export function BookingsManagementPage() {
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [editing, setEditing] = useState<RoomBooking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadBookings() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load bookings.");
      setBookings(await response.json());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load bookings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function saveBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;

    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: editing.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Booking could not be saved.");

      const booking = result.booking as RoomBooking;
      setBookings((current) => [booking, ...current.filter((item) => item.id !== booking.id)]);
      setEditing(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Booking could not be saved.");
    }
  }

  async function deleteBooking(id: string) {
    try {
      const response = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error("Booking could not be deleted.");
      setBookings((current) => current.filter((booking) => booking.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Booking could not be deleted.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={loadBookings} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        <Button onClick={() => setEditing({ ...emptyBooking })}>
          <Plus className="mr-2 h-4 w-4" />
          Create booking
        </Button>
      </div>

      {error && <Card className="p-4 text-sm text-red-600">{error}</Card>}

      <div className="grid gap-4 xl:grid-cols-3">
        {!loading && bookings.length === 0 && (
          <Card className="p-6 text-sm text-muted-foreground xl:col-span-3">
            No bookings yet. Click Create booking to add this month&apos;s confirmed or pending booking.
          </Card>
        )}

        {bookings.map((booking) => (
          <Card key={booking.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-heading text-accent">{booking.guestName}</p>
                <p className="text-sm text-muted-foreground">{booking.id}</p>
              </div>
              <StatusBadge value={booking.status} />
            </div>

            <div className="mt-4 grid gap-2 text-sm">
              <p><b>Phone:</b> {booking.phone}</p>
              <p><b>Stay:</b> {booking.checkIn} to {booking.checkOut}</p>
              <p><b>Rooms:</b> {booking.roomCount}</p>
              <p><b>Assigned:</b> {booking.roomAssigned}</p>
              <p><b>Type:</b> {booking.roomType}</p>
            </div>

            {booking.notes && <p className="mt-3 text-sm text-muted-foreground">{booking.notes}</p>}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <a href={`https://wa.me/${booking.phone}`} target="_blank" rel="noreferrer">
                <Button className="w-full bg-green-600 px-3 text-white hover:bg-green-700" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </a>
              <Button size="sm" variant="outline" className="px-3" onClick={() => setEditing(booking)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="px-3" onClick={() => deleteBooking(booking.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-[920px] w-full text-left text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Check-in</th>
              <th className="px-4 py-3">Check-out</th>
              <th className="px-4 py-3">Rooms</th>
              <th className="px-4 py-3">Room assigned</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td className="px-4 py-5 text-muted-foreground" colSpan={6}>No booking data yet.</td>
              </tr>
            )}

            {bookings.map((booking) => (
              <tr key={`${booking.id}-row`} className="border-t bg-white/60">
                <td className="px-4 py-3 font-medium text-accent">{booking.guestName}</td>
                <td className="px-4 py-3">{booking.checkIn}</td>
                <td className="px-4 py-3">{booking.checkOut}</td>
                <td className="px-4 py-3">{booking.roomCount}</td>
                <td className="px-4 py-3">{booking.roomAssigned}</td>
                <td className="px-4 py-3"><StatusBadge value={booking.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-accent/20 p-4">
          <Card className="w-full max-w-3xl bg-white p-6">
            <h2 className="text-2xl font-heading text-accent">{editing.id ? "Edit booking" : "Create booking"}</h2>
            <form onSubmit={saveBooking} className="mt-5 grid gap-4 md:grid-cols-2">
              <Input value={editing.guestName} onChange={(event) => setEditing({ ...editing, guestName: event.target.value })} placeholder="Guest name" required />
              <Input value={editing.phone} onChange={(event) => setEditing({ ...editing, phone: event.target.value })} placeholder="Phone / WhatsApp" required />
              <Input type="date" value={editing.checkIn} onChange={(event) => setEditing({ ...editing, checkIn: event.target.value })} required />
              <Input type="date" value={editing.checkOut} onChange={(event) => setEditing({ ...editing, checkOut: event.target.value })} required />
              <Input type="number" min={1} max={50} value={editing.roomCount} onChange={(event) => setEditing({ ...editing, roomCount: Number(event.target.value) })} required />
              <Input value={editing.roomAssigned} onChange={(event) => setEditing({ ...editing, roomAssigned: event.target.value })} placeholder="AC-01, AC-02 or Pending" />
              <Input value={editing.roomType} onChange={(event) => setEditing({ ...editing, roomType: event.target.value })} placeholder="Room type / venue type" />
              <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as BookingStatus })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <textarea value={editing.notes} onChange={(event) => setEditing({ ...editing, notes: event.target.value })} placeholder="Notes" rows={3} className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm md:col-span-2" />
              <div className="flex gap-3 md:col-span-2">
                <Button type="submit" className="flex-1">Save booking</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
