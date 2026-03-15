import { NextResponse } from "next/server";

import { getChatbotReply } from "@/services/chatbot";

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };

  return NextResponse.json({
    reply: getChatbotReply(message ?? "")
  });
}
