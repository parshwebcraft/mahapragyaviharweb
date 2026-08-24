"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const defaultSettings = {
  address: "Mahapragya Vihar, Bhuwana, Udaipur",
  phone: "+91 77339 92007",
  email: "mahapragyavihar@gmail.com",
  whatsappPrimary: "919414165894",
  whatsappSecondary: "917733992007",
  whatsappTeam: "919521347419",
  adminEmail: "admin@parshwebcraft.in",
  adminPassword: "",
  totalRooms: "50",
  checkIn: "10:00",
  checkOut: "09:00",
  weddingPriority: "High priority above 300 guests",
  weddingFollowUp: "Auto-follow-up after 24 hours",
  weddingRooms: "Require rooms estimate"
};

export function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const response = await fetch("/api/admin-records?collection=settings", { cache: "no-store" });
      if (!response.ok) return;
      const records = await response.json();
      const saved = records.find((record: { id: string }) => record.id === "main");
      if (saved) setSettings({ ...defaultSettings, ...saved });
    }

    loadSettings();
  }, []);

  function updateSetting(key: keyof typeof defaultSettings, value: string) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  async function saveSettings(label: string) {
    const response = await fetch("/api/admin-records?collection=settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "main", ...settings })
    });

    setMessage(response.ok ? `${label} saved.` : `${label} could not be saved.`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {message && <Card className="p-4 text-sm text-green-700 xl:col-span-2">{message}</Card>}

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Contact details</h2>
        <div className="mt-5 grid gap-4">
          <Input value={settings.address} onChange={(event) => updateSetting("address", event.target.value)} />
          <Input value={settings.phone} onChange={(event) => updateSetting("phone", event.target.value)} />
          <Input value={settings.email} onChange={(event) => updateSetting("email", event.target.value)} />
          <Button onClick={() => saveSettings("Contact details")}><Save className="mr-2 h-4 w-4" />Save contact details</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">WhatsApp numbers</h2>
        <div className="mt-5 grid gap-4">
          <Input value={settings.whatsappPrimary} onChange={(event) => updateSetting("whatsappPrimary", event.target.value)} />
          <Input value={settings.whatsappSecondary} onChange={(event) => updateSetting("whatsappSecondary", event.target.value)} />
          <Input value={settings.whatsappTeam} onChange={(event) => updateSetting("whatsappTeam", event.target.value)} />
          <Button onClick={() => saveSettings("WhatsApp settings")}><Save className="mr-2 h-4 w-4" />Save WhatsApp settings</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Admin credentials</h2>
        <div className="mt-5 grid gap-4">
          <Input value={settings.adminEmail} onChange={(event) => updateSetting("adminEmail", event.target.value)} type="email" />
          <Input value={settings.adminPassword} onChange={(event) => updateSetting("adminPassword", event.target.value)} placeholder="New password" type="password" />
          <Button onClick={() => saveSettings("Admin credentials")}><Save className="mr-2 h-4 w-4" />Update credentials</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Booking settings</h2>
        <div className="mt-5 grid gap-4">
          <Input value={settings.totalRooms} onChange={(event) => updateSetting("totalRooms", event.target.value)} type="number" />
          <Input value={settings.checkIn} onChange={(event) => updateSetting("checkIn", event.target.value)} type="time" />
          <Input value={settings.checkOut} onChange={(event) => updateSetting("checkOut", event.target.value)} type="time" />
          <Button onClick={() => saveSettings("Booking settings")}><Save className="mr-2 h-4 w-4" />Save booking settings</Button>
        </div>
      </Card>

      <Card className="p-5 xl:col-span-2">
        <h2 className="text-2xl font-heading text-accent">Wedding booking settings</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Input value={settings.weddingPriority} onChange={(event) => updateSetting("weddingPriority", event.target.value)} />
          <Input value={settings.weddingFollowUp} onChange={(event) => updateSetting("weddingFollowUp", event.target.value)} />
          <Input value={settings.weddingRooms} onChange={(event) => updateSetting("weddingRooms", event.target.value)} />
        </div>
        <Button className="mt-4" onClick={() => saveSettings("Wedding booking settings")}><Save className="mr-2 h-4 w-4" />Save booking settings</Button>
      </Card>
    </div>
  );
}
