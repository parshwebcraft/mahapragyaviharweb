import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function buildInvoicePdf({
  bookingId,
  customerName,
  customerEmail,
  itemLabel,
  subtotal,
  gst,
  total
}: {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  itemLabel: string;
  subtotal: number;
  gst: number;
  total: number;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const heading = await pdf.embedFont(StandardFonts.HelveticaBold);
  const body = await pdf.embedFont(StandardFonts.Helvetica);

  page.drawRectangle({ x: 40, y: 740, width: 515, height: 70, color: rgb(0.96, 0.83, 0.42) });
  page.drawText("Mahapragya Vihar", { x: 56, y: 782, size: 26, font: heading, color: rgb(0.48, 0.12, 0.12) });
  page.drawText("Bhuwana, Udaipur | Tax Invoice", { x: 56, y: 760, size: 12, font: body, color: rgb(0.32, 0.2, 0.08) });

  const lines = [
    `Booking ID: ${bookingId}`,
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    `Booked Item: ${itemLabel}`,
    `Subtotal: INR ${subtotal.toLocaleString("en-IN")}`,
    `GST: INR ${gst.toLocaleString("en-IN")}`,
    `Total: INR ${total.toLocaleString("en-IN")}`
  ];

  lines.forEach((line, index) => {
    page.drawText(line, {
      x: 56,
      y: 700 - index * 26,
      size: 14,
      font: body,
      color: rgb(0.24, 0.16, 0.08)
    });
  });

  return pdf.save();
}
