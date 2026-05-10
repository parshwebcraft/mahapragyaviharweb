import { AdminShell } from "@/components/admin/admin-shell";
import { EmployeesPage } from "@/components/admin/employees-page";
import { requireAdmin } from "@/lib/admin-page-auth";

export default function AdminEmployeesPage() {
  requireAdmin();

  return (
    <AdminShell title="Employees" subtitle="Manage employee profiles, departments, salaries and operational status.">
      <EmployeesPage />
    </AdminShell>
  );
}
