"use client";

import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SettingsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Contact details</h2>
        <div className="mt-5 grid gap-4">
          <Input defaultValue="Mahapragya Vihar, Bhuwana, Udaipur" />
          <Input defaultValue="+91 77339 92007" />
          <Input defaultValue="mahapragyavihar@gmail.com" />
          <Button><Save className="mr-2 h-4 w-4" />Save contact details</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">WhatsApp numbers</h2>
        <div className="mt-5 grid gap-4">
          <Input defaultValue="919829074922" />
          <Input defaultValue="917733992007" />
          <Input defaultValue="919521347419" />
          <Button><Save className="mr-2 h-4 w-4" />Save WhatsApp settings</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Admin credentials</h2>
        <div className="mt-5 grid gap-4">
          <Input defaultValue="admin@parshwebcraft.in" type="email" />
          <Input placeholder="New password" type="password" />
          <Button><Save className="mr-2 h-4 w-4" />Update credentials</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Booking settings</h2>
        <div className="mt-5 grid gap-4">
          <Input defaultValue="50" type="number" />
          <Input defaultValue="10:00" type="time" />
          <Input defaultValue="09:00" type="time" />
          <Button><Save className="mr-2 h-4 w-4" />Save booking settings</Button>
        </div>
      </Card>

      <Card className="p-5 xl:col-span-2">
        <h2 className="text-2xl font-heading text-accent">Wedding inquiry settings</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Input defaultValue="High priority above 300 guests" />
          <Input defaultValue="Auto-follow-up after 24 hours" />
          <Input defaultValue="Require rooms estimate" />
        </div>
        <Button className="mt-4"><Save className="mr-2 h-4 w-4" />Save inquiry settings</Button>
      </Card>
    </div>
  );
}
