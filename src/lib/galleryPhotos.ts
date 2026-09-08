/**
 * Photos for the standalone /gallery page and the "Gallery" section on /home1.
 *
 * Save your own photographs into /public/images named g1–g9 (any of
 * .jpg/.jpeg/.png/.webp/.avif) — the site picks them up automatically (see
 * resolvePhoto() in gallery.ts) and the stock fallback images disappear.
 */
import { resolvePhoto, type Shot } from "./gallery";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const rawGalleryPhotos: Omit<Shot, "resolved">[] = [
  {
    src: "/images/g1.webp",
    fallback: u("1775133263714-848c8fe09e73"),
    alt: "The lounge at The Nature Spa — marble walls, gold ceiling detail and a crystal chandelier",
    caption: "The Lounge",
    tone: "linear-gradient(140deg,#3a3226,#8d7a58 45%,#d9c79b)",
  },
  {
    src: "/images/g2.webp",
    fallback: u("1731597076108-f3bbe268162f"),
    alt: "Reception at The Nature Spa with a backlit stone counter and gold panelling",
    caption: "Reception",
    tone: "linear-gradient(140deg,#2c2f33,#6f6a5c 50%,#cbb98c)",
  },
  {
    src: "/images/g4.jpg",
    fallback: u("1671492246169-cdd6305870a0"),
    alt: "Stone basin, illuminated mirror and fresh flowers in a treatment room",
    caption: "In the Details",
    tone: "linear-gradient(140deg,#1f2a2a,#4d7a6c 50%,#b8d8c6)",
  },
  {
    src: "/images/g5.webp",
    fallback: u("1775133263816-8b2a1c5d13e8"),
    alt: "A warmly lit corridor leading to the private therapy suites",
    caption: "The Corridor",
    tone: "linear-gradient(140deg,#241f1a,#6b5540 50%,#d3b98a)",
  },
  {
    src: "/images/g6.webp",
    fallback: u("1787295779612-b3182bea0a81"),
    alt: "A candlelit couple's suite prepared with two therapy beds",
    caption: "Couple's Suite",
    tone: "linear-gradient(140deg,#2d1f24,#7a5058 50%,#e2b6bd)",
  },
  {
    src: "/images/g7.webp",
    fallback: u("1620733723572-11c53f73a416"),
    alt: "A reed diffuser, rolled towel and lit candles on a side table",
    caption: "The Ritual",
    tone: "linear-gradient(140deg,#2b241c,#a08a63 50%,#f0e3c8)",
  },
  {
    src: "/images/g8.webp",
    fallback: u("1781736363509-a2327b675a03"),
    alt: "A stone soaking tub scattered with fresh flower petals",
    caption: "The Quiet Space",
    tone: "linear-gradient(140deg,#2e2226,#8d6068 50%,#e9c6cb)",
  },
  {
    src: "/images/g9.jpeg",
    fallback: u("1600334129128-685c5582fd35"),
    alt: "A view of The Nature Spa",
    caption: "The Nature Spa",
    tone: "linear-gradient(140deg,#1a1512,#6d5a45 50%,#ddc9ad)",
  },
];

export const galleryPhotos: Shot[] = rawGalleryPhotos.map((s) => ({
  ...s,
  resolved: resolvePhoto(s.src, s.fallback),
}));
