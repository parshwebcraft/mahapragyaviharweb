import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Terms and Condition</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">Simple website usage terms.</h1>
      </div>
      <Card className="mt-10 space-y-4">
        <p className="text-sm leading-7 text-muted-foreground">
          This website is provided for general information about Mahapragya Vihar rooms, gallery,
          contact details, and admin-managed availability.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          Room status shown on the site depends on the latest manual update made by the admin from
          the Admin page.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          The site does not process bookings, payments, or refunds.
        </p>
      </Card>
    </main>
  );
}
