import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RoomInventoryPanel from "@/components/room-inventory-panel";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import {
  adminSessionCookieName,
  verifyAdminSessionToken
} from "@/lib/admin-auth";

export default function AdminPage() {
  const session = cookies().get(adminSessionCookieName())?.value;

  if (!verifyAdminSessionToken(session)) {
    redirect("/admin/login");
  }

  return (
    <main className="section-shell py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
            Admin Dashboard
          </p>

          <h1 className="mt-3 font-heading text-5xl leading-tight text-accent">
            Room Management Panel
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Welcome Admin. From this panel you can manage room availability,
            update occupied or vacant status, mark maintenance rooms and keep
            internal records updated for reception and management team.
          </p>
        </div>

        <AdminLogoutButton />
      </div>

      {/* Info Cards */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-white/70 p-6">
          <h2 className="text-2xl font-heading text-accent">
            Room Availability
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mark rooms as vacant, occupied or reserved.
          </p>
        </div>

        <div className="rounded-3xl border bg-white/70 p-6">
          <h2 className="text-2xl font-heading text-accent">
            Maintenance Control
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Block rooms temporarily for cleaning or repair work.
          </p>
        </div>

        <div className="rounded-3xl border bg-white/70 p-6">
          <h2 className="text-2xl font-heading text-accent">
            Reception Support
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Help reception team assign rooms quickly to guests.
          </p>
        </div>
      </div>

      {/* Panel */}
      <RoomInventoryPanel />
    </main>
  );
}