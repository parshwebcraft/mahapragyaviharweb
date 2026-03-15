import { NextResponse } from "next/server";
import { z } from "zod";

import { buildInvoicePdf } from "@/services/invoice";

const invoiceSchema = z.object({
  bookingId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  itemLabel: z.string(),
  subtotal: z.number(),
  gst: z.number(),
  total: z.number()
});

export async function POST(request: Request) {
  const payload = invoiceSchema.parse(await request.json());
  const pdfBytes = await buildInvoicePdf(payload);

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${payload.bookingId}.pdf"`
    }
  });
}
