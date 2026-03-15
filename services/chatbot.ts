import { rooms, spaces } from "@/lib/mock-data";

const scriptedAnswers = [
  {
    keywords: ["room", "price"],
    answer:
      "AC rooms begin at Rs. 4,200 per night and Non-AC rooms begin at Rs. 2,800, with weekend and festival pricing applied automatically."
  },
  {
    keywords: ["hall", "availability"],
    answer:
      "We have three halls plus the garden and kitchen area. Availability is admin-controlled, so the system can guide users and then route event bookings for approval."
  },
  {
    keywords: ["location"],
    answer:
      "Mahapragya Vihar is located in Bhuwana, Udaipur. Booking confirmations can include a direct Google Maps location link via WhatsApp."
  },
  {
    keywords: ["facilities"],
    answer:
      `Guests can access ${rooms[0]?.amenities.join(", ")} along with serene spiritual surroundings, event infrastructure, and curated stay packages.`
  }
];

export function getChatbotReply(message: string) {
  const lower = message.toLowerCase();
  const match = scriptedAnswers.find((item) =>
    item.keywords.every((keyword) => lower.includes(keyword))
  );

  if (match) return match.answer;

  return `I can help with room prices, ${spaces.length} event spaces, availability guidance, campus location, and booking flows.`;
}
