import { Card } from "@/components/ui/card";
import { contactDetails } from "@/lib/site-content";

const faqs = [
  {
    q: "How do I check room availability?",
    a: "Open the Rooms page to see the current empty, occupied, and maintenance counts."
  },
  {
    q: "Can the admin update availability?",
    a: "Yes. The Admin page includes manual controls for each room."
  },
  {
    q: "Is there online booking?",
    a: "No. This version is a static information website without Razorpay or booking checkout."
  }
];

export default function SupportPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Support</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">Help and simple answers.</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This page keeps the experience straightforward for visitors and staff.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {faqs.map((item) => (
          <Card key={item.q}>
            <h2 className="font-heading text-2xl text-accent">{item.q}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10">
        <p className="text-sm uppercase tracking-[0.28em] text-accent/70">Contact Support</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Email: {contactDetails.supportEmail}
        </p>
        <p className="mt-1 text-sm leading-7 text-muted-foreground">Phone: {contactDetails.phone}</p>
      </Card>
    </main>
  );
}
