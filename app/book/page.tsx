import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BookPage() {
  return (
    <main className="section-shell py-16">
      <Card className="mx-auto max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Booking Disabled</p>
        <h1 className="font-heading text-5xl text-accent">Online booking is turned off for now.</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          We have paused the booking panel and payment flow. Please use the Rooms page to check
          availability, or contact us directly if you need help.
        </p>
        <Link href="/rooms" className="inline-block">
          <Button>View Rooms</Button>
        </Link>
      </Card>
    </main>
  );
}
