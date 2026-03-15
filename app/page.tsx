import { Bot, CalendarClock, CircleDollarSign, Images, ShieldCheck } from "lucide-react";

import { BookingPanel } from "@/components/forms/booking-panel";
import { ChatbotWidget } from "@/components/sections/chatbot-widget";
import { HeroSection } from "@/components/sections/hero";
import { GallerySection } from "@/components/sections/gallery";
import { SpaceShowcase } from "@/components/sections/space-showcase";
import { Card } from "@/components/ui/card";

const systemFeatures = [
  {
    icon: CalendarClock,
    title: "Smart inventory",
    copy: "Room allocation, blocked dates, and event approvals powered by a unified availability engine."
  },
  {
    icon: CircleDollarSign,
    title: "Dynamic pricing",
    copy: "Weekend, weekday, and festival-specific pricing with Razorpay checkout and webhook verification."
  },
  {
    icon: ShieldCheck,
    title: "Operational control",
    copy: "Supabase Auth, role-based admin access, RLS-ready tables, and audit-friendly booking statuses."
  },
  {
    icon: Bot,
    title: "AI concierge",
    copy: "A floating assistant answers room pricing, venue availability, facilities, and travel information."
  },
  {
    icon: Images,
    title: "Media-first storytelling",
    copy: "Supabase Storage-backed galleries for rooms, ceremonies, garden celebrations, and campus experiences."
  }
];

export default function HomePage() {
  return (
    <main className="pb-24">
      <HeroSection />

      <section className="section-shell py-8">
        <BookingPanel />
      </section>

      <section className="section-shell py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Platform Capabilities</p>
            <h2 className="mt-3 font-heading text-4xl text-accent">
              Built for hospitality, weddings, and spiritual gatherings.
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {systemFeatures.map((feature) => (
            <Card key={feature.title} className="min-h-[220px]">
              <feature.icon className="h-10 w-10 text-accent" />
              <h3 className="mt-8 font-heading text-2xl text-accent">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <SpaceShowcase />
      <GallerySection />
      <ChatbotWidget />
    </main>
  );
}
