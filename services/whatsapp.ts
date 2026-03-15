import twilio from "twilio";

export async function sendWhatsAppBooking({
  to,
  body
}: {
  to: string;
  body: string;
}) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    return { skipped: true };
  }

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to,
    body
  });
}
