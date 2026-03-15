import type { Booking } from "@/types";
import { createSupabaseServerClient } from "@/supabase/server";

export async function getDashboardSnapshot() {
  const supabase = createSupabaseServerClient();
  const [{ count: totalBookings }, { data: recentPayments }, { data: pendingEvents }] =
    await Promise.all([
      supabase.from("bookings").select("*", { count: "exact", head: true }),
      supabase.from("payments").select("amount, created_at").order("created_at", { ascending: false }).limit(8),
      supabase.from("bookings").select("id, booking_type, status").eq("status", "pending").limit(10)
    ]);

  return {
    totalBookings: totalBookings ?? 0,
    recentPayments: recentPayments ?? [],
    pendingEvents: pendingEvents ?? []
  };
}

export async function createBooking(payload: Partial<Booking>) {
  const supabase = createSupabaseServerClient();
  return supabase.from("bookings").insert(payload).select("*").single();
}
