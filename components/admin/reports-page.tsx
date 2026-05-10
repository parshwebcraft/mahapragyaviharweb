"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card } from "@/components/ui/card";
import { monthlyBookingChart, type Employee, type SalaryRecord } from "@/lib/admin-mock-data";
import type { RoomBooking } from "@/lib/booking-store";
import { formatINR } from "@/utils/currency";

function buildMonthlyChart(bookings: RoomBooking[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();

  return months.map((month, index) => {
    const monthBookings = bookings.filter((booking) => {
      const date = new Date(`${booking.checkIn}T00:00:00`);
      return date.getFullYear() === currentYear && date.getMonth() === index;
    });
    const bookedRooms = monthBookings.reduce((total, booking) => total + booking.roomCount, 0);

    return {
      month,
      bookings: monthBookings.length,
      revenue: bookedRooms * 2000,
      occupancy: Math.min(100, Math.round((bookedRooms / 50) * 100))
    };
  });
}

export function ReportsPage({
  bookings = [],
  employees = [],
  salaries = []
}: {
  bookings?: RoomBooking[];
  employees?: Employee[];
  salaries?: SalaryRecord[];
}) {
  const chartData = bookings.length > 0 ? buildMonthlyChart(bookings) : monthlyBookingChart;
  const estimatedRevenue = chartData.reduce((total, item) => total + item.revenue, 0);
  const avgOccupancy = Math.round(
    chartData.reduce((total, item) => total + item.occupancy, 0) / chartData.length
  );
  const paidSalary = salaries.filter((salary) => salary.status === "paid").reduce((total, salary) => total + salary.salary - salary.advance, 0);
  const attendanceStats = employees.map((employee) => ({ name: employee.name.split(" ")[0], attendance: 0 }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">Estimated Revenue</p><p className="mt-2 text-3xl font-heading text-accent">{formatINR(estimatedRevenue)}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Avg Occupancy</p><p className="mt-2 text-3xl font-heading text-accent">{avgOccupancy}%</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Booking Growth</p><p className="mt-2 text-3xl font-heading text-accent">0%</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Paid Salary</p><p className="mt-2 text-3xl font-heading text-accent">{formatINR(paidSalary)}</p></Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-2xl font-heading text-accent">Monthly bookings</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eadfca" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#7A1E1E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-2xl font-heading text-accent">Occupancy analytics</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eadfca" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="occupancy" stroke="#7A1E1E" fill="#F5D36A" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-2xl font-heading text-accent">Employee attendance stats</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eadfca" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#d1a940" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-2xl font-heading text-accent">Revenue estimate</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eadfca" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatINR(Number(value))} />
                <Line type="monotone" dataKey="revenue" stroke="#7A1E1E" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
