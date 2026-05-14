import { deleteRecord, readCollection, upsertRecord } from "@/lib/supabase-record-store";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface RoomBooking {
  id: string;
  guestName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomCount: number;
  roomType: string;
  roomAssigned: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BookingInput {
  id?: string;
  guestName?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  roomCount?: number;
  roomType?: string;
  roomAssigned?: string;
  notes?: string;
  status?: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}

const COLLECTION = "bookings";

export async function readBookings(): Promise<RoomBooking[]> {
  const bookings = await readCollection<RoomBooking>(COLLECTION);
  return bookings.sort((a, b) => {
      const checkInDiff = String(a.checkIn).localeCompare(String(b.checkIn));
      if (checkInDiff !== 0) return checkInDiff;
      return String(b.createdAt).localeCompare(String(a.createdAt));
    });
}

function validateBooking(input: BookingInput) {
  const guestName = input.guestName?.trim();
  const phone = input.phone?.trim();
  const checkIn = input.checkIn?.trim();
  const checkOut = input.checkOut?.trim();
  const roomCount = Number(input.roomCount);
  const roomType = input.roomType?.trim() || "AC Room";
  const roomAssigned = input.roomAssigned?.trim() || "Pending";
  const notes = input.notes?.trim() || "";
  const status = input.status || "pending";

  if (!guestName || !phone || !checkIn || !checkOut) {
    throw new Error("Name, phone, check-in and check-out are required.");
  }

  if (!Number.isInteger(roomCount) || roomCount < 1 || roomCount > 50) {
    throw new Error("Room count must be between 1 and 50.");
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    throw new Error("Check-out date must be after check-in date.");
  }

  if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
    throw new Error("Invalid booking status.");
  }

  return {
    guestName,
    phone,
    checkIn,
    checkOut,
    roomCount,
    roomType,
    roomAssigned,
    notes,
    status
  };
}

export async function createBooking(input: BookingInput) {
  const values = validateBooking(input);
  const now = new Date().toISOString();

  const booking: RoomBooking = {
    id: input.id || `booking-${Date.now()}`,
    ...values,
    createdAt: now,
    updatedAt: now
  };

  return upsertRecord(COLLECTION, booking);
}

export async function updateBooking(id: string, input: BookingInput) {
  const values = validateBooking(input);

  const updated: RoomBooking = {
    id,
    ...values,
    createdAt: "createdAt" in input && typeof input.createdAt === "string" ? input.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return upsertRecord(COLLECTION, updated);
}

export async function deleteBooking(id: string) {
  await deleteRecord(COLLECTION, id);
}
