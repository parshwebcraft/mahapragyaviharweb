import { NextResponse } from "next/server";
import { z } from "zod";

import { createRazorpayClient } from "@/services/payment";

const checkoutSchema = z.object({
  amount: z.number().positive(),
  bookingId: z.string(),
  customerName: z.string(),
  email: z.string().email(),
  phone: z.string()
});

export async function POST(request: Request) {
  const body = checkoutSchema.parse(await request.json());
  const razorpay = createRazorpayClient();
  const order = await razorpay.orders.create({
    amount: Math.round(body.amount * 100),
    currency: "INR",
    receipt: body.bookingId,
    notes: {
      customerName: body.customerName,
      email: body.email,
      phone: body.phone
    }
  });

  return NextResponse.json({
    order,
    key: process.env.RAZORPAY_KEY_ID
  });
}
