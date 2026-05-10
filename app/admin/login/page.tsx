"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@parshwebcraft.in");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState("Use the admin credentials to access the panel.");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("logged_out") === "1") {
      setMessage("You have been logged out successfully.");
    }
  }, []);

  async function handleSubmit() {
    setLoading(true);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    setLoading(false);

    if (!response.ok) {
      setMessage("Invalid admin email or password.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="section-shell flex min-h-[calc(100vh-160px)] items-center py-16">
      <Card className="mx-auto w-full max-w-xl space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Admin Login</p>
        <h1 className="font-heading text-5xl text-accent">Sign in to the admin panel.</h1>
        <p className="text-sm leading-7 text-muted-foreground">{message}</p>
        <div className="space-y-4">
          <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          <div className="relative">
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-accent"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </div>
      </Card>
    </main>
  );
}
