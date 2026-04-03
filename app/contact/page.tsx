import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactDetails } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Contact</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">Reach out for room details and support.</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Use the contact details below for general questions, room information, or help with the
          website.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Card>
          <p className="text-sm uppercase tracking-[0.28em] text-accent/70">Address</p>
          <p className="mt-3 text-lg text-foreground">{contactDetails.address}</p>
          <p className="mt-6 text-sm text-muted-foreground">Hours: {contactDetails.hours}</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.28em] text-accent/70">Talk to Us</p>
          <p className="mt-3 text-lg text-foreground">{contactDetails.phone}</p>
          <p className="mt-3 text-sm text-muted-foreground">{contactDetails.email}</p>
          <Link href="/support" className="mt-6 inline-block">
            <Button variant="secondary">Go to Support</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
