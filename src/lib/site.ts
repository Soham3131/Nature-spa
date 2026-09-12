/**
 * Production origin, used for canonical URLs, the sitemap, robots.txt and the
 * absolute image URLs in our social cards.
 *
 * The www host is the canonical one — naturewellnesspa.in redirects to it — so
 * every URL we publish has to agree, or Google sees two copies of the site.
 * NEXT_PUBLIC_SITE_URL overrides this for preview or staging deploys; it does
 * not need to be set for production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.naturewellnesspa.in"
).replace(/\/$/, "");

export const site = {
  name: "The Nature Spa",
  tagline: "Luxury Wellness & Body Spa in Gurugram",
  shortDesc:
    "A premium sanctuary in the heart of Gurugram where ancient healing rituals meet modern luxury. Signature massages, aroma therapies and hammam experiences by certified therapists.",
  address: {
    line1: "2nd Floor, 42, Metro Mall Road, near Metro World Mall, Block B, Sector 56",
    line2: "Gurugram, Haryana 122011",
    city: "Gurugram",
    region: "Haryana",
    postalCode: "122011",
    country: "IN",
  },
  hours: "Open daily · 10:00 AM – 9:30 PM",
  phoneDisplay: "+91 87968 67787",
  phoneRaw: "918796867787",
  email: "thenaturespa9@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/thenaturespa01/",
    facebook: "https://www.facebook.com/profile.php?id=61593944502619",
    google:
      "https://www.google.com/maps/place/The+Nature+Spa/@28.4285281,77.0995597,17z/data=!3m1!4b1!4m6!3m5!1s0x390d19a371d82d83:0x3cd5765dea970b21!8m2!3d28.4285281!4d77.0995597!16s%2Fg%2F11zdf2n2x2",
  },
  /**
   * The walkthrough video on our Google Business Profile. Google does not
   * publish a permanent direct URL for profile videos — this short link opens
   * the clip in the Maps photo viewer, which is as close as it gets. Put the
   * film on YouTube if we ever want it playing inside the page.
   */
  videoTour: "https://maps.app.goo.gl/SFszxfCt4G1ymDnC7?g_st=ac",
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
