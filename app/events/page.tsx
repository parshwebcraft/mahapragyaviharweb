import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <main className="section-shell py-16">
      <Card className="mx-auto max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Events Disabled</p>
        <h1 className="font-heading text-5xl text-accent">Event booking is currently disabled.</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          This section will stay inactive until we bring the booking system back. For now, the site
          focuses on rooms, gallery, contact, and support.
        </p>
        <Link href="/gallery" className="inline-block">
          <Button>View Gallery</Button>
        </Link>
      </Card>
    </main>
  );
}
