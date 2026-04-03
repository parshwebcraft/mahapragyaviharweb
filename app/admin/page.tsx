import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RoomInventoryPanel } from "@/components/room-inventory-panel";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export default function AdminPage() {
  const session = cookies().get(adminSessionCookieName())?.value;

  if (!verifyAdminSessionToken(session)) {
    redirect("/admin/login");
  }

  return (
    <main className="section-shell py-16">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Admin Panel</p>
          <h1 className="mt-3 font-heading text-5xl text-accent">Manually update room availability.</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            This panel lets the admin change room status, add a note, and keep the public Rooms page
            current. Changes are saved in this browser.
          </p>
        </div>
        <AdminLogoutButton />
      </div>
      <RoomInventoryPanel admin />
    </main>
  );
}
