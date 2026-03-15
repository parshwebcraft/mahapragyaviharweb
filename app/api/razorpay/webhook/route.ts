import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = headers().get("x-razorpay-signature");

  if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook configuration" }, { status: 400 });
  }

  const digest = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (digest !== signature) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    received: Boolean(rawBody)
  });
}
