"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const WHATSAPP_NUMBER = "919414165894";

const roomTypes = [
  "Luxury AC Room",
  "Family AC Room",
  "Wedding Guest Group Booking",
  "Event Stay Booking"
];

export function BookingForm() {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [roomType, setRoomType] = useState(roomTypes[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const whatsappMessage = useMemo(
    () => `Hello, I want to book rooms at Mahapragya Vihar Udaipur.
Name: ${guestName}
Phone: ${phone}
Check-in: ${checkIn}
Check-out: ${checkOut}
Rooms: ${roomCount}
Room type: ${roomType}
Notes: ${notes || "None"}`,
    [checkIn, checkOut, guestName, notes, phone, roomCount, roomType]
  );

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!guestName || !phone || !checkIn || !checkOut) {
      setError("Please fill guest name, phone, check-in and check-out.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          phone,
          checkIn,
          checkOut,
          roomCount,
          roomType,
          notes
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Booking request could not be saved.");
      }

      setSuccess("Booking request saved in admin panel as pending.");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Booking request could not be saved.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto mt-12 max-w-5xl p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent/70">Room Request</p>
          <h2 className="mt-2 text-3xl font-heading text-accent">Send booking inquiry</h2>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/75 px-4 py-2 text-sm text-accent">
          <CalendarDays className="h-4 w-4" />
          Admin will create booking after confirmation
        </div>
      </div>

      <form onSubmit={submitBooking} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Guest Name
          <Input value={guestName} onChange={(event) => setGuestName(event.target.value)} required />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Phone / WhatsApp
          <Input value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Check In
          <Input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} required />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Check Out
          <Input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} required />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Rooms Required
          <Input
            type="number"
            min={1}
            max={50}
            value={roomCount}
            onChange={(event) => setRoomCount(Number(event.target.value))}
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Room Type
          <select
            value={roomType}
            onChange={(event) => setRoomType(event.target.value)}
            className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm outline-none focus:border-accent/40"
          >
            {roomTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium md:col-span-2">
          Notes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-accent/40"
            placeholder="Example: family stay, wedding group, extra mattress, arrival time"
          />
        </label>

        {error && <p className="text-sm font-medium text-red-600 md:col-span-2">{error}</p>}
        {success && <p className="text-sm font-medium text-green-700 md:col-span-2">{success}</p>}

        <Button type="submit" size="lg" className="md:col-span-2" disabled={submitting}>
          <MessageCircle className="mr-2 h-4 w-4" />
          {submitting ? "Saving Request..." : "Send WhatsApp Inquiry"}
        </Button>
      </form>
    </Card>
  );
}
