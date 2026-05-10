import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createBooking, deleteBooking, readBookings, updateBooking } from "@/lib/booking-store";

function isAdminRequest() {
  const session = cookies().get(adminSessionCookieName())?.value;
  return verifyAdminSessionToken(session);
}

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await readBookings();
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const booking = await createBooking(await request.json());
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Booking could not be saved." },
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
    const booking = await updateBooking(String(body.id || ""), body);
    return NextResponse.json({ booking });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Booking could not be updated." },
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
    await deleteBooking(String(id || ""));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Booking could not be deleted." },
      { status: 400 }
    );
  }
}
