"use client";

import { useEffect, useState } from "react";

import { roomInventorySeed, type RoomRecord, type RoomStatus } from "@/lib/site-content";

const STORAGE_KEY = "mahapragya-vihar-room-inventory";

function readInventory() {
  if (typeof window === "undefined") return roomInventorySeed;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return roomInventorySeed;

    const parsed = JSON.parse(stored) as RoomRecord[];
    if (!Array.isArray(parsed) || parsed.length !== roomInventorySeed.length) {
      return roomInventorySeed;
    }

    return parsed;
  } catch {
    return roomInventorySeed;
  }
}

export function useRoomInventory() {
  const [rooms, setRooms] = useState<RoomRecord[]>(roomInventorySeed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRooms(readInventory());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms, ready]);

  function updateRoom(roomId: string, patch: Partial<RoomRecord>) {
    setRooms((current) => current.map((room) => (room.id === roomId ? { ...room, ...patch } : room)));
  }

  function setAllRooms(status: RoomStatus) {
    setRooms((current) =>
      current.map((room) => ({
        ...room,
        status,
        note:
          status === "empty"
            ? "Ready for guest check-in"
            : status === "occupied"
              ? "Currently occupied"
              : "Under maintenance"
      }))
    );
  }

  function resetRooms() {
    setRooms(roomInventorySeed);
  }

  return {
    rooms,
    ready,
    updateRoom,
    setAllRooms,
    resetRooms
  };
}
