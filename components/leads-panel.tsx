"use client";

import { useEffect, useState } from "react";

export function LeadsPanel() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then(setLeads);
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-heading text-accent">
        Incoming Leads
      </h2>

      <div className="mt-6 grid gap-4">
        {leads.length === 0 && (
          <p>No leads yet</p>
        )}

        {leads.map((lead) => (
          <div
            key={lead.id}
            className="border p-4 rounded-2xl"
          >
            <p><b>Type:</b> {lead.type}</p>

            {lead.checkIn && (
              <p>Check-in: {lead.checkIn}</p>
            )}

            {lead.checkOut && (
              <p>Check-out: {lead.checkOut}</p>
            )}

            <p className="text-xs text-gray-500">
              {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}