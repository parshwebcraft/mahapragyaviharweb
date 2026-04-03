export type RoomStatus = "empty" | "occupied" | "maintenance";

export interface RoomRecord {
  id: string;
  room_number: string;
  room_type: "AC" | "NON_AC";
  price: number;
  capacity: number;
  status: RoomStatus;
  note: string;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/admin", label: "Admin" }
];

export const footerLinks = [
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms and Condition" },
  { href: "/privacy", label: "Privacy Policy" }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
];

export const contactDetails = {
  address: "Mahapragya Vihar, Bhuwana, Udaipur, Rajasthan, India",
  phone: "+91 77339 92007", 
  email: "mahapragyavihar@gmail.com",
  supportEmail: "mahapragyavihar@gmail.com",
  hours: "Daily, 9:00 AM - 7:00 PM"
};

export const siteHighlights = [
  "AC and Non-AC room options",
  "Peaceful campus with event spaces",
  "Simple room availability tracking",
  "Helpful contact and support pages"
];

export const roomInventorySeed: RoomRecord[] = Array.from({ length: 36 }, (_, index) => {
  const acRoom = index < 18;
  const roomNumber = `${acRoom ? "A" : "N"}-${String((index % 18) + 1).padStart(2, "0")}`;
  const status: RoomStatus =
    index % 11 === 0 ? "maintenance" : index % 4 === 0 ? "occupied" : "empty";

  return {
    id: `room-${index + 1}`,
    room_number: roomNumber,
    room_type: acRoom ? "AC" : "NON_AC",
    price: acRoom ? 4200 : 2800,
    capacity: 2,
    status,
    note:
      status === "empty"
        ? "Ready for guest check-in"
        : status === "occupied"
          ? "Currently occupied"
          : "Under maintenance"
  };
});
