import { NextResponse } from "next/server";

import { adminSessionCookieName, createAdminSessionToken, getAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password || !body.email.includes("@")) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 400 });
  }

  const credentials = getAdminCredentials();

  if (body.email !== credentials.email || body.password !== credentials.password) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookieName(), createAdminSessionToken(body.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
