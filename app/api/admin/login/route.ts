import { NextResponse } from "next/server";
import { z } from "zod";

import { adminSessionCookieName, createAdminSessionToken, getAdminCredentials } from "@/lib/admin-auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(request: Request) {
  const body = loginSchema.parse(await request.json());
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
