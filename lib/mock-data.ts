import type { DashboardMetric, Room, Space } from "@/types";

export const rooms: Room[] = Array.from({ length: 36 }, (_, index) => {
  const ac = index < 18;

  return {
    id: `room-${index + 1}`,
    room_number: `${ac ? "A" : "N"}-${String(index + 1).padStart(2, "0")}`,
    room_type: ac ? "AC" : "NON_AC",
    price: ac ? 4200 : 2800,
    capacity: 2,
    status: "available",
    amenities: ["Temple view", "Hot water", "Satvik dining access", "Wi-Fi"]
  };
});

export const spaces: Space[] = [
  {
    id: "hall-samadhi",
    name: "Samadhi Hall",
    capacity: 350,
    price: 75000,
    type: "hall",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "hall-pravachan",
    name: "Pravachan Hall",
    capacity: 220,
    price: 55000,
    type: "hall",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "hall-sanskriti",
    name: "Mahashraman Sabhaghar",
    capacity: 120,
    price: 38000,
    type: "hall",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "garden-shanti",
    name: "Shanti Garden",
    capacity: 500,
    price: 60000,
    type: "garden",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "kitchen-seva",
    name: "Seva Kitchen Area",
    capacity: 50,
    price: 15000,
    type: "kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80"
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Total bookings", value: "128", delta: "+18% month-on-month" },
  { label: "Monthly revenue", value: "₹18.4L", delta: "+11% against plan" },
  { label: "Room occupancy", value: "82%", delta: "Weekend peak 96%" },
  { label: "Pending approvals", value: "7", delta: "2 need same-day review" }
];
