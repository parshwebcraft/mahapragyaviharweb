import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Privacy Policy</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">A simple privacy statement.</h1>
      </div>
      <Card className="mt-10 space-y-4">
        <p className="text-sm leading-7 text-muted-foreground">
          This static website does not collect booking or payment data.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          If the admin updates room availability in this browser, the data is stored locally in the
          browser for convenience.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          Contact details are used only when a visitor chooses to reach out directly.
        </p>
      </Card>
    </main>
  );
}
