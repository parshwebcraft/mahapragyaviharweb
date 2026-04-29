import {
  Building2,
  Users,
  ShieldCheck,
  Landmark,
  BadgeIndianRupee,
  MonitorSmartphone
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { contactDetails } from "@/lib/site-content";

const teamMembers = [
  {
    role: "Adhyaksha",
    name: "Kamal Ji Nahata",
    icon: Users
  },
  {
    role: "MahaMantri",
    name: "Abhishek Ji Pokharna",
    icon: ShieldCheck
  },
  {
    role: "Mantri",
    name: "To Be Updated",
    icon: Landmark
  },
  {
    role: "Treasurer",
    name: "To Be Updated",
    icon: BadgeIndianRupee
  },
  {
    role: "IT Team Lead",
    name: "Gauransh Jaroli",
    icon: MonitorSmartphone
  }
];

export default function AboutPage() {
  return (
    <main className="section-shell py-16">
      {/* Intro */}
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          About Mahapragya Vihar
        </p>

        <h1 className="mt-3 font-heading text-5xl leading-tight text-accent md:text-6xl">
          A trusted place for stay, events and Jain community gatherings
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Mahapragya Vihar, Bhuwana Udaipur, is a peaceful and well-managed
          facility serving visitors, families and the Jain community. It is used
          for comfortable stays, weddings, engagements, pravachan programs and
          social gatherings.
        </p>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Established in 2007, Mahapragya Vihar has become a respected venue
          known for clean accommodation, spiritual atmosphere and community
          service in Udaipur.
        </p>
      </div>

      {/* Highlights */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="rounded-3xl p-6">
          <Building2 className="h-8 w-8 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Community Landmark
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            A respected center for Jain social, spiritual and family events.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <Users className="h-8 w-8 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Visitor Friendly
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Comfortable rooms and organized facilities for guests and families.
          </p>
        </Card>

        <Card className="rounded-3xl p-6">
          <ShieldCheck className="h-8 w-8 text-accent" />

          <h2 className="mt-4 text-2xl font-heading text-accent">
            Trusted Management
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Managed with dedication, transparency and service values.
          </p>
        </Card>
      </div>

      {/* Team Section */}
      <section className="mt-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
            Management Team
          </p>

          <h2 className="mt-3 font-heading text-4xl text-accent">
            Leadership & Administration
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.role} className="rounded-3xl p-6">
              <member.icon className="h-8 w-8 text-accent" />

              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-accent/70">
                {member.role}
              </p>

              <h3 className="mt-2 text-2xl font-heading text-accent">
                {member.name}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Dedicated to smooth operations and continued growth of
                Mahapragya Vihar.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <Card className="mt-16 rounded-3xl p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Contact Point
        </p>

        <h2 className="mt-3 font-heading text-3xl text-accent">
          Managed from Bhuwana, Udaipur
        </h2>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {contactDetails.address}
        </p>

        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          For room booking, wedding venue enquiry and management support,
          contact the official team directly.
        </p>
      </Card>
    </main>
  );
}