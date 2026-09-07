/**
 * Content for the /home1 layout — an editorial take on the landing page that
 * keeps the scroll-scrubbed hero film untouched and rebuilds everything around
 * it.
 *
 * Business facts (names, durations, prices) are read from services.ts so there
 * is still a single source of truth; only the photography and the one-line
 * blurbs are chosen here, for the shapes this layout needs.
 */
import { services } from "./services";
import { site } from "./site";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------------------------------------------ *
 *  Signature rituals — five cards, laid out asymmetrically
 * ------------------------------------------------------------------ */

const ritualArt = [
  {
    slug: "aroma-therapy",
    image: u("1544161515-4ab6ce6db874"),
    tone: "linear-gradient(140deg,#2b2418,#8a7550 48%,#e3d2ae)",
    alt: "Warm aromatic oil being poured for a full-body massage",
  },
  {
    slug: "balinese-massage",
    image: u("1709755491926-f7aa83748967"),
    tone: "linear-gradient(140deg,#1f2a22,#5e7a5c 48%,#cfdcc4)",
    alt: "A therapist working along the shoulders during a Balinese massage",
  },
  {
    slug: "deep-tissue",
    image: u("1519823551278-64ac92734fb1"),
    tone: "linear-gradient(140deg,#232a2c,#6b7a80 48%,#d5dee1)",
    alt: "Firm thumb pressure along the spine during a deep tissue session",
  },
  {
    slug: "hammam-scrub",
    image: u("1590439471364-192aa70c0b53"),
    tone: "linear-gradient(140deg,#33291f,#9c8a72 48%,#efe6d8)",
    alt: "A dry brush, soap and folded towel laid out for a body scrub",
  },
  {
    slug: "signature-nature-ritual",
    image: u("1775133262667-316bd4d9e5b5"),
    tone: "linear-gradient(140deg,#241d16,#7d6849 48%,#e0cda4)",
    alt: "Warm herbal compresses pressed along the back",
  },
  {
    slug: "thai-dry-massage",
    image: u("1749131871347-6d211039ac3e"),
    tone: "linear-gradient(140deg,#241a15,#7a5b46 48%,#dfc4a8)",
    alt: "A leg raised into a guided stretch during a Thai dry massage",
  },
  {
    slug: "couple-spa",
    image: u("1696841212541-449ca29397cc", 1600),
    tone: "linear-gradient(140deg,#1e1712,#6f5540 48%,#d9bf9c)",
    alt: "Warm stones resting along the back in a private candlelit suite",
  },
] as const;

export type Ritual = {
  slug: string;
  name: string;
  short: string;
  duration: string;
  price: string;
  image: string;
  tone: string;
  alt: string;
};

export const rituals: Ritual[] = ritualArt.map((art) => {
  const s = services.find((x) => x.slug === art.slug);
  if (!s) throw new Error(`home1: no service named "${art.slug}" in services.ts`);
  return {
    ...art,
    name: s.name,
    short: s.short,
    duration: s.duration,
    price: s.price,
  };
});

/* ------------------------------------------------------------------ *
 *  Our space — a four-tile mosaic
 * ------------------------------------------------------------------ */

export const spaceTiles = [
  // the first tile runs full height, so it wants the portrait photograph
  {
    caption: "The Ritual",
    image: u("1620733723572-11c53f73a416", 800),
    tone: "linear-gradient(140deg,#2b241c,#a08a63 50%,#f0e3c8)",
    alt: "A reed diffuser, rolled towel and lit candles on a side table",
  },
  {
    caption: "The Treatment Room",
    image: u("1731597076108-f3bbe268162f", 900),
    tone: "linear-gradient(140deg,#2a2620,#8b8168 50%,#e6ddc9)",
    alt: "A prepared therapy bed with fresh linen and a tray of oils",
  },
  {
    caption: "The Quiet Space",
    image: u("1781736363509-a2327b675a03", 700),
    tone: "linear-gradient(140deg,#2e2226,#8d6068 50%,#e9c6cb)",
    alt: "A stone soaking tub scattered with fresh flower petals",
  },
  {
    caption: "A Calm Welcome",
    image: u("1560750588-73207b1ef5b8", 900),
    tone: "linear-gradient(140deg,#1c2a20,#59775c 50%,#c8dcc6)",
    alt: "A planted courtyard lounge beside a still plunge pool",
  },
] as const;

