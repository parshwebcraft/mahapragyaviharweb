import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  createWeddingInquiry,
  deleteWeddingInquiry,
  readWeddingInquiries,
  updateWeddingInquiry
} from "@/lib/wedding-inquiry-store";

function isAdminRequest() {
  const session = cookies().get(adminSessionCookieName())?.value;
  return verifyAdminSessionToken(session);
}

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await readWeddingInquiries());
}

export async function POST(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ inquiry: await createWeddingInquiry(await request.json()) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Wedding inquiry could not be saved." },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    return NextResponse.json({ inquiry: await updateWeddingInquiry(String(body.id || ""), body) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Wedding inquiry could not be updated." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await deleteWeddingInquiry(String(id || ""));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Wedding inquiry could not be deleted." },
      { status: 400 }
    );
  }
}
