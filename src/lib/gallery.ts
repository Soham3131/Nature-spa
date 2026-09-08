import photos from "./photos.json";

/**
 * Photos actually present in /public/images at build time, keyed by filename
 * without its extension — so a data file can reference "gallery-1.jpg" and
 * still pick up "gallery-1.webp" (or .png/.jpeg/.avif) if that's what was
 * actually saved.
 */
const presentByBase = new Map<string, string>();
for (const f of photos.files) {
  const base = f.slice(0, f.lastIndexOf("."));
  if (!presentByBase.has(base)) presentByBase.set(base, f);
}

/** Use the spa's own photo when it exists (whatever format it's in), otherwise the stock stand-in. */
export function resolvePhoto(localPath: string, fallback: string) {
  const file = localPath.split("/").pop() ?? "";
  const dot = file.lastIndexOf(".");
  const base = dot === -1 ? file : file.slice(0, dot);
  const dir = localPath.slice(0, localPath.length - file.length);
  const match = presentByBase.get(base);
  return match ? `${dir}${match}` : fallback;
}

export type Shot = {
  /** Your own photo. Drop the file in /public/images with this name. */
  src: string;
  /** Used automatically until your own photo exists. */
  fallback: string;
  alt: string;
  caption: string;
  /** Gradient shown while either image loads */
  tone: string;
  /** the image the page should actually request */
  resolved: string;
};

const u = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * HOW TO USE YOUR OWN PHOTOS
 * Save them into /public/images with exactly these filenames — the site picks
 * them up on its own and the stock fallback disappears:
 *   spa-lounge.jpg · spa-reception.jpg · spa-treatment-room.jpg
 *   spa-detail.jpg · spa-corridor.jpg · spa-couple-suite.jpg
 */
const rawGallery: Omit<Shot, "resolved">[] = [
  {
    src: "/images/spa-lounge.jpg",
    fallback: u("1775133263714-848c8fe09e73"),
    alt: "The lounge at The Nature Spa — marble walls, gold ceiling detail and a crystal chandelier",
    caption: "A Warm Welcome",
    tone: "linear-gradient(140deg,#3a3226,#8d7a58 45%,#d9c79b)",
  },
  {
    src: "/images/spa-reception.jpg",
    fallback: u("1731597076108-f3bbe268162f"),
    alt: "Reception at The Nature Spa with a backlit stone counter and gold panelling",
    caption: "Leave the City Outside",
    tone: "linear-gradient(140deg,#2c2f33,#6f6a5c 50%,#cbb98c)",
  },
  {
    src: "/images/spa-treatment-room.jpg",
    fallback: u("1775133262667-316bd4d9e5b5"),
    alt: "A private treatment room with fresh linen, folded towels and warm gold mosaic walls",
    caption: "Your Own Quiet Room",
    tone: "linear-gradient(140deg,#2a2118,#7d6242 50%,#e0c58f)",
  },
  {
    src: "/images/spa-detail.jpg",
    fallback: u("1671492246169-cdd6305870a0"),
    alt: "Stone basin, illuminated mirror and fresh flowers in a treatment room",
    caption: "In the Details",
    tone: "linear-gradient(140deg,#1f2a2a,#4d7a6c 50%,#b8d8c6)",
  },
  {
    src: "/images/spa-corridor.jpg",
    fallback: u("1775133263816-8b2a1c5d13e8"),
    alt: "A warmly lit corridor leading to the private therapy suites",
    caption: "Oils & Rituals",
    tone: "linear-gradient(140deg,#241f1a,#6b5540 50%,#d3b98a)",
  },
  {
    src: "/images/spa-couple-suite.jpg",
    fallback: u("1787295779612-b3182bea0a81"),
    alt: "A candlelit couple's suite prepared with two therapy beds",
    caption: "Time to Yourself",
    tone: "linear-gradient(140deg,#2d1f24,#7a5058 50%,#e2b6bd)",
  },
];

export const gallery: Shot[] = rawGallery.map((s) => ({
  ...s,
  resolved: resolvePhoto(s.src, s.fallback),
}));
