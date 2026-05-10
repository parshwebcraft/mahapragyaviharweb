import { AdminShell } from "@/components/admin/admin-shell";
import { BookingsManagementPage } from "@/components/admin/bookings-management-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminBookingsPage() {
  requireAdmin();

  return (
    <AdminShell title="Bookings" subtitle="Review booking requests, assign rooms and contact guests quickly.">
      <BookingsManagementPage />
    </AdminShell>
  );
}
