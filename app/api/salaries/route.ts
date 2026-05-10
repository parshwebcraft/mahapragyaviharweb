import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createSalary, deleteSalary, readSalaries, updateSalary } from "@/lib/salary-store";

function isAdminRequest() {
  const session = cookies().get(adminSessionCookieName())?.value;
  return verifyAdminSessionToken(session);
}

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await readSalaries());
}

export async function POST(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ salary: await createSalary(await request.json()) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Salary could not be saved." }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    return NextResponse.json({ salary: await updateSalary(String(body.id || ""), body) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Salary could not be updated." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await deleteSalary(String(id || ""));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Salary could not be deleted." }, { status: 400 });
  }
}
