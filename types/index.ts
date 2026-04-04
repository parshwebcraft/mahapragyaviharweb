// ROOM TYPES
export type RoomType = "AC" | "NON_AC";

export type RoomStatus = "available" | "booked" | "maintenance";

// BOOKING STATUS
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "rejected";

// SPACE TYPES
export type SpaceType = "hall" | "garden" | "kitchen";

// EVENT TYPES
export type EventType =
  | "wedding"
  | "engagement"
  | "corporate"
  | "pravachan"
  | "music";

// ROOM MODEL
export interface Room {
  id: string;
  room_number: string;
  room_type: RoomType;

  price_per_night: number; // better naming
  capacity: number;

  status: RoomStatus;

  amenities: string[];

  description?: string; // for SEO / UI
}

// EVENT SPACE MODEL
export interface Space {
  id: string;
  name: string;

  type: SpaceType;

  capacity: number;

  price_per_day: number;

  image: string;

  description?: string;
}

// BOOKING MODEL
export interface Booking {
  id: string;

  user_id: string;

  room_id?: string | null;
  space_id?: string | null;

  checkin: string;
  checkout: string;

  status: BookingStatus;

  total_price: number;

  booking_type:
    | "room"
    | "hourly_event"
    | "full_day_event"
    | "wedding_package";

  event_type?: EventType; // NEW (important for events)

  notes?: string | null;

  created_at?: string;
}

// DASHBOARD METRICS
export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
}