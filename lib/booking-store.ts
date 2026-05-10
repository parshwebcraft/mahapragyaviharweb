import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

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
  guestName?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  roomCount?: number;
  roomType?: string;
  roomAssigned?: string;
  notes?: string;
  status?: BookingStatus;
}

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(BOOKINGS_FILE, "utf8");
  } catch {
    await writeFile(BOOKINGS_FILE, "[]", "utf8");
  }
}

export async function readBookings(): Promise<RoomBooking[]> {
  await ensureDataFile();

  try {
    const raw = await readFile(BOOKINGS_FILE, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.sort((a, b) => {
      const checkInDiff = String(a.checkIn).localeCompare(String(b.checkIn));
      if (checkInDiff !== 0) return checkInDiff;
      return String(b.createdAt).localeCompare(String(a.createdAt));
    });
  } catch {
    return [];
  }
}

async function writeBookings(bookings: RoomBooking[]) {
  await ensureDataFile();
  await writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8");
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
    id: `booking-${Date.now()}`,
    ...values,
    createdAt: now,
    updatedAt: now
  };

  const bookings = await readBookings();
  await writeBookings([booking, ...bookings]);

  return booking;
}

export async function updateBooking(id: string, input: BookingInput) {
  const values = validateBooking(input);
  const bookings = await readBookings();
  const existing = bookings.find((booking) => booking.id === id);

  if (!existing) {
    throw new Error("Booking not found.");
  }

  const updated: RoomBooking = {
    ...existing,
    ...values,
    updatedAt: new Date().toISOString()
  };

  await writeBookings(bookings.map((booking) => (booking.id === id ? updated : booking)));
  return updated;
}

export async function deleteBooking(id: string) {
  const bookings = await readBookings();
  const nextBookings = bookings.filter((booking) => booking.id !== id);

  if (nextBookings.length === bookings.length) {
    throw new Error("Booking not found.");
  }

  await writeBookings(nextBookings);
}
