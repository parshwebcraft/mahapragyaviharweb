import { AdminShell } from "@/components/admin/admin-shell";
import { ReportsPage } from "@/components/admin/reports-page";
import { requireAdmin } from "@/lib/admin-page-auth";
import { readBookings } from "@/lib/booking-store";
import { readEmployees } from "@/lib/employee-store";
import { readSalaries } from "@/lib/salary-store";

export default async function AdminReportsPage() {
  requireAdmin();
  const [bookings, employees, salaries] = await Promise.all([readBookings(), readEmployees(), readSalaries()]);

  return (
    <AdminShell title="Reports" subtitle="Analyze bookings, occupancy, attendance and revenue estimates.">
      <ReportsPage bookings={bookings} employees={employees} salaries={salaries} />
    </AdminShell>
  );
}
