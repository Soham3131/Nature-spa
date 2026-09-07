# The Nature Spa — Gurugram

A premium, 3D, scroll-driven website for **The Nature Spa**, built with Next.js 16,
React 19, Tailwind CSS v4, React Three Fiber and Motion.

Every enquiry routes straight to WhatsApp on **+91 89505 07450**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## ⚠️ Do these three things before going live

### 1. Replace the placeholder reviews — `src/lib/reviews.ts`

The review carousel currently shows **placeholders**. Open your Google Business
listing, copy each real review (name, stars, date, text) and paste them into the
`reviews` array. Keep the guests' own wording — authentic reviews convert far
better than polished copy.

Also update `site.rating` in `src/lib/site.ts` so the rating badge, the stats
band and the search-engine structured data all match your live listing.

### 2. Add your own photos — `public/images/`

The site currently uses licensed stock spa photography as a stand-in. Drop your
own photographs into `public/images/` using these exact filenames and the site
switches to them automatically on the next build:

| Filename                 | Where it appears                           |
| ------------------------ | ------------------------------------------ |
| `spa-lounge.jpg`         | Gallery slide 1 + social share preview      |
| `spa-reception.jpg`      | Gallery slide 2                             |
| `spa-treatment-room.jpg` | Gallery slide 3 + "Experience" photo stack  |
| `spa-detail.jpg`         | Gallery slide 4 + "Experience" photo stack  |
| `spa-corridor.jpg`       | Gallery slide 5                             |
| `spa-couple-suite.jpg`   | Gallery slide 6                             |

Then update the captions and alt text in `src/lib/gallery.ts` so they describe
your actual rooms. A `prebuild` script scans the folder, so no code changes are
needed to make the swap happen.

### 3. Set your real address, prices and domain

- `src/lib/site.ts` — street address, opening hours, rating. The address is
  currently a placeholder (`Sector 14 Market`).
- `src/lib/services.ts` — therapy names, durations and prices.
- `SITE_URL` in `src/app/layout.tsx`, `src/app/sitemap.ts` and
  `src/app/robots.ts` — replace `thenaturespa.example.com` with your domain.

---

## How it is put together

```
src/
  app/
    layout.tsx           root layout, fonts, SEO metadata, LocalBusiness JSON-LD
    page.tsx             the one-page site, section by section
    blog/                journal index + article pages (statically generated)
    sitemap.ts robots.ts
  components/
    three/SpaScene.tsx   the WebGL scene (custom GLSL, no external assets)
    sections/            Hero, Experience, Services, Gallery, Stats,
                         Reviews, JournalPreview, Faq, Contact, Marquee
    Nav Footer WhatsAppFab SmoothScroll ScrollProgress Reveal TiltCard SmartImage
  lib/
    site.ts              ← phone, email, socials, address, hours, rating
    services.ts          ← the therapy menu
    reviews.ts           ← guest reviews
    blog.ts              ← journal articles
    gallery.ts           ← photos + build-time photo resolution
scripts/scan-photos.mjs  runs on predev/prebuild to detect your photos
```

### The 3D

`SpaScene.tsx` renders a WebGL layer behind the hero: a hand-written fractal-noise
shader for the aurora backdrop, an iridescent fresnel crystal, floating zen
stones and additive gold dust. There are no downloaded HDRIs, models or textures,
so it works offline and adds nothing to the network payload.

It degrades on its own:

- `prefers-reduced-motion` or a low-core device → a CSS gradient replaces the canvas
- sustained low frame rate → device pixel ratio drops via `PerformanceMonitor`

Elsewhere, "3D" is CSS: pointer-tracked card tilt with specular glare
(`TiltCard`), a scroll-driven coverflow gallery, and parallax photo stacks.

### Contact form → WhatsApp

`Contact.tsx` validates the name and mobile number, then composes a formatted
message and opens `wa.me/918950507450` with it pre-filled. **No data is stored
or sent anywhere else** — there is no backend and no database.

To change the number, edit `phoneRaw` and `phoneDisplay` in `src/lib/site.ts`;
every link on the site derives from those two fields.

---

## Adding a journal article

Append an entry to the `posts` array in `src/lib/blog.ts`. The route, the
listing card, the "keep reading" cards, the sitemap entry and the `BlogPosting`
structured data are all generated from it. The `body` is an array of blocks:

```ts
{ type: "p",     text: "A paragraph." }
{ type: "h2",    text: "A section heading" }
{ type: "quote", text: "A pull quote." }
{ type: "list",  items: ["First point", "Second point"] }
```

---

## Deploying

Any Next.js host works. On Vercel: import the repo, keep the defaults, and set
your custom domain. Remember to update `SITE_URL` in the three files listed
above so canonical URLs, the sitemap and social previews point at the real site.
