import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import type { Employee } from "@/lib/admin-mock-data";

export interface EmployeeInput {
  id?: string;
  name?: string;
  role?: string;
  department?: Employee["department"];
  phone?: string;
  joiningDate?: string;
  salary?: number;
  status?: Employee["status"];
}

const DATA_DIR = path.join(process.cwd(), "data");
const EMPLOYEES_FILE = path.join(DATA_DIR, "employees.json");

async function ensureFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(EMPLOYEES_FILE, "utf8");
  } catch {
    await writeFile(EMPLOYEES_FILE, "[]", "utf8");
  }
}

async function writeEmployees(employees: Employee[]) {
  await ensureFile();
  await writeFile(EMPLOYEES_FILE, JSON.stringify(employees, null, 2), "utf8");
}

export async function readEmployees(): Promise<Employee[]> {
  await ensureFile();

  try {
    const parsed = JSON.parse(await readFile(EMPLOYEES_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function validateEmployee(input: EmployeeInput) {
  const name = input.name?.trim();
  const role = input.role?.trim();
  const department = input.department || "Reception";
  const phone = input.phone?.trim();
  const joiningDate = input.joiningDate?.trim();
  const salary = Number(input.salary);
  const status = input.status || "active";

  if (!name || !role || !phone || !joiningDate) {
    throw new Error("Name, role, phone and joining date are required.");
  }

  if (!Number.isFinite(salary) || salary < 0) {
    throw new Error("Salary must be a valid amount.");
  }

  return { name, role, department, phone, joiningDate, salary, status };
}

export async function createEmployee(input: EmployeeInput) {
  const employees = await readEmployees();
  const employee: Employee = {
    id: `EMP-${String(Date.now()).slice(-6)}`,
    ...validateEmployee(input)
  };

  await writeEmployees([employee, ...employees]);
  return employee;
}

export async function updateEmployee(id: string, input: EmployeeInput) {
  const employees = await readEmployees();
  const existing = employees.find((employee) => employee.id === id);

  if (!existing) {
    throw new Error("Employee not found.");
  }

  const updated: Employee = { ...existing, ...validateEmployee(input), id };
  await writeEmployees(employees.map((employee) => (employee.id === id ? updated : employee)));
  return updated;
}

export async function deleteEmployee(id: string) {
  const employees = await readEmployees();
  const nextEmployees = employees.filter((employee) => employee.id !== id);

  if (nextEmployees.length === employees.length) {
    throw new Error("Employee not found.");
  }

  await writeEmployees(nextEmployees);
}
