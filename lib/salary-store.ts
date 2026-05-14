import type { SalaryRecord } from "@/lib/admin-mock-data";
import { deleteRecord, readCollection, upsertRecord } from "@/lib/supabase-record-store";

export interface SalaryInput {
  id?: string;
  employeeName?: string;
  department?: string;
  month?: string;
  salary?: number;
  advance?: number;
  paidOn?: string;
  status?: SalaryRecord["status"];
}

const COLLECTION = "salaries";

export async function readSalaries(): Promise<SalaryRecord[]> {
  return readCollection<SalaryRecord>(COLLECTION);
}

function validateSalary(input: SalaryInput) {
  const employeeName = input.employeeName?.trim();
  const department = input.department?.trim() || "Management";
  const month = input.month?.trim();
  const salary = Number(input.salary);
  const advance = Number(input.advance || 0);
  const status = input.status || "pending";
  const paidOn = status === "paid" ? input.paidOn?.trim() || new Date().toISOString().slice(0, 10) : "";

  if (!employeeName || !month) {
    throw new Error("Employee name and month are required.");
  }

  if (!Number.isFinite(salary) || salary < 0 || !Number.isFinite(advance) || advance < 0) {
    throw new Error("Salary and advance must be valid amounts.");
  }

  return { employeeName, department, month, salary, advance, paidOn, status };
}

export async function createSalary(input: SalaryInput) {
  const record: SalaryRecord = {
    id: input.id || `SAL-${String(Date.now()).slice(-6)}`,
    ...validateSalary(input)
  };

  return upsertRecord(COLLECTION, record);
}

export async function updateSalary(id: string, input: SalaryInput) {
  const updated: SalaryRecord = { id, ...validateSalary(input) };
  return upsertRecord(COLLECTION, updated);
}

export async function deleteSalary(id: string) {
  await deleteRecord(COLLECTION, id);
}
