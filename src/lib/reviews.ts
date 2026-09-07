/**
 * ⚠️  ACTION REQUIRED — REPLACE WITH YOUR REAL GOOGLE REVIEWS
 *
 * These are PLACEHOLDERS. Open your Google Business listing, copy each real
 * reviewer's name, star rating, date and text, and paste them in below, then
 * remove the `sample: true` line so the "Sample" chip stops showing.
 *
 * They are deliberately left as obvious placeholders rather than invented
 * testimonials: made-up reviews on a live business page are a real problem,
 * and fake ones would also poison the review structured data that Google
 * reads from this file.
 *
 * Nothing else needs changing — the carousel, the rating badge and the
 * JSON-LD all read from this array. Also update `site.rating` in
 * src/lib/site.ts to match your live listing.
 */

export type Review = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  source: "Google" | "Instagram" | "Facebook";
  /**
   * Optional photograph of the reviewer. Paste a URL here — their Google
   * profile picture, or a photo they gave you permission to use — and the card
   * shows it instead of the initials badge.
   */
  avatar?: string;
  /**
   * Marks an entry as scaffolding. While this is true the card shows a
   * "Sample" chip so placeholder copy can never be mistaken for a real
   * testimonial. Delete the line when you paste a genuine review in.
   */
  sample?: boolean;
};

export const reviews: Review[] = [
  {
    name: "Your guest's name",
    initials: "01",
    rating: 5,
    date: "Recent",
    text: "Paste your first real Google review here. Keep the guest's own wording — an honest, specific review converts far better than polished marketing copy, and it is what people scroll down to find.",
    source: "Google",
    sample: true,
  },
  {
    name: "Your guest's name",
    initials: "02",
    rating: 5,
    date: "Recent",
    text: "Paste your second real Google review here. Two or three sentences is the sweet spot — long enough to feel genuine, short enough that people actually read it.",
    source: "Google",
    sample: true,
  },
  {
    name: "Your guest's name",
    initials: "03",
    rating: 5,
    date: "Recent",
    text: "Paste your third real Google review here. Reviews that name a specific therapy or therapist are the most persuasive ones you have.",
    source: "Google",
    sample: true,
  },
  {
    name: "Your guest's name",
    initials: "04",
    rating: 5,
    date: "Recent",
    text: "Paste your fourth real Google review here, along with the reviewer's name, their star rating and roughly when they left it.",
    source: "Google",
    sample: true,
  },
  {
    name: "Your guest's name",
    initials: "05",
    rating: 5,
    date: "Recent",
    text: "Paste your fifth real Google review here. Six reviews fill both rows of the carousel nicely, but you can add as many as you like.",
    source: "Google",
    sample: true,
  },
  {
    name: "Your guest's name",
    initials: "06",
    rating: 5,
    date: "Recent",
    text: "Paste your sixth real Google review here. Set `sample` to false, or delete the line, and the Sample chip on the card disappears.",
    source: "Google",
    sample: true,
  },
];

export const averageRating =
  Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
