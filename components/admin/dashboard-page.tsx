import { ArrowRight, BedDouble, CalendarDays, ClipboardCheck, Users } from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminRooms, employees, weddingInquiries, type AdminBooking } from "@/lib/admin-mock-data";
import type { Employee, WeddingInquiry } from "@/lib/admin-mock-data";
import type { RoomBooking } from "@/lib/booking-store";

function fromSavedBooking(booking: RoomBooking): AdminBooking {
  return {
    id: booking.id,
    guestName: booking.guestName,
    phone: booking.phone,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    roomAssigned: "Pending",
    roomCount: booking.roomCount,
    status: booking.status === "confirmed" ? "confirmed" : booking.status === "cancelled" ? "cancelled" : "pending",
    source: "Website"
  };
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof BedDouble }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-4xl font-heading text-accent">{value}</p>
        </div>
        <div className="rounded-2xl bg-primary/35 p-3 text-accent">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

export function DashboardPage({
  savedBookings = [],
  savedEmployees = [],
  savedWeddingInquiries = []
}: {
  savedBookings?: RoomBooking[];
  savedEmployees?: Employee[];
  savedWeddingInquiries?: WeddingInquiry[];
}) {
  const adminBookings = savedBookings.map(fromSavedBooking);
  const activeWeddingInquiries = savedWeddingInquiries.length > 0 ? savedWeddingInquiries : weddingInquiries;
  const occupiedRooms = adminRooms.filter((room) => room.status === "occupied").length;
  const availableRooms = adminRooms.filter((room) => room.status === "available").length;
  const weddingBookingsCount = activeWeddingInquiries.length;
  const occupancy = Math.round((occupiedRooms / adminRooms.length) * 100);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyBookings = savedBookings.filter((booking) => booking.checkIn.startsWith(currentMonth)).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard label="Total Rooms" value={adminRooms.length} icon={BedDouble} />
        <StatCard label="Occupied Rooms" value={occupiedRooms} icon={ClipboardCheck} />
        <StatCard label="Available Rooms" value={availableRooms} icon={BedDouble} />
        <StatCard label="Total Employees" value={savedEmployees.length || employees.length} icon={Users} />
        <StatCard label="Monthly Bookings" value={monthlyBookings} icon={CalendarDays} />
        <StatCard label="Wedding Bookings" value={weddingBookingsCount} icon={ClipboardCheck} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-heading text-accent">Recent bookings</h2>
              <p className="text-sm text-muted-foreground">Latest room requests and assigned rooms.</p>
            </div>
            <Link href="/admin/bookings">
              <Button variant="outline" size="sm">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto rounded-2xl border bg-white/70">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Dates</th>
                  <th className="px-4 py-3">Rooms</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminBookings.length === 0 && (
                  <tr>
                    <td className="px-4 py-5 text-muted-foreground" colSpan={4}>
                      No bookings yet. Add a fresh booking from the public booking form.
                    </td>
                  </tr>
                )}

                {adminBookings.map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-accent">{booking.guestName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{booking.checkIn} to {booking.checkOut}</td>
                    <td className="px-4 py-3">{booking.roomCount}</td>
                    <td className="px-4 py-3"><StatusBadge value={booking.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-2xl font-heading text-accent">Occupancy</h2>
          <p className="text-sm text-muted-foreground">Current room utilization across 50 AC rooms.</p>
          <div className="mt-6">
            <div className="flex items-end justify-between">
              <span className="text-5xl font-heading text-accent">{occupancy}%</span>
              <span className="text-sm text-muted-foreground">{occupiedRooms} occupied</span>
            </div>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent" style={{ width: `${occupancy}%` }} />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {activeWeddingInquiries.length === 0 && (
              <div className="rounded-2xl border bg-white/70 p-4 text-sm text-muted-foreground">
                No wedding bookings yet.
              </div>
            )}

            {activeWeddingInquiries.slice(0, 3).map((inquiry) => (
              <div key={inquiry.id} className="rounded-2xl border bg-white/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-accent">{inquiry.familyName}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.functionDate} · {inquiry.guestCount} guests</p>
                  </div>
                  <StatusBadge value={inquiry.priority} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-2xl font-heading text-accent">Quick actions</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            ["Assign Room", "/admin/rooms"],
            ["Confirm Booking", "/admin/bookings"],
            ["Add Employee", "/admin/employees"],
            ["Open Reports", "/admin/reports"]
          ].map(([label, href]) => (
            <Link key={label} href={href}>
              <Button variant="outline" className="w-full justify-between">
                {label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
