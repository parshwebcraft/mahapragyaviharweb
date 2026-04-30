"use client";

import Image from "next/image";
import { Users, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

const rooms = [
  {
    id: 1,
    type: "Luxury AC Room (Double Bed)",
    price: 2000,
    occupancy: "2 Guests",
    image: "/rooms/room1.jpg",
    amenities: [
      "Air Conditioned",
      "1 Double Bed",
      "Attached Bathroom",
      "Clean & Peaceful Stay",
    ],
  },
  {
    id: 2,
    type: "Luxury AC Family Room (Two Double Beds)",
    price: 3000,
    occupancy: "4 Guests",
    image: "/rooms/room2.jpg",
    amenities: [
      "Air Conditioned",
      "2 Double Beds",
      "Spacious Room",
      "Ideal for Families & Wedding Guests",
    ],
  },
];

export default function RoomsPage() {
  const WHATSAPP = "919829074922";

  const bookNow = (room: any) => {
    const msg = `Hello, I want to book ${room.type} at Mahapragya Vihar Udaipur.
Occupancy: ${room.occupancy}
Price: ₹${room.price}`;

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="max-w-4xl">
        <h1 className="text-5xl font-heading text-accent">
          Luxury AC Rooms in Udaipur for Wedding Guests & Stay
        </h1>

        <p className="mt-4 text-muted-foreground">
          Mahapragya Vihar offers 50 fully air-conditioned luxury rooms in
          Bhuwana, Udaipur. Perfect for weddings, family stays and group
          bookings.
        </p>
      </div>

      {/* Room Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-3xl border overflow-hidden bg-white"
          >
            <Image
              src={room.image}
              alt={room.type}
              width={600}
              height={350}
              className="w-full h-[260px] object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-heading text-accent">{room.type}</h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {room.occupancy}
              </div>

              <p className="mt-3 text-lg font-semibold text-accent">
                ₹{room.price} / night
              </p>

              <div className="mt-4 text-sm text-muted-foreground">
                {room.amenities.map((a, i) => (
                  <div key={i}>• {a}</div>
                ))}
              </div>

              <Button
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => bookNow(room)}
              >
                Book on WhatsApp
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-heading text-accent">
          Why Choose Mahapragya Vihar?
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="font-semibold">50 AC Rooms</p>
            <p className="text-sm text-muted-foreground">
              All rooms are fully air-conditioned for comfort.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="font-semibold">Ideal for Weddings</p>
            <p className="text-sm text-muted-foreground">
              Perfect stay for wedding guests and families.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="font-semibold">Peaceful Location</p>
            <p className="text-sm text-muted-foreground">
              Located in Bhuwana, Udaipur with calm surroundings.
            </p>
          </div>
        </div>
      </div>

      {/* Nearby */}
      <div className="mt-16">
        <h2 className="text-3xl font-heading text-accent">
          Nearby Places in Udaipur
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Fateh Sagar Lake", "City Palace", "Saheliyon Ki Bari"].map(
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
