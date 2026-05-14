import type { Employee } from "@/lib/admin-mock-data";
import { deleteRecord, readCollection, upsertRecord } from "@/lib/supabase-record-store";

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

const COLLECTION = "employees";

export async function readEmployees(): Promise<Employee[]> {
  return readCollection<Employee>(COLLECTION);
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
  const employee: Employee = {
    id: input.id || `EMP-${String(Date.now()).slice(-6)}`,
    ...validateEmployee(input)
  };

  return upsertRecord(COLLECTION, employee);
}

export async function updateEmployee(id: string, input: EmployeeInput) {
  const updated: Employee = { id, ...validateEmployee(input) };
  return upsertRecord(COLLECTION, updated);
}

export async function deleteEmployee(id: string) {
  await deleteRecord(COLLECTION, id);
}
