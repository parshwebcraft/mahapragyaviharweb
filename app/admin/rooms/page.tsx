import { AdminShell } from "@/components/admin/admin-shell";
import { RoomsManagementPage } from "@/components/admin/rooms-management-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminRoomsPage() {
  requireAdmin();

  return (
    <AdminShell title="Room Management" subtitle="Manage all 50 fully AC rooms, guests, status and room history.">
      <RoomsManagementPage />
    </AdminShell>
  );
}
