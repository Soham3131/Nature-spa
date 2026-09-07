/**
 * ⚠️  SAMPLE CONTENT — REPLACE BEFORE THE SITE GOES LIVE
 *
 * These six entries are placeholder testimonials written to fill out the
 * design, paired with stock portraits from Unsplash. They exist so a client
 * review of the layout is not full of "lorem ipsum" — they are not real
 * guests, and every card carries a "Sample" chip so nobody can mistake them
 * for real ones.
 *
 * To go live: open your Google Business listing, replace `name`, `text`,
 * `rating` and `date` with real reviews, swap `avatar` for the reviewer's own
 * photo (or delete the line to fall back to an initials badge), and remove
 * `sample: true` — the chip disappears with it.
 *
 * Publishing these as though they were genuine would be inventing customer
 * testimonials, and they would also feed the `Review` structured data that
 * Google reads from this file, so please do swap them out.
 *
 * Also update `site.rating` in src/lib/site.ts to match your live listing.
 */

export type Review = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  source: "Google" | "Instagram" | "Facebook";
  /**
   * Photograph of the reviewer. Their Google profile picture, or a photo they
   * gave you permission to use. Delete it and the card shows initials instead.
   */
  avatar?: string;
  /** While true the card shows a "Sample" chip. Delete it for real reviews. */
  sample?: boolean;
};

const face = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=facearea&facepad=2.6&w=160&h=160&q=80`;

export const reviews: Review[] = [
  {
    name: "Ananya Sharma",
    initials: "AS",
    rating: 5,
    date: "2 weeks ago",
    text: "Booked the Signature Nature Ritual after a brutal quarter at work. The therapist actually asked where I was holding tension instead of just following a script, and spent most of the ninety minutes on my shoulders. I slept properly for the first time in weeks.",
    source: "Google",
    avatar: face("1595754883593-e274aaa13580"),
    sample: true,
  },
  {
    name: "Rohit Malhotra",
    initials: "RM",
    rating: 5,
    date: "1 month ago",
    text: "I drive to Cyber City every day and my lower back had been complaining for months. Two deep tissue sessions here and it has stopped. Firm pressure, no small talk, exactly what I wanted.",
    source: "Google",
    avatar: face("1618306842557-a2515acf2112"),
    sample: true,
  },
  {
    name: "Priya Nair",
    initials: "PN",
    rating: 5,
    date: "3 weeks ago",
    text: "Spotless rooms and genuinely warm staff. They walked me through the room before I committed, which I appreciated. The lemongrass aroma therapy was the right call for a Saturday afternoon.",
    source: "Google",
    avatar: face("1770838447151-05a876cdee3d"),
    sample: true,
  },
  {
    name: "Karan Mehta",
    initials: "KM",
    rating: 5,
    date: "1 month ago",
    text: "Took my wife for the couple suite on our anniversary. They had it set with candles when we walked in and gave us the room to ourselves for the full hour and a half. Worth every rupee.",
    source: "Google",
    avatar: face("1649433658557-54cf58577c68"),
    sample: true,
  },
  {
    name: "Divya Sethi",
    initials: "DS",
    rating: 5,
    date: "2 months ago",
    text: "The hammam scrub left my skin properly glowing for days. I was nervous about the pressure and they adjusted it the moment I said so. Booking again before Diwali.",
    source: "Google",
    avatar: face("1544264796-acfb69e05b37"),
    sample: true,
  },
  {
    name: "Arjun Bhatia",
    initials: "AB",
    rating: 5,
    date: "3 weeks ago",
    text: "Came in for a quick foot reflexology between meetings and did not expect much. Left feeling like I had slept for an hour. Easy to book over WhatsApp too.",
    source: "Google",
    avatar: face("1624202090198-d6f758540f18"),
    sample: true,
  },
];

export const averageRating =
  Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
