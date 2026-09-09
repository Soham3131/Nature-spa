/**
 * Photos for the standalone /gallery page and the "Gallery" section on the
 * home page.
 *
 * ORDER MATTERS. The home page shows the first four (see PhotoGallery.tsx), so
 * those four are kept to four *different* rooms — lounge, reception, therapy
 * room, corridor — rather than two angles of the same one. Anything added
 * later should go after them.
 *
 * Captions and alt text describe the actual photograph in /public/images. They
 * were written against the stock stand-ins originally and had drifted: the
 * reception was labelled "The Corridor", a therapy room was labelled
 * "Reception", and so on.
 *
 * Save your own photographs into /public/images named g1–g9 (any of
 * .jpg/.jpeg/.png/.webp/.avif) — the site picks them up automatically (see
 * resolvePhoto() in gallery.ts) and the stock fallback images disappear.
 */
import { resolvePhoto, type Shot } from "./gallery";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const rawGalleryPhotos: Omit<Shot, "resolved">[] = [
  /* ---------- the four the home page shows ---------- */
  {
    src: "/images/g1.webp",
    fallback: u("1775133263714-848c8fe09e73"),
    alt: "The guest lounge at The Nature Spa — cream velvet sofas, marbled wall panels and a crystal chandelier",
    caption: "The Lounge",
    tone: "linear-gradient(140deg,#3a3226,#8d7a58 45%,#d9c79b)",
  },
  {
    src: "/images/g5.webp",
    fallback: u("1731597076108-f3bbe268162f"),
    alt: "The reception desk at The Nature Spa, lit from beneath, with a chandelier overhead and a brass Buddha alongside",
    caption: "Reception",
    tone: "linear-gradient(140deg,#2f2b24,#7f7565 48%,#d8cbab)",
  },
  {
    src: "/images/g2.webp",
    fallback: u("1775133262667-316bd4d9e5b5"),
    alt: "A private therapy room made up with fan-folded towels, beside a carved stone basin and a backlit mirror",
    caption: "The Treatment Room",
    tone: "linear-gradient(140deg,#2a2015,#8a6a39 48%,#e2c78d)",
  },
  {
    src: "/images/g8.webp",
    fallback: u("1775133263816-8b2a1c5d13e8"),
    alt: "The marble corridor leading to the therapy suites, lined with pendant lanterns and a Buddha carving at the far end",
    caption: "The Corridor",
    tone: "linear-gradient(140deg,#3a2b1c,#a4804f 48%,#eeddb8)",
  },

  /* ---------- the rest, shown on /gallery ---------- */
  {
    src: "/images/g6.webp",
    fallback: u("1787295779612-b3182bea0a81"),
    alt: "A therapy room lit by a single candle and a ring light, the bed turned down and waiting",
    caption: "The Candlelit Room",
    tone: "linear-gradient(140deg,#141110,#453830 50%,#8a7565)",
  },
  {
    src: "/images/g7.webp",
    fallback: u("1620733723572-11c53f73a416"),
    alt: "The stone front desk at The Nature Spa, with a carved shrine and fresh lilies against a gold-inlaid wall",
    caption: "The Front Desk",
    tone: "linear-gradient(140deg,#2e2a23,#7c7261 48%,#d5c7a6)",
  },
  {
    src: "/images/g9.jpeg",
    fallback: u("1600334129128-685c5582fd35"),
    alt: "The Nature Spa's illuminated sign on the second floor of its Sector 56 building in Gurugram, lit at night",
    caption: "Find Us in Sector 56",
    tone: "linear-gradient(140deg,#0c0e13,#2b3040 50%,#5f6577)",
  },

  /*
   * g4.jpg is left out on purpose: the file is 141×235, a thumbnail rather
   * than a photograph, and the grid renders these around 400px wide, so it
   * came out visibly soft. It is also a second angle on the lounge, which g1
   * already covers. Drop a full-size export in as /images/g4.<ext> and add an
   * entry back here to use it.
   */
];

export const galleryPhotos: Shot[] = rawGalleryPhotos.map((s) => ({
  ...s,
  resolved: resolvePhoto(s.src, s.fallback),
}));
