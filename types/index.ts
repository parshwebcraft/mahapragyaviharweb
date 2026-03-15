export type RoomType = "AC" | "NON_AC";
export type BookingStatus = "pending" | "confirmed" | "rejected" | "cancelled";
export type SpaceType = "hall" | "garden" | "kitchen";
export type EventType =
  | "wedding"
  | "engagement"
  | "corporate"
  | "pravachan"
  | "music";

export interface Room {
  id: string;
  room_number: string;
  room_type: RoomType;
  price: number;
  capacity: number;
  status: "available" | "blocked" | "maintenance";
  amenities: string[];
}

export interface Space {
  id: string;
  name: string;
  capacity: number;
  price: number;
  type: SpaceType;
  image: string;
}

export interface Booking {
  id: string;
  user_id: string;
  room_id?: string | null;
  space_id?: string | null;
  checkin: string;
  checkout: string;
  status: BookingStatus;
  total_price: number;
  booking_type: "room" | "hourly_event" | "full_day_event" | "wedding_package";
  notes?: string | null;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
}
