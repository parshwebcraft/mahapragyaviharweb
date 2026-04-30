"use client";

import { useState } from "react";
import Image from "next/image";
import { Snowflake, Wind, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

const rooms = [
  {
    id: 1,
    type: "Deluxe AC Room",
    price: 2000,
    category: "ac",
    image: "/rooms/room1.jpg",
    amenities: ["AC", "Double Bed", "Clean Bathroom", "Peaceful Stay"],
  },
  {
    id: 2,
    type: "Standard Non-AC Room",
    price: 1200,
    category: "non-ac",
    image: "/rooms/room2.jpg",
    amenities: ["Fan", "Double Bed", "Clean Bathroom"],
  },
  {
    id: 3,
    type: "Family AC Room",
    price: 2500,
    category: "ac",
    image: "/rooms/room3.jpg",
    amenities: ["AC", "3 Bed", "Spacious", "Family Friendly"],
  },
];

export default function RoomsPage() {
  const [filter, setFilter] = useState("all");

  const filteredRooms =
    filter === "all" ? rooms : rooms.filter((room) => room.category === filter);

  const WHATSAPP = "919829074922";

  const bookNow = (room: any) => {
    const msg = `Hello, I want to book ${room.type} at Mahapragya Vihar Udaipur.
Price: ₹${room.price}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <h1 className="text-5xl font-heading text-accent">
          Rooms in Udaipur for Wedding Guests & Stay
        </h1>

        <p className="mt-4 text-muted-foreground">
          Choose from AC and Non-AC rooms at Mahapragya Vihar, Bhuwana Udaipur.
          Ideal for weddings, family stay and group bookings.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex gap-4">
        <Button onClick={() => setFilter("all")}>All</Button>
        <Button onClick={() => setFilter("ac")}>
          <Snowflake className="mr-2 h-4 w-4" />
          AC Rooms
        </Button>
        <Button onClick={() => setFilter("non-ac")}>
          <Wind className="mr-2 h-4 w-4" />
          Non-AC
        </Button>
      </div>

      {/* Room Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="rounded-3xl border overflow-hidden bg-white"
          >
            <Image
              src={room.image}
              alt={room.type}
              width={500}
              height={300}
              className="w-full h-[220px] object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-heading text-accent">{room.type}</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                ₹{room.price} / night
              </p>

              <div className="mt-3 text-sm text-muted-foreground">
                {room.amenities.map((a, i) => (
                  <div key={i}>• {a}</div>
                ))}
              </div>

              <Button
                className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => bookNow(room)}
              >
                Book on WhatsApp
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Udaipur Nearby Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-heading text-accent">
          Nearby Places in Udaipur
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Fateh Sagar Lake", "City Palace Udaipur", "Saheliyon Ki Bari"].map(
            (place) => (
              <div key={place} className="rounded-xl border p-4">
                <MapPin className="h-5 w-5 text-accent" />
                <p className="mt-2">{place}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
