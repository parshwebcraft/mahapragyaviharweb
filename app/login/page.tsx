"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PhoneCall, Mail, LockKeyhole, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: ""
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("mv-user", JSON.stringify(form));
      router.push("/book");
    }, 1000);
  }

  return (
    <main className="section-shell py-16">
      <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
            User Login
          </p>

          <h1 className="mt-3 font-heading text-5xl leading-tight text-accent">
            Continue for Room or Wedding Booking
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Login to continue room booking, wedding inquiry, guest stay request
            or event reservation at Mahapragya Vihar Udaipur.
          </p>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>• Fast booking assistance</p>
            <p>• Wedding & hall inquiry support</p>
            <p>• Reception callback available</p>
            <p>• Trusted management response</p>
          </div>
        </div>

        {/* Right */}
        <Card className="rounded-3xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-accent">
                Full Name
              </label>

              <div className="flex items-center rounded-2xl border px-4">
                <User className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-accent">
                Mobile Number
              </label>

              <div className="flex items-center rounded-2xl border px-4">
                <PhoneCall className="h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-accent">
                Email Address
              </label>

              <div className="flex items-center rounded-2xl border px-4">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <LockKeyhole className="mr-2 h-4 w-4" />
              {loading ? "Please wait..." : "Login & Continue"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              By continuing, you can proceed for booking assistance.
            </p>

            <div className="pt-2 text-center">
              <Link
                href="/contact"
                className="text-sm font-medium text-accent hover:underline"
              >
                Need Help? Contact Reception
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}