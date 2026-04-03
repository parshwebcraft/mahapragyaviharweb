import { RoomInventoryPanel } from "@/components/room-inventory-panel";

export default function RoomsPage() {
  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Rooms</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">
          50 rooms with a simple availability summary.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Visitors can see which rooms are empty, occupied, or under maintenance. Admin updates
          are managed manually.
        </p>
      </div>
      <div className="mt-10">
        <RoomInventoryPanel />
      </div>
    </main>
  );
}
