"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ChatbotWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Namaste. Ask me about rooms, venue availability, location, or facilities."
    }
  ]);
  const [query, setQuery] = useState("");

  async function submit() {
    if (!query.trim()) return;
    const prompt = query;
    setMessages((current) => [...current, { role: "user", content: prompt }]);
    setQuery("");

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();

    setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[360px] max-w-[calc(100vw-24px)]">
      <Card className="p-0">
        <div className="flex items-center gap-3 rounded-t-[28px] bg-accent px-5 py-4 text-accent-foreground">
          <MessageCircle className="h-5 w-5" />
          <div>
            <p className="font-semibold">AI Concierge</p>
            <p className="text-xs text-accent-foreground/75">OpenAI + Supabase ready</p>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="max-h-72 space-y-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  message.role === "assistant"
                    ? "bg-secondary text-foreground"
                    : "ml-auto bg-primary/60 text-accent"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about pricing or availability"
            />
            <Button size="sm" onClick={submit}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
