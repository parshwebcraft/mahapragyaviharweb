import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createEmployee, deleteEmployee, readEmployees, updateEmployee } from "@/lib/employee-store";

function isAdminRequest() {
  const session = cookies().get(adminSessionCookieName())?.value;
  return verifyAdminSessionToken(session);
}

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await readEmployees());
}

export async function POST(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ employee: await createEmployee(await request.json()) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Employee could not be saved." }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    return NextResponse.json({ employee: await updateEmployee(String(body.id || ""), body) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Employee could not be updated." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await deleteEmployee(String(id || ""));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Employee could not be deleted." }, { status: 400 });
  }
}
