export default function RoomsPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Rooms
        </p>

        <h1 className="mt-3 font-heading text-5xl text-accent">
          50 Comfortable Rooms in Udaipur
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar offers 36 AC Rooms and 14 Non-AC Rooms for
          families, wedding guests and peaceful stay in Bhuwana, Udaipur.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border p-6">
          <h2 className="text-2xl font-heading text-accent">50 Total Rooms</h2>
          <p className="mt-2 text-muted-foreground">
            Spacious stay options for all visitors.
          </p>
        </div>

        <div className="rounded-3xl border p-6">
          <h2 className="text-2xl font-heading text-accent">36 AC Rooms</h2>
          <p className="mt-2 text-muted-foreground">
            Comfortable air-conditioned premium rooms.
          </p>
        </div>

        <div className="rounded-3xl border p-6">
          <h2 className="text-2xl font-heading text-accent">14 Non-AC Rooms</h2>
          <p className="mt-2 text-muted-foreground">
            Budget-friendly peaceful stay rooms.
          </p>
        </div>
      </div>
    </main>
  );
}