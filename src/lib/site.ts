export const site = {
  name: "The Nature Spa",
  tagline: "Luxury Wellness & Body Spa in Gurugram",
  shortDesc:
    "A premium sanctuary in the heart of Gurugram where ancient healing rituals meet modern luxury. Signature massages, aroma therapies and hammam experiences by certified therapists.",
  // TODO: replace with your exact street address / landmark
  address: {
    line1: "Sector 14 Market",
    line2: "Gurugram, Haryana 122001",
    city: "Gurugram",
    region: "Haryana",
    postalCode: "122001",
    country: "IN",
  },
  hours: "Open daily · 10:00 AM – 9:30 PM",
  phoneDisplay: "+91 89505 07450",
  phoneRaw: "918950507450",
  email: "thenaturespa9@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/thenaturespa01/",
    facebook: "https://www.facebook.com/profile.php?id=61593944502619",
    google: "https://share.google/0paYzNDs4YWZt8Bs0",
  },
  // Google rating shown on the site — update to match your live listing
  rating: { value: 4.9, count: 180 },
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.phoneRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage =
  `Hi ${site.name}! I'd like to know more about your spa therapies and book an appointment.`;
