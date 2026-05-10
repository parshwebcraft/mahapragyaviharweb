"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { InquiryStatus, Priority, WeddingInquiry } from "@/lib/admin-mock-data";

const emptyInquiry: WeddingInquiry = {
  id: "",
  familyName: "",
  phone: "",
  functionDate: "",
  functionStartDate: "",
  functionEndDate: "",
  daysBlocked: 1,
  venueRequirement: "",
  additionalPhones: "",
  guestCount: 1,
  roomsRequired: 0,
  notes: "",
  status: "new",
  priority: "medium"
};

const venueOptions = [
  "Full venue",
  "Banquet hall",
  "Mahashraman Sabhagar",
  "Pravachan hall",
  "Rooms only",
  "Venue + rooms",
  "Discussion pending"
];

function normalizedInquiry(inquiry: WeddingInquiry): WeddingInquiry {
  return {
    ...inquiry,
    functionStartDate: inquiry.functionStartDate || inquiry.functionDate || "",
    functionEndDate: inquiry.functionEndDate || inquiry.functionDate || "",
    daysBlocked: inquiry.daysBlocked || 1,
    venueRequirement: inquiry.venueRequirement || "",
    additionalPhones: inquiry.additionalPhones || ""
  };
}

function dateRangeLabel(inquiry: WeddingInquiry) {
  const start = inquiry.functionStartDate || inquiry.functionDate;
  const end = inquiry.functionEndDate;

  if (start && end && start !== end) return `${start} to ${end}`;
  if (start) return start;
  return "Date pending";
}

function daysLabel(inquiry: WeddingInquiry) {
  const days = inquiry.daysBlocked || 1;
  return `${days} day${days > 1 ? "s" : ""} block`;
}

function whatsappNumber(phone: string) {
  return phone.replace(/\D/g, "");
}

export function WeddingInquiriesPage() {
  const [inquiries, setInquiries] = useState<WeddingInquiry[]>([]);
  const [editing, setEditing] = useState<WeddingInquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadInquiries() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/wedding-inquiries", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load wedding inquiries.");
      setInquiries(await response.json());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load wedding inquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function saveInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;

    const response = await fetch("/api/wedding-inquiries", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing)
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Wedding inquiry could not be saved.");
      return;
    }

    setEditing(null);
    await loadInquiries();
  }

  async function deleteInquiry(id: string) {
    const response = await fetch("/api/wedding-inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      await loadInquiries();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={loadInquiries} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        <Button onClick={() => setEditing({ ...emptyInquiry })}>
          <Plus className="mr-2 h-4 w-4" />
          Create inquiry
        </Button>
      </div>

      {error && <Card className="p-4 text-sm text-red-600">{error}</Card>}

      <div className="grid gap-4 lg:grid-cols-2">
        {!loading && inquiries.length === 0 && (
          <Card className="p-6 text-sm text-muted-foreground lg:col-span-2">
            No wedding inquiries yet. Click Create inquiry to add family/function details.
          </Card>
        )}

        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-2xl font-heading text-accent">{inquiry.familyName}</p>
                <p className="text-sm text-muted-foreground">
                  {inquiry.id} · {dateRangeLabel(inquiry)} · {daysLabel(inquiry)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge value={inquiry.status} />
                <StatusBadge value={inquiry.priority} label={`${inquiry.priority} priority`} />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Guest Number</p>
                <p className="text-2xl font-heading text-accent">{inquiry.guestCount}</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Rooms Required</p>
                <p className="text-2xl font-heading text-accent">{inquiry.roomsRequired}</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Days Blocked</p>
                <p className="text-2xl font-heading text-accent">{inquiry.daysBlocked || 1}</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Primary Phone</p>
                <p className="text-sm font-semibold text-accent">{inquiry.phone}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-accent">Venue:</span>{" "}
                {inquiry.venueRequirement || "Discussion pending"}
              </p>
              {inquiry.additionalPhones && (
                <p>
                  <span className="font-semibold text-accent">Other contacts:</span> {inquiry.additionalPhones}
                </p>
              )}
            </div>

            {inquiry.notes && <p className="mt-4 text-sm leading-6 text-muted-foreground">{inquiry.notes}</p>}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <a href={`https://wa.me/${whatsappNumber(inquiry.phone)}`} target="_blank" rel="noreferrer">
                <Button className="w-full bg-green-600 px-3 text-white hover:bg-green-700" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </a>
              <Button size="sm" variant="outline" className="px-3" onClick={() => setEditing(normalizedInquiry(inquiry))}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="px-3" onClick={() => deleteInquiry(inquiry.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-accent/20 p-4">
          <Card className="w-full max-w-3xl bg-white p-6">
            <h2 className="text-2xl font-heading text-accent">{editing.id ? "Edit wedding inquiry" : "Create wedding inquiry"}</h2>
            <form onSubmit={saveInquiry} className="mt-5 grid gap-4 md:grid-cols-2">
              <Input value={editing.familyName} onChange={(event) => setEditing({ ...editing, familyName: event.target.value })} placeholder="Family name" required />
              <Input value={editing.phone} onChange={(event) => setEditing({ ...editing, phone: event.target.value })} placeholder="Primary WhatsApp number" required />
              <Input
                type="date"
                value={editing.functionStartDate || editing.functionDate}
                onChange={(event) =>
                  setEditing({ ...editing, functionStartDate: event.target.value, functionDate: event.target.value })
                }
                required
              />
              <Input
                type="date"
                value={editing.functionEndDate || ""}
                onChange={(event) => setEditing({ ...editing, functionEndDate: event.target.value })}
                required
              />
              <Input type="number" min={1} value={editing.daysBlocked || 1} onChange={(event) => setEditing({ ...editing, daysBlocked: Number(event.target.value) })} placeholder="Days blocked e.g. 2 or 3" />
              <Input type="number" min={1} value={editing.guestCount} onChange={(event) => setEditing({ ...editing, guestCount: Number(event.target.value) })} placeholder="Guest number e.g. 500" required />
              <Input type="number" min={0} value={editing.roomsRequired} onChange={(event) => setEditing({ ...editing, roomsRequired: Number(event.target.value) })} placeholder="Rooms required e.g. 50" />
              <select value={editing.venueRequirement || ""} onChange={(event) => setEditing({ ...editing, venueRequirement: event.target.value })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm">
                <option value="">Venue requirement</option>
                {venueOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as InquiryStatus })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm">
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="site_visit">Site Visit</option>
                <option value="booking_done">Booking Done</option>
                <option value="closed">Closed</option>
              </select>
              <select value={editing.priority} onChange={(event) => setEditing({ ...editing, priority: event.target.value as Priority })} className="h-11 rounded-2xl border border-border bg-white/80 px-4 text-sm md:col-span-2">
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <textarea
                value={editing.additionalPhones || ""}
                onChange={(event) => setEditing({ ...editing, additionalPhones: event.target.value })}
                placeholder="Other contact numbers / persons e.g. 9829..., 9602..."
                rows={2}
                className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm md:col-span-2"
              />
              <textarea
                value={editing.notes}
                onChange={(event) => setEditing({ ...editing, notes: event.target.value })}
                placeholder="Notes: 23, 24, 25 November, food, rooms, venue block, special requirements"
                rows={3}
                className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm md:col-span-2"
              />
              <div className="flex gap-3 md:col-span-2">
                <Button type="submit" className="flex-1">Save inquiry</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
