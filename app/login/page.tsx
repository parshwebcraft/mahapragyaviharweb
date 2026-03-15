"use client";

import { useState } from "react";

import { signInWithOtp } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Use email OTP / magic link sign-in for guest and admin access.");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const { error } = await signInWithOtp(email);
    setLoading(false);
    setMessage(
      error ? error.message : "Check your email for the secure sign-in link from Mahapragya Vihar."
    );
  }

  return (
    <main className="section-shell flex min-h-[calc(100vh-80px)] items-center py-16">
      <Card className="mx-auto w-full max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Supabase Auth</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">Secure sign in for guests and admins.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{message}</p>
        <div className="mt-8 flex flex-col gap-4">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
          />
          <Button onClick={submit} disabled={loading}>
            {loading ? "Sending magic link..." : "Send OTP / Magic Link"}
          </Button>
        </div>
      </Card>
    </main>
  );
}
