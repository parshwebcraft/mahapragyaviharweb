"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  ClipboardList,
  Home,
  Menu,
  Settings,
  UserRoundCog,
  Users,
  WalletCards,
  X
} from "lucide-react";
import { ReactNode, useState } from "react";

import { AdminLogoutButton } from "@/components/admin-logout-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/rooms", label: "Room Management", icon: BedDouble },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/wedding-inquiries", label: "Wedding Inquiries", icon: CalendarCheck },
  { href: "/admin/employees", label: "Employees", icon: Users },
  { href: "/admin/attendance", label: "Attendance", icon: UserRoundCog },
  { href: "/admin/salary", label: "Salary Management", icon: WalletCards },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-white/60 bg-white/82 px-4 py-5 shadow-soft backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-2">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-accent/70">Mahapragya</p>
          <h2 className="font-heading text-2xl text-accent">Admin Suite</h2>
        </div>
        <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 grid gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                active ? "bg-accent text-accent-foreground shadow-soft" : "text-muted-foreground hover:bg-white hover:text-accent"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-primary/40 bg-secondary p-4">
        <p className="text-sm font-semibold text-accent">Hospitality Ops</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Rooms, events, employees and reports in one calm dashboard.
        </p>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7e6_0%,#fffdf8_100%)]">
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:block">{sidebar}</div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-accent/20" onClick={() => setOpen(false)} aria-label="Close overlay" />
          <div className="relative h-full">{sidebar}</div>
        </div>
      )}

      <div className="md:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/60 bg-white/76 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="px-3 md:hidden" onClick={() => setOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="font-heading text-3xl text-accent">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <AdminLogoutButton />
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
