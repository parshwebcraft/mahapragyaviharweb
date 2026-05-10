import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsPage } from "@/components/admin/settings-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminSettingsPage() {
  requireAdmin();

  return (
    <AdminShell title="Settings" subtitle="Configure contact, WhatsApp, admin, booking and wedding inquiry settings.">
      <SettingsPage />
    </AdminShell>
  );
}
