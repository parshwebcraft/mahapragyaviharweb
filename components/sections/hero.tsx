import Image from "next/image";
import Link from "next/link";
import { BedDouble, CalendarHeart, MessageCircle, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";

const heroImage = "/WhatsApp Image 2026-05-10 at 11.18.10.jpeg";
const whatsappMessage =
  "Hello, I want booking details for Mahapragya Vihar Udaipur.";

const stats = [
  { icon: BedDouble, value: "50", label: "Luxury AC Rooms" },
  { icon: CalendarHeart, value: "Wedding", label: "& Events" },
  { icon: Utensils, value: "Jain", label: "Bhojanshala" }
];

export function HeroSection() {
  return (
    <section className="relative -mt-20 min-h-[90vh] overflow-hidden">
      <Image
        src={heroImage}
        alt="Mahapragya Vihar luxury stay and wedding venue in Udaipur"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/28 to-transparent" />

      <div className="section-shell relative z-10 flex min-h-[90vh] items-center pb-14 pt-32 md:pt-36">
        <div className="max-w-[650px]">
          <div className="inline-flex items-center rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-sm">
            Mahapragya Vihar • Bhuwana Udaipur
          </div>

          <h1 className="mt-7 font-heading text-5xl leading-[1.03] text-white md:text-7xl">
            Luxury Stay & Wedding Venue in Udaipur
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] md:text-xl">
            50 luxury AC rooms, Jain bhojanshala, wedding hall and peaceful
            stay experience for families, wedding guests and community events.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/rooms">
              <Button
                size="lg"
                className="bg-white px-8 text-accent shadow-soft hover:-translate-y-1 hover:bg-white/92"
              >
                Explore Rooms
              </Button>
            </Link>
            <a
              href={`https://wa.me/919414165894?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-green-600 px-8 text-white shadow-soft hover:-translate-y-1 hover:bg-green-700"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Booking
              </Button>
            </a>
          </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={`${value}-${label}`}
                className="rounded-2xl border border-white/20 bg-white/12 p-4 text-white shadow-sm transition hover:-translate-y-1 hover:bg-white/18"
              >
                <Icon className="h-6 w-6 text-primary" />
                <p className="mt-4 font-heading text-3xl leading-none">{value}</p>
                <p className="mt-1 text-sm text-white/78">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
