"use client";

import { FormEvent, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Employee } from "@/lib/admin-mock-data";
import { formatINR } from "@/utils/currency";

const departments: Employee["department"][] = ["Reception", "Management", "Cleaning", "Kitchen", "Event Support", "IT"];

const emptyEmployee: Employee = {
  id: "",
  name: "",
  role: "",
  department: "Reception",
  phone: "",
  joiningDate: "",
  salary: 0,
  status: "active"
};

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [profile, setProfile] = useState<Employee | null>(null);
  const [error, setError] = useState("");

  async function loadEmployees() {
    const response = await fetch("/api/employees", { cache: "no-store" });
    if (response.ok) {
      setEmployees(await response.json());
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function saveEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;

    const response = await fetch("/api/employees", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing)
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Employee could not be saved.");
      return;
    }

    setEditing(null);
    await loadEmployees();
  }

  async function deleteEmployee(id: string) {
    const response = await fetch("/api/employees", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      await loadEmployees();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setEditing(emptyEmployee)}>
          <Plus className="mr-2 h-4 w-4" />
          Add employee
        </Button>
      </div>

      {error && <Card className="p-4 text-sm text-red-600">{error}</Card>}

      <Card className="overflow-x-auto p-0">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && (
              <tr>
                <td className="px-4 py-5 text-muted-foreground" colSpan={6}>
                  No employees yet. Click Add employee to enter fresh staff data.
                </td>
              </tr>
            )}

            {employees.map((employee) => (
              <tr key={employee.id} className="border-t bg-white/60">
                <td className="px-4 py-3">
                  <p className="font-semibold text-accent">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.role} · Joined {employee.joiningDate}</p>
                </td>
                <td className="px-4 py-3">{employee.department}</td>
                <td className="px-4 py-3">{employee.phone}</td>
                <td className="px-4 py-3">{formatINR(employee.salary)}</td>
                <td className="px-4 py-3"><StatusBadge value={employee.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="px-3" onClick={() => setProfile(employee)}><Eye className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="px-3" onClick={() => setEditing(employee)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="px-3" onClick={() => deleteEmployee(employee.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-accent/20 p-4">
          <Card className="w-full max-w-2xl bg-white p-6">
            <h2 className="text-2xl font-heading text-accent">{editing.id ? "Edit employee" : "Add employee"}</h2>
            <form onSubmit={saveEmployee} className="mt-5 grid gap-4 md:grid-cols-2">
              <Input value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} placeholder="Employee name" required />
              <Input value={editing.role} onChange={(event) => setEditing({ ...editing, role: event.target.value })} placeholder="Role" required />
              <select value={editing.department} onChange={(event) => setEditing({ ...editing, department: event.target.value as Employee["department"] })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm">
                {departments.map((department) => <option key={department}>{department}</option>)}
              </select>
              <Input value={editing.phone} onChange={(event) => setEditing({ ...editing, phone: event.target.value })} placeholder="Phone" required />
              <Input type="date" value={editing.joiningDate} onChange={(event) => setEditing({ ...editing, joiningDate: event.target.value })} required />
              <Input type="number" value={editing.salary} onChange={(event) => setEditing({ ...editing, salary: Number(event.target.value) })} placeholder="Salary" required />
              <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as Employee["status"] })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm md:col-span-2">
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex gap-3 md:col-span-2">
                <Button type="submit" className="flex-1">Save employee</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {profile && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-accent/20 p-4">
          <Card className="w-full max-w-lg bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-heading text-accent">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.role}</p>
              </div>
              <StatusBadge value={profile.status} />
            </div>
            <div className="mt-5 grid gap-3 text-sm">
              <p><b>Department:</b> {profile.department}</p>
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Joining Date:</b> {profile.joiningDate}</p>
              <p><b>Salary:</b> {formatINR(profile.salary)}</p>
            </div>
            <Button className="mt-5 w-full" variant="outline" onClick={() => setProfile(null)}>Close profile</Button>
          </Card>
        </div>
      )}
    </div>
  );
}
