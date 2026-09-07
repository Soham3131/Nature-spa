/**
 * ⚠️  ACTION REQUIRED — REPLACE WITH YOUR REAL GOOGLE REVIEWS
 *
 * These entries are PLACEHOLDERS so the section renders correctly.
 * Open your Google Business listing, copy the reviewer name, star rating,
 * date and review text for each real review, and paste them below.
 * Nothing else in the codebase needs to change — the carousel, the average
 * rating badge and the JSON-LD structured data all read from this array.
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
};

export const reviews: Review[] = [
  {
    name: "Placeholder — replace me",
    initials: "R1",
    rating: 5,
    date: "Recent",
    text: "Paste your first real Google review here. Keep the reviewer's own wording — authentic reviews convert far better than polished copy.",
    source: "Google",
  },
  {
    name: "Placeholder — replace me",
    initials: "R2",
    rating: 5,
    date: "Recent",
    text: "Paste your second real Google review here.",
    source: "Google",
  },
  {
    name: "Placeholder — replace me",
    initials: "R3",
    rating: 5,
    date: "Recent",
    text: "Paste your third real Google review here.",
    source: "Google",
  },
  {
    name: "Placeholder — replace me",
    initials: "R4",
    rating: 5,
    date: "Recent",
    text: "Paste your fourth real Google review here.",
    source: "Google",
  },
  {
    name: "Placeholder — replace me",
    initials: "R5",
    rating: 5,
    date: "Recent",
    text: "Paste your fifth real Google review here.",
    source: "Google",
  },
  {
    name: "Placeholder — replace me",
    initials: "R6",
    rating: 5,
    date: "Recent",
    text: "Paste your sixth real Google review here.",
    source: "Google",
  },
];

export const averageRating =
  Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
