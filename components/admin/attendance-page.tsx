"use client";

import { useEffect, useMemo, useState } from "react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AttendanceRecord, AttendanceStatus, Employee } from "@/lib/admin-mock-data";

const statusOrder: AttendanceStatus[] = ["present", "absent", "leave"];

export function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const todayIndex = new Date().getDate() - 1;

  useEffect(() => {
    async function loadEmployees() {
      const response = await fetch("/api/employees", { cache: "no-store" });
      if (!response.ok) return;

      const employees = (await response.json()) as Employee[];
      setRecords(
        employees.map((employee) => ({
          employeeId: employee.id,
          employeeName: employee.name,
          department: employee.department,
          days: Array.from({ length: 30 }, () => "present" as AttendanceStatus)
        }))
      );
    }

    loadEmployees();
  }, []);

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
                <Button size="sm" variant="outline" onClick={() => cycleStatus(record.employeeId, todayIndex)}>Change</Button>
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
              {Array.from({ length: 30 }, (_, index) => <th key={index} className="px-2 py-2 text-center">{index + 1}</th>)}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.employeeId} className="border-t">
                <td className="sticky left-0 bg-white/90 px-3 py-3 font-semibold text-accent">{record.employeeName}</td>
                {record.days.map((status, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
