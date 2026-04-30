import { NextResponse } from "next/server";

let leads: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  const lead = {
    ...body,
    createdAt: new Date().toISOString(),
  };

  leads.unshift(lead);

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(leads);
}
