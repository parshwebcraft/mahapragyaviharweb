"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { SalaryRecord, SalaryStatus } from "@/lib/admin-mock-data";
import { formatINR } from "@/utils/currency";

const emptySalary: SalaryRecord = {
  id: "",
  employeeName: "",
  department: "Management",
  month: new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
  salary: 0,
  advance: 0,
  paidOn: "",
  status: "pending"
};

export function SalaryPage() {
  const [records, setRecords] = useState<SalaryRecord[]>([]);
  const [editing, setEditing] = useState<SalaryRecord | null>(null);
  const [error, setError] = useState("");
  const totalSalary = records.reduce((total, record) => total + record.salary, 0);
  const pending = records.filter((record) => record.status === "pending").reduce((total, record) => total + record.salary - record.advance, 0);
  const paid = records.filter((record) => record.status === "paid").reduce((total, record) => total + record.salary - record.advance, 0);
  const advance = records.reduce((total, record) => total + record.advance, 0);

  async function loadSalaries() {
    try {
      const response = await fetch("/api/salaries", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load salaries.");
      setRecords(await response.json());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load salaries.");
    }
  }

  useEffect(() => {
    loadSalaries();
  }, []);

  async function saveSalary(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;

    setError("");

    try {
      const response = await fetch("/api/salaries", {
        method: editing.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Salary could not be saved.");

      const salaryRecord = result.salary as SalaryRecord;
      setRecords((current) => [salaryRecord, ...current.filter((record) => record.id !== salaryRecord.id)]);
      setEditing(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Salary could not be saved.");
    }
  }

  async function deleteSalary(id: string) {
    try {
      const response = await fetch("/api/salaries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error("Salary could not be deleted.");
      setRecords((current) => current.filter((record) => record.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Salary could not be deleted.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setEditing({ ...emptySalary })}>
          <Plus className="mr-2 h-4 w-4" />
          Create salary record
        </Button>
      </div>

      {error && <Card className="p-4 text-sm text-red-600">{error}</Card>}

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">Monthly Payroll</p><p className="mt-2 text-3xl font-heading text-accent">{formatINR(totalSalary)}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Paid</p><p className="mt-2 text-3xl font-heading text-accent">{formatINR(paid)}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Pending</p><p className="mt-2 text-3xl font-heading text-accent">{formatINR(pending)}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Advances</p><p className="mt-2 text-3xl font-heading text-accent">{formatINR(advance)}</p></Card>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Advance</th>
              <th className="px-4 py-3">Net Pay</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td className="px-4 py-5 text-muted-foreground" colSpan={7}>No salary records yet.</td>
              </tr>
            )}

            {records.map((record) => (
              <tr key={record.id} className="border-t bg-white/60">
                <td className="px-4 py-3">
                  <p className="font-semibold text-accent">{record.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{record.department}</p>
                </td>
                <td className="px-4 py-3">{record.month}</td>
                <td className="px-4 py-3">{formatINR(record.salary)}</td>
                <td className="px-4 py-3">{formatINR(record.advance)}</td>
                <td className="px-4 py-3">{formatINR(record.salary - record.advance)}</td>
                <td className="px-4 py-3"><StatusBadge value={record.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="px-3" onClick={() => setEditing(record)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="px-3" onClick={() => deleteSalary(record.id)}><Trash2 className="h-4 w-4" /></Button>
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
            <h2 className="text-2xl font-heading text-accent">{editing.id ? "Edit salary record" : "Create salary record"}</h2>
            <form onSubmit={saveSalary} className="mt-5 grid gap-4 md:grid-cols-2">
              <Input value={editing.employeeName} onChange={(event) => setEditing({ ...editing, employeeName: event.target.value })} placeholder="Employee name" required />
              <Input value={editing.department} onChange={(event) => setEditing({ ...editing, department: event.target.value })} placeholder="Department" />
              <Input value={editing.month} onChange={(event) => setEditing({ ...editing, month: event.target.value })} placeholder="Month e.g. May 2026" required />
              <Input type="number" value={editing.salary} onChange={(event) => setEditing({ ...editing, salary: Number(event.target.value) })} placeholder="Salary" required />
              <Input type="number" value={editing.advance} onChange={(event) => setEditing({ ...editing, advance: Number(event.target.value) })} placeholder="Advance" />
              <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as SalaryStatus })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
              <Input type="date" value={editing.paidOn} onChange={(event) => setEditing({ ...editing, paidOn: event.target.value })} className="md:col-span-2" />
              <div className="flex gap-3 md:col-span-2">
                <Button type="submit" className="flex-1">Save salary</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
