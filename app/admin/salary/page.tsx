import { AdminShell } from "@/components/admin/admin-shell";
import { SalaryPage } from "@/components/admin/salary-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminSalaryPage() {
  requireAdmin();

  return (
    <AdminShell title="Salary Management" subtitle="Track monthly payroll, advances, paid status and employee salary history.">
      <SalaryPage />
    </AdminShell>
  );
}
