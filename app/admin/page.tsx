import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardPage } from "@/components/admin/dashboard-page";
import { requireAdmin } from "@/lib/admin-page-auth";
import { readBookings } from "@/lib/booking-store";
import { readEmployees } from "@/lib/employee-store";
import { readWeddingInquiries } from "@/lib/wedding-inquiry-store";

export default async function AdminPage() {
  requireAdmin();
  const [savedBookings, savedEmployees, savedWeddingInquiries] = await Promise.all([
    readBookings(),
    readEmployees(),
    readWeddingInquiries()
  ]);

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Live hospitality overview for rooms, bookings, inquiries and team operations."
    >
      <DashboardPage
        savedBookings={savedBookings}
        savedEmployees={savedEmployees}
        savedWeddingInquiries={savedWeddingInquiries}
      />
    </AdminShell>
  );
}
