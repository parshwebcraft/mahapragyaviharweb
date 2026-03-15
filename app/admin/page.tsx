import { BarChart3, CalendarRange, CreditCard, Hotel, ScrollText } from "lucide-react";

import { dashboardMetrics } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

const adminSections = [
  { icon: Hotel, title: "Inventory", copy: "Manage 36 rooms, hall availability, garden blocks, and maintenance." },
  { icon: CalendarRange, title: "Approvals", copy: "Approve or reject event bookings, wedding packages, and custom requests." },
  { icon: CreditCard, title: "Payments", copy: "Track Razorpay status, refunds, and verified webhook payloads." },
  { icon: ScrollText, title: "Invoices", copy: "Generate branded PDFs and dispatch them through email and WhatsApp." },
  { icon: BarChart3, title: "Analytics", copy: "Revenue, occupancy, and booking trends across rooms and venue categories." }
];

export default function AdminPage() {
  return (
    <main className="section-shell py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Admin Dashboard</p>
        <h1 className="mt-3 font-heading text-5xl text-accent">Control operations from one premium workspace.</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-4 font-heading text-4xl text-accent">{metric.value}</p>
            <p className="mt-3 text-sm text-muted-foreground">{metric.delta}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {adminSections.map((section) => (
          <Card key={section.title}>
            <section.icon className="h-8 w-8 text-accent" />
            <h2 className="mt-6 font-heading text-2xl text-accent">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.copy}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