/* ------------------------------------------------------------------ *
 *  The journey — four steps
 * ------------------------------------------------------------------ */

export const journey = [
  {
    step: "01",
    title: "Arrive",
    line: "Leave the world behind",
    image: u("1564890369478-c89ca6d9cde9", 500),
    tone: "linear-gradient(140deg,#2c241a,#8f7a55 50%,#e7d8b6)",
    alt: "A pot of herbal tea poured on arrival",
  },
  {
    step: "02",
    title: "Unwind",
    line: "Let go of the stress",
    image: u("1709755491926-f7aa83748967", 500),
    tone: "linear-gradient(140deg,#1f2a22,#5e7a5c 50%,#cfdcc4)",
    alt: "Slow strokes along the back at the start of a massage",
  },
  {
    step: "03",
    title: "Restore",
    line: "Rebalance mind & body",
    image: u("1519415510236-718bdfcd89c8", 500),
    tone: "linear-gradient(140deg,#26212a,#7a6b86 50%,#dcd2e6)",
    alt: "A warm foot soak strewn with frangipani blossoms",
  },
  {
    step: "04",
    title: "Rejuvenate",
    line: "Feel the difference",
    image: u("1509423350716-97f9360b4e09", 500),
    tone: "linear-gradient(140deg,#1c2620,#5c7a63 50%,#cfe0d2)",
    alt: "A young aloe plant in a pale stone pot",
  },
] as const;

/* ------------------------------------------------------------------ *
 *  Standalone photography used by single sections
 * ------------------------------------------------------------------ */

export const art = {
  story: {
    image: u("1775133263714-848c8fe09e73", 900),
    tone: "linear-gradient(140deg,#1d1712,#6b5238 50%,#d8bd93)",
    alt: "Warm oil poured in a slow stream across the forehead during a shirodhara ritual",
  },
  storyDetail: {
    image: u("1466781783364-36c955e42a7f", 500),
    tone: "linear-gradient(140deg,#232a22,#7d8f76 50%,#e2e9dd)",
    alt: "A cutting of fresh eucalyptus against a pale wall",
  },
  experience: {
    image: u("1600334129128-685c5582fd35", 1400),
    tone: "linear-gradient(140deg,#1a1512,#6d5a45 50%,#ddc9ad)",
    alt: "Warm basalt stones placed along the spine, frangipani blossoms alongside",
  },
  product: {
    image: u("1608571423902-eed4a5ad8108", 900),
    tone: "linear-gradient(140deg,#33281d,#a98a63 50%,#f2e4cf)",
    alt: "An amber glass serum bottle standing in soft palm-leaf shadow",
  },
  productDetail: {
    image: u("1612817288484-6f916006741a", 700),
    tone: "linear-gradient(140deg,#26291f,#7e8a68 50%,#dfe6cd)",
    alt: "Botanical skincare bottles and jars laid out with fresh leaves",
  },
  guest: {
    image: u("1784633319408-d705ebdaa6a3", 900),
    tone: "linear-gradient(140deg,#2c231a,#9a7c52 50%,#f0dcb4)",
    alt: "A guest resting with her eyes closed in warm evening light",
  },
  fern: {
    image: u("1497250681960-ef046c08a56e", 1600),
    tone: "linear-gradient(140deg,#08160c,#12351a 50%,#1d4a24)",
    alt: "Dense green ferns filling the frame",
  },
} as const;

/* ------------------------------------------------------------------ *
 *  Numbers — kept in step with site.ts / services.ts
 * ------------------------------------------------------------------ */

export type Stat = {
  /** counted up to, so it has to stay a number */
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  /** put a space between the figure and its suffix */
  gap?: boolean;
};

export const numbers: Stat[] = [
  { value: site.rating.value, decimals: 1, label: "Rated on Google" },
  { value: site.rating.count, suffix: "+", label: "Guest reviews" },
  { value: services.length, label: "Signature therapies" },
  { value: 7, suffix: "Days", gap: true, label: "Open every week" },
];

/** The four promises under "Bring the ritual home". */
export const promises = [
  { title: "Natural Ingredients", note: "Plant-led, nothing harsh" },
  { title: "Cruelty Free", note: "Never tested on animals" },
  { title: "Skin Loving", note: "Kind to sensitive skin" },
  { title: "Thoughtfully Made", note: "Blended in small batches" },
] as const;
