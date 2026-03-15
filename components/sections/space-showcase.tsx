import Image from "next/image";
import Link from "next/link";

import { spaces } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SpaceShowcase() {
  return (
    <section className="section-shell py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Event Venues</p>
        <h2 className="mt-3 font-heading text-4xl text-accent">
          Halls, garden celebrations, and culinary infrastructure in one campus.
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {spaces.map((space) => (
          <Card key={space.id} className="overflow-hidden p-0">
            <div className="relative h-64">
              <Image src={space.image} alt={space.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-heading text-2xl text-accent">{space.name}</h3>
                <span className="rounded-full bg-primary/60 px-3 py-1 text-xs uppercase text-accent">
                  {space.type}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Capacity for {space.capacity} guests with pricing from ₹
                {space.price.toLocaleString("en-IN")}.
              </p>
              <Link href="/events" className="mt-6 inline-block">
                <Button variant="outline">Request booking</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
