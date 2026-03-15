import { rooms, spaces } from "@/lib/mock-data";
import type { Booking, EventType, RoomType, SpaceType } from "@/types";
import { calculateEventPrice, calculateRoomPrice } from "@/services/pricing";

export function findAvailableRooms({
  roomType,
  guests,
  checkin,
  checkout
}: {
  roomType?: RoomType;
  guests: number;
  checkin: string;
  checkout: string;
}) {
  const filtered = rooms.filter(
    (room) =>
      room.status === "available" &&
      room.capacity >= guests &&
      (!roomType || room.room_type === roomType)
  );

  return filtered.map((room) => ({
    ...room,
    pricing: calculateRoomPrice({
      baseRate: room.price,
      checkin,
      checkout
    })
  }));
}

export function findAvailableSpaces({
  type,
  eventType,
  bookingType
}: {
  type?: SpaceType;
  eventType?: EventType;
  bookingType: Booking["booking_type"];
}) {
  const target = spaces.filter((space) => (!type ? true : space.type === type));

  return target.map((space) => ({
    ...space,
    eventType,
    quotedPrice: calculateEventPrice({
      baseRate: space.price,
      bookingType: bookingType === "room" ? "full_day_event" : bookingType
    })
  }));
}

export function autoAssignRoom(params: Parameters<typeof findAvailableRooms>[0]) {
  return findAvailableRooms(params)[0] ?? null;
}
