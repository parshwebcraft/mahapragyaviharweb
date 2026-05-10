import { AdminShell } from "@/components/admin/admin-shell";
import { AttendancePage } from "@/components/admin/attendance-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminAttendancePage() {
  requireAdmin();

  return (
    <AdminShell title="Attendance" subtitle="Mark daily attendance and review the monthly attendance calendar.">
      <AttendancePage />
    </AdminShell>
  );
}
