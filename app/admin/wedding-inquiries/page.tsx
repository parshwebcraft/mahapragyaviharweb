import { AdminShell } from "@/components/admin/admin-shell";
import { WeddingInquiriesPage } from "@/components/admin/wedding-inquiries-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminWeddingInquiriesPage() {
  requireAdmin();

  return (
    <AdminShell title="Wedding Inquiries" subtitle="Track family inquiries, function dates, room needs and priority follow-ups.">
      <WeddingInquiriesPage />
    </AdminShell>
  );
}
