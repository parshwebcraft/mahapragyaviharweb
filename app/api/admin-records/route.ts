import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { deleteRecord, readCollection, upsertRecord } from "@/lib/supabase-record-store";

function isAdminRequest() {
  const session = cookies().get(adminSessionCookieName())?.value;
  return verifyAdminSessionToken(session);
}

function getCollection(request: Request) {
  return new URL(request.url).searchParams.get("collection") || "";
}

function isAllowedCollection(collection: string) {
  return ["attendance", "settings"].includes(collection);
}

export async function GET(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collection = getCollection(request);
  if (!isAllowedCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection." }, { status: 400 });
  }

  return NextResponse.json(await readCollection(collection));
}

export async function POST(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collection = getCollection(request);
  if (!isAllowedCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const id = String(body.id || "main");
    return NextResponse.json({ record: await upsertRecord(collection, { ...body, id }) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Record could not be saved." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collection = getCollection(request);
  if (!isAllowedCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection." }, { status: 400 });
  }

  try {
    const { id } = await request.json();
    await deleteRecord(collection, String(id || ""));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Record could not be deleted." },
      { status: 400 }
    );
  }
}
