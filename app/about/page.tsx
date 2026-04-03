import { Card } from "@/components/ui/card";
import { siteHighlights, contactDetails } from "@/lib/site-content";

export default function AboutPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">About Us</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">
          A calm space for stays, gatherings, and simple room management.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar is presented here as a clean, easy-to-use website for visitors to
          explore rooms, view the gallery, and check contact details without any booking flow.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {siteHighlights.map((item) => (
          <Card key={item}>
            <h2 className="font-heading text-2xl text-accent">{item}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Clear information, simple navigation, and a calm visual style for visitors and staff.
            </p>
          </Card>
        ))}
      </div>

      <Card className="mt-10">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Contact Point</p>
        <h2 className="mt-3 font-heading text-3xl text-accent">Managed from Bhuwana, Udaipur.</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{contactDetails.address}</p>
      </Card>
    </main>
  );
}
