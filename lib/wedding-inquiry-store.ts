import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import type { WeddingInquiry } from "@/lib/admin-mock-data";

export interface WeddingInquiryInput {
  id?: string;
  familyName?: string;
  phone?: string;
  functionDate?: string;
  guestCount?: number;
  roomsRequired?: number;
  notes?: string;
  status?: WeddingInquiry["status"];
  priority?: WeddingInquiry["priority"];
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "wedding-inquiries.json");

async function ensureFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(INQUIRIES_FILE, "utf8");
  } catch {
    await writeFile(INQUIRIES_FILE, "[]", "utf8");
  }
}

async function writeInquiries(inquiries: WeddingInquiry[]) {
  await ensureFile();
  await writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");
}

export async function readWeddingInquiries(): Promise<WeddingInquiry[]> {
  await ensureFile();

  try {
    const parsed = JSON.parse(await readFile(INQUIRIES_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function validateInquiry(input: WeddingInquiryInput) {
  const familyName = input.familyName?.trim();
  const phone = input.phone?.trim();
  const functionDate = input.functionDate?.trim();
  const guestCount = Number(input.guestCount);
  const roomsRequired = Number(input.roomsRequired || 0);
  const notes = input.notes?.trim() || "";
  const status = input.status || "new";
  const priority = input.priority || "medium";

  if (!familyName || !phone || !functionDate) {
    throw new Error("Family name, phone and function date are required.");
  }

  if (!Number.isFinite(guestCount) || guestCount < 1) {
    throw new Error("Guest count must be valid.");
  }

  if (!Number.isFinite(roomsRequired) || roomsRequired < 0) {
    throw new Error("Rooms required must be valid.");
  }

  return { familyName, phone, functionDate, guestCount, roomsRequired, notes, status, priority };
}

export async function createWeddingInquiry(input: WeddingInquiryInput) {
  const inquiries = await readWeddingInquiries();
  const inquiry: WeddingInquiry = {
    id: `WI-${String(Date.now()).slice(-6)}`,
    ...validateInquiry(input)
  };

  await writeInquiries([inquiry, ...inquiries]);
  return inquiry;
}

export async function updateWeddingInquiry(id: string, input: WeddingInquiryInput) {
  const inquiries = await readWeddingInquiries();
  const existing = inquiries.find((inquiry) => inquiry.id === id);

  if (!existing) {
    throw new Error("Wedding inquiry not found.");
  }

  const updated: WeddingInquiry = { ...existing, ...validateInquiry(input), id };
  await writeInquiries(inquiries.map((inquiry) => (inquiry.id === id ? updated : inquiry)));
  return updated;
}

export async function deleteWeddingInquiry(id: string) {
  const inquiries = await readWeddingInquiries();
  const nextInquiries = inquiries.filter((inquiry) => inquiry.id !== id);

  if (nextInquiries.length === inquiries.length) {
    throw new Error("Wedding inquiry not found.");
  }

  await writeInquiries(nextInquiries);
}
