"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const team = [
  {
    role: "Adhyaksh (President)",
    name: "Kamal Ji Nahata",
    phone: "919876543210"
  },
  {
    role: "Mahamantri",
    name: "Abhishek Ji Pokharna",
    phone: "919812345678"
  },
  {
    role: "Mantri",
    name: "To be updated",
    phone: ""
  },
  {
    role: "Treasurer",
    name: "To be updated",
    phone: ""
  },
  {
    role: "IT Team Lead",
    name: "Gauransh Jaroli",
    phone: "919521347419"
  }
];

export default function ContactPage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const message = `Hello, I want to book rooms at Mahapragya Vihar Udaipur.
Check-in: ${checkIn}
Check-out: ${checkOut}`;

    const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };


  const WATSAPP_NUMBER = "919876543210";

  async function handleWedding() {
    await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify({
        type: "wedding_inquiry"
      })
    });

    const msg =
      "Hello, I want to inquire about wedding booking at Mahapragya Vihar Udaipur.";

    window.open(
      `https://wa.me/${WATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  async function handleRoomBooking() {
    if (!checkIn || !checkOut) {
      alert("Select dates first");
      return;
    }

    await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify({
        type: "room_booking",
        checkIn,
        checkOut
      })
    });

    const msg = `Hello, I want to book rooms.
Check-in: ${checkIn}
Check-out: ${checkOut}`;

    window.open(
      `https://wa.me/${WATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }


  return (
    <main className="section-shell py-16">
      <h1 className="text-5xl font-heading text-accent">
        Contact & Booking
      </h1>

      {/* Wedding */}
      <Card className="mt-10 p-6 rounded-3xl">
        <h2 className="text-2xl font-heading text-accent">
          Wedding Inquiry
        </h2>

        <Button onClick={handleWedding} className="mt-4">
          WhatsApp Wedding Inquiry
        </Button>
      </Card>

      {/* Rooms */}
      <Card className="mt-6 p-6 rounded-3xl">
        <h2 className="text-2xl font-heading text-accent">
          Room Booking
        </h2>

        <div className="mt-4 flex gap-4">
          <input
            type="date"
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-2 rounded"
          />

          <Button onClick={handleRoomBooking}>
            Book Rooms
          </Button>
        </div>
      </Card>
    </main>
  );
}
