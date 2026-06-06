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
  { href: "/rooms", label: "Venue" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/admin", label: "Admin" }
];

export const footerLinks = [
  { href: "/rooms", label: "Venue" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms and Condition" },
  { href: "/privacy", label: "Privacy Policy" }
];

export const galleryImages = [
  "/WhatsApp Image 2026-05-10 at 11.18.10.jpeg",
  "/room-1.jpg",
  "/room-2.JPG",
  "/room3.jpg",
  "/room4.jpg"
];

const supabaseStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/business-assets/mahapragya-vihar/gallery`
  : "";

function galleryVideoUrl(fileName: string) {
  return supabaseStorageUrl ? `${supabaseStorageUrl}/${fileName}` : `/${fileName}`;
}

export const galleryVideos = [
  galleryVideoUrl("IMG_1013.MOV"),
  galleryVideoUrl("IMG_1026.MOV"),
  galleryVideoUrl("IMG_1038.MOV")
];

export type GalleryEmbeddedVideo = {
  title: string;
  sourceLabel: string;
  url: string;
};

export const galleryEmbeddedVideos: GalleryEmbeddedVideo[] = [
  {
    title: "Mahapragya Vihar YouTube Reel",
    sourceLabel: "YouTube Reel",
    url: "https://youtu.be/OH-llMTsisA"
  }
];

export function getEmbeddedVideoUrl(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId =
        parsed.searchParams.get("v") ||
        parsed.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1];
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    }

    if (hostname === "drive.google.com") {
      const fileId =
        parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ||
        parsed.searchParams.get("id");
      return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
    }

    return url;
  } catch {
    return url;
  }
}

export const contactDetails = {
  address: "Mahapragya Vihar, Bhuwana, Udaipur, Rajasthan, India",
  phone: "+91 77339 92007", 
  email: "mahapragyavihar@gmail.com",
  supportEmail: "mahapragyavihar@gmail.com",
  hours: "Daily, 9:00 AM - 7:00 PM"
};

export const siteHighlights = [
  "Venue and AC room options",
  "Peaceful campus with event spaces",
  "Simple room availability tracking",
  "Helpful contact and support pages"
];

export const roomInventorySeed: RoomRecord[] = Array.from({ length: 50 }, (_, index) => {
  const acRoom = index < 40;
  const roomNumber = `${acRoom ? "A" : "N"}-${String(acRoom ? index + 1 : index - 39).padStart(2, "0")}`;
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
