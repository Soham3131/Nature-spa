import photos from "./photos.json";

/** Photos actually present in /public/images at build time. */
const present = new Set<string>(photos.files);

/** Use the spa's own photo when it exists, otherwise the stock stand-in. */
export function resolvePhoto(localPath: string, fallback: string) {
  const file = localPath.split("/").pop() ?? "";
  return present.has(file) ? localPath : fallback;
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
    fallback: u("1600334129128-685c5582fd35"),
    alt: "The lounge at The Nature Spa — marble walls, gold ceiling detail and a crystal chandelier",
    caption: "A Warm Welcome",
    tone: "linear-gradient(140deg,#3a3226,#8d7a58 45%,#d9c79b)",
  },
  {
    src: "/images/spa-reception.jpg",
    fallback: u("1591343395082-e120087004b4"),
    alt: "Reception at The Nature Spa with a backlit stone counter and gold panelling",
    caption: "Leave the City Outside",
    tone: "linear-gradient(140deg,#2c2f33,#6f6a5c 50%,#cbb98c)",
  },
  {
    src: "/images/spa-treatment-room.jpg",
    fallback: u("1544161515-4ab6ce6db874"),
    alt: "A private treatment room with fresh linen, folded towels and warm gold mosaic walls",
    caption: "Your Own Quiet Room",
    tone: "linear-gradient(140deg,#2a2118,#7d6242 50%,#e0c58f)",
  },
  {
    src: "/images/spa-detail.jpg",
    fallback: u("1570174006382-148305ce4972"),
    alt: "Stone basin, illuminated mirror and fresh flowers in a treatment room",
    caption: "In the Details",
    tone: "linear-gradient(140deg,#1f2a2a,#4d7a6c 50%,#b8d8c6)",
  },
  {
    src: "/images/spa-corridor.jpg",
    fallback: u("1630595632518-8217c0bceb8f"),
    alt: "A warmly lit corridor leading to the private therapy suites",
    caption: "Oils & Rituals",
    tone: "linear-gradient(140deg,#241f1a,#6b5540 50%,#d3b98a)",
  },
  {
    src: "/images/spa-couple-suite.jpg",
    fallback: u("1596178060671-7a80dc8059ea"),
    alt: "A candlelit couple's suite prepared with two therapy beds",
    caption: "Time to Yourself",
    tone: "linear-gradient(140deg,#2d1f24,#7a5058 50%,#e2b6bd)",
  },
];

export const gallery: Shot[] = rawGallery.map((s) => ({
  ...s,
  resolved: resolvePhoto(s.src, s.fallback),
}));
