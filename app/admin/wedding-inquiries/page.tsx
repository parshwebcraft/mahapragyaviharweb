import { AdminShell } from "@/components/admin/admin-shell";
import { WeddingInquiriesPage } from "@/components/admin/wedding-inquiries-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminWeddingInquiriesPage() {
  requireAdmin();

  return (
    <AdminShell title="Wedding Bookings" subtitle="Track booked wedding functions, dates, rooms, venues and contact follow-ups.">
      <WeddingInquiriesPage />
    </AdminShell>
  );
}
