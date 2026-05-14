"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AttendanceRecord, AttendanceStatus, Employee } from "@/lib/admin-mock-data";

const statusOrder: AttendanceStatus[] = ["present", "absent", "leave"];
const attendanceStorageKey = "mahapragya-vihar-attendance-records";
const removedAttendanceKey = "mahapragya-vihar-removed-attendance-employees";

function monthDays() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

function normalizeDays(days: AttendanceStatus[] | undefined, totalDays: number) {
  return Array.from({ length: totalDays }, (_, index) => days?.[index] || "present" as AttendanceStatus);
}

export function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const totalDays = monthDays();
  const todayIndex = new Date().getDate() - 1;

  useEffect(() => {
    async function loadEmployees() {
      const response = await fetch("/api/employees", { cache: "no-store" });
      if (!response.ok) return;

      const employees = (await response.json()) as Employee[];
      const savedRecords = JSON.parse(localStorage.getItem(attendanceStorageKey) || "[]") as AttendanceRecord[];
      const removedEmployeeIds = JSON.parse(localStorage.getItem(removedAttendanceKey) || "[]") as string[];
      setRecords(
        employees
          .filter((employee) => !removedEmployeeIds.includes(employee.id))
          .map((employee) => {
            const savedRecord = savedRecords.find((record) => record.employeeId === employee.id);

            return {
              employeeId: employee.id,
              employeeName: employee.name,
              department: employee.department,
              days: normalizeDays(savedRecord?.days, totalDays)
            };
          })
      );
    }

    loadEmployees();
  }, [totalDays]);

  useEffect(() => {
    localStorage.setItem(attendanceStorageKey, JSON.stringify(records));
  }, [records]);

  const summary = useMemo(() => {
    const today = records.map((record) => record.days[todayIndex] || "present");
    const present = today.filter((status) => status === "present").length;
    const absent = today.filter((status) => status === "absent").length;
    const leave = today.filter((status) => status === "leave").length;
    const percentage = today.length === 0 ? 0 : Math.round((present / today.length) * 100);
    return { present, absent, leave, percentage };
  }, [records, todayIndex]);

  function cycleStatus(employeeId: string, dayIndex: number) {
    setRecords((current) =>
      current.map((record) => {
        if (record.employeeId !== employeeId) return record;
        const nextDays = [...record.days];
        const currentIndex = statusOrder.indexOf(nextDays[dayIndex]);
        nextDays[dayIndex] = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...record, days: nextDays };
      })
    );
  }

  function setAttendanceStatus(employeeId: string, dayIndex: number, status: AttendanceStatus) {
    setRecords((current) =>
      current.map((record) => {
        if (record.employeeId !== employeeId) return record;
        const nextDays = [...record.days];
        nextDays[dayIndex] = status;
        return { ...record, days: nextDays };
      })
    );
  }

  function removeAttendanceRecord(employeeId: string) {
    setRecords((current) => current.filter((record) => record.employeeId !== employeeId));
    const removedEmployeeIds = JSON.parse(localStorage.getItem(removedAttendanceKey) || "[]") as string[];
    localStorage.setItem(removedAttendanceKey, JSON.stringify(Array.from(new Set([...removedEmployeeIds, employeeId]))));
    setEditingRecord(null);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">Present Today</p><p className="mt-2 text-4xl font-heading text-accent">{summary.present}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Absent Today</p><p className="mt-2 text-4xl font-heading text-accent">{summary.absent}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">On Leave</p><p className="mt-2 text-4xl font-heading text-accent">{summary.leave}</p></Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Attendance %</p>
          <p className="mt-2 text-4xl font-heading text-accent">{summary.percentage}%</p>
          <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-accent" style={{ width: `${summary.percentage}%` }} /></div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Today's attendance</h2>
        {records.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            No employees yet. Add employees first to start attendance.
          </p>
        )}
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {records.map((record) => (
            <div key={record.employeeId} className="rounded-2xl border bg-white/70 p-4">
              <p className="font-semibold text-accent">{record.employeeName}</p>
              <p className="text-xs text-muted-foreground">{record.department}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <StatusBadge value={record.days[todayIndex] || "present"} />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => cycleStatus(record.employeeId, todayIndex)}>Change</Button>
                  <Button size="sm" variant="outline" className="px-3" onClick={() => setEditingRecord(record)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="px-3" onClick={() => removeAttendanceRecord(record.employeeId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-auto p-5">
        <h2 className="text-2xl font-heading text-accent">Monthly attendance calendar</h2>
        {records.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">Attendance calendar will appear after employees are added.</p>
        )}
        <table className="mt-4 min-w-[980px] w-full text-left text-xs">
          <thead className="text-muted-foreground">
            <tr>
              <th className="sticky left-0 bg-white/90 px-3 py-2">Employee</th>
              {Array.from({ length: totalDays }, (_, index) => <th key={index} className="px-2 py-2 text-center">{index + 1}</th>)}
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.employeeId} className="border-t">
                <td className="sticky left-0 bg-white/90 px-3 py-3 font-semibold text-accent">{record.employeeName}</td>
                {record.days.slice(0, totalDays).map((status, index) => (
                  <td key={index} className="px-1 py-2 text-center">
                    <button
                      onClick={() => cycleStatus(record.employeeId, index)}
                      className={`h-7 w-7 rounded-lg text-[10px] font-bold ${
                        status === "present" ? "bg-green-100 text-green-800" : status === "absent" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {status === "present" ? "P" : status === "absent" ? "A" : "L"}
                    </button>
                  </td>
                ))}
                <td className="px-3 py-2">
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" className="px-3" onClick={() => setEditingRecord(record)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="px-3" onClick={() => removeAttendanceRecord(record.employeeId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editingRecord && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-accent/20 p-4">
          <Card className="max-h-[88vh] w-full max-w-4xl overflow-auto bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-heading text-accent">Edit attendance</h2>
                <p className="text-sm text-muted-foreground">
                  {editingRecord.employeeName} · {editingRecord.department}
                </p>
              </div>
              <Button variant="outline" onClick={() => removeAttendanceRecord(editingRecord.employeeId)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete row
              </Button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: totalDays }, (_, index) => {
                const status = records.find((record) => record.employeeId === editingRecord.employeeId)?.days[index] || "present";

                return (
                  <label key={index} className="grid gap-2 rounded-2xl border bg-secondary/50 p-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent/70">
                    Day {index + 1}
                    <select
                      value={status}
                      onChange={(event) => setAttendanceStatus(editingRecord.employeeId, index, event.target.value as AttendanceStatus)}
                      className="h-10 rounded-xl border border-border bg-white px-3 text-sm normal-case tracking-normal text-foreground"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="leave">Leave</option>
                    </select>
                  </label>
                );
              })}
            </div>

            <div className="mt-5 flex gap-3">
              <Button className="flex-1" onClick={() => setEditingRecord(null)}>Save changes</Button>
              <Button className="flex-1" variant="outline" onClick={() => setEditingRecord(null)}>Cancel</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
