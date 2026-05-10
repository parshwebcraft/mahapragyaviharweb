import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import type { SalaryRecord } from "@/lib/admin-mock-data";

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

const DATA_DIR = path.join(process.cwd(), "data");
const SALARIES_FILE = path.join(DATA_DIR, "salaries.json");

async function ensureFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(SALARIES_FILE, "utf8");
  } catch {
    await writeFile(SALARIES_FILE, "[]", "utf8");
  }
}

async function writeSalaries(records: SalaryRecord[]) {
  await ensureFile();
  await writeFile(SALARIES_FILE, JSON.stringify(records, null, 2), "utf8");
}

export async function readSalaries(): Promise<SalaryRecord[]> {
  await ensureFile();

  try {
    const parsed = JSON.parse(await readFile(SALARIES_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
  const records = await readSalaries();
  const record: SalaryRecord = {
    id: `SAL-${String(Date.now()).slice(-6)}`,
    ...validateSalary(input)
  };

  await writeSalaries([record, ...records]);
  return record;
}

export async function updateSalary(id: string, input: SalaryInput) {
  const records = await readSalaries();
  const existing = records.find((record) => record.id === id);

  if (!existing) {
    throw new Error("Salary record not found.");
  }

  const updated: SalaryRecord = { ...existing, ...validateSalary(input), id };
  await writeSalaries(records.map((record) => (record.id === id ? updated : record)));
  return updated;
}

export async function deleteSalary(id: string) {
  const records = await readSalaries();
  const nextRecords = records.filter((record) => record.id !== id);

  if (nextRecords.length === records.length) {
    throw new Error("Salary record not found.");
  }

  await writeSalaries(nextRecords);
}
