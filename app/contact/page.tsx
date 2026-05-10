"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const team = [
  {
    role: "President",
    name: "Kamal Ji Nahata",
    phone: "917733992007",
  },
  {
    role: "General Seceratory",
    name: "Abhishek Ji Pokharna",
    phone: "919829074922",
  },
  {
    role: "IT Team Lead",
    name: "Gauransh Jaroli",
    phone: "919521347419",
  },
];

export default function ContactPage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const WATSAPP_NUMBER = "919829074922";

  // Wedding Inquiry
  const handleWedding = () => {
    const msg =
      "Hello, I want to inquire about wedding booking at Mahapragya Vihar Udaipur.";

    window.open(
      `https://wa.me/${WATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  // Room Booking
  const handleRoomBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const msg = `Hello, I want to book rooms at Mahapragya Vihar Udaipur.
Check-in: ${checkIn}
Check-out: ${checkOut}`;

    window.open(
      `https://wa.me/${WATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-heading text-accent">Contact & Booking</h1>
        <p className="mt-4 text-muted-foreground">
          For room booking, wedding inquiry or any assistance, connect with us
          directly.
        </p>
      </div>

      {/* Wedding Inquiry */}
      <Card className="mt-10 p-6 rounded-3xl">
        <h2 className="text-2xl font-heading text-accent">Wedding Inquiry</h2>

        <Button
          onClick={handleWedding}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
          Chat on WhatsApp
        </Button>
      </Card>

      {/* Room Booking */}
      <Card className="mt-6 p-6 rounded-3xl">
        <h2 className="text-2xl font-heading text-accent">Room Booking</h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <Button
            onClick={handleRoomBooking}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Book via WhatsApp
          </Button>
        </div>
      </Card>

      {/* Team Contact Section */}
      <div className="mt-14">
        <h2 className="text-3xl font-heading text-accent">Contact Our Team</h2>

        <p className="mt-2 text-muted-foreground">
          For faster response, you can directly connect with our team members.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name} className="p-6 rounded-3xl">
              <p className="text-sm text-muted-foreground">{member.role}</p>

              <h3 className="mt-2 text-2xl font-heading text-accent">
                {member.name}
              </h3>

              <a
                href={`https://wa.me/${member.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block w-full"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Chat on WhatsApp
                </Button>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
