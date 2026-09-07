# The Nature Spa — Gurugram

A scroll-driven website for **The Nature Spa**, built with Next.js 16, React 19,
Tailwind CSS v4 and Motion. Every enquiry routes straight to WhatsApp on
**+91 89505 07450**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## The hero

The hero is a pinned, scroll-driven scene: a bottle of oil tips over the
guest's shoulder, warm oil runs down and spreads across the back, the knots of
tension let go, and ease settles in. One scroll tells the whole story.

It lives in [`src/components/hero/OilPourScene.tsx`](src/components/hero/OilPourScene.tsx)
and is plain SVG driven by scroll-linked motion values — no WebGL, no video, no
external assets, so it costs almost nothing to load and works everywhere. The
choreography is a list of scroll ranges at the top of the file:

| Scroll      | What happens                          |
| ----------- | ------------------------------------- |
| 0.00 → 0.14 | at rest — tension held in the shoulders |
| 0.14 → 0.36 | the bottle tips over the right shoulder |
| 0.32 → 0.62 | oil runs down and lands                 |
| 0.44 → 0.82 | the oil spreads and catches the light   |
| 0.54 → 0.84 | the knots let go                        |
| 0.68 → 1.00 | ease settles in and lifts off the skin  |

To retime any beat, change the two numbers in that step's `useSeg(...)` call.
The section's height (`h-[300vh]` in `Hero.tsx`) sets how much scrolling the
whole sequence takes.

### If you add a hero video later

Drop your `.mp4` into `public/`, then in `Hero.tsx` render a `<video>` layer in
place of `<OilPourScene />` — the copy, badge and CTAs are already a separate
layer above it, so nothing else has to change.

---

## Colours

Sampled from your logo and defined once in
[`src/app/globals.css`](src/app/globals.css):

| Token             | Value     | Used for                        |
| ----------------- | --------- | ------------------------------- |
| `ivory` / `sand`  | `#fbfaf5` / `#f1eee1` | page and alternating sections |
| `forest`          | `#1f4a22` | headings, buttons, the footer   |
| `leaf` / `lime`   | `#57a63c` / `#8fc24a` | accents, underlines, glows |
| `bronze`          | `#a17a4e` | eyebrows and fine detail        |
| `body` / `muted`  | `#47564a` / `#6e7d6c` | body copy                   |

Change a value there and it updates everywhere.

---

## ⚠️ Three things to do before going live

### 1. Replace the placeholder reviews — `src/lib/reviews.ts`

The review carousel shows **placeholders**. Open your Google Business listing,
copy each real review (name, stars, date, text) and paste them into the
`reviews` array. Keep the guests' own wording.

Also update `site.rating` in `src/lib/site.ts` so the rating badge, the stats
band and the search-engine structured data match your live listing.

### 2. Add your own photos — `public/images/`

The gallery currently uses licensed stock spa photography. Drop your own
photographs into `public/images/` using these filenames and the site switches
to them automatically on the next build:

| Filename                 | Where it appears                           |
| ------------------------ | ------------------------------------------ |
| `spa-lounge.jpg`         | Gallery card 1 + social share preview       |
| `spa-reception.jpg`      | Gallery card 2                              |
| `spa-treatment-room.jpg` | Gallery card 3 + "Experience" photo stack   |
| `spa-detail.jpg`         | Gallery card 4 + "Experience" photo stack   |
| `spa-corridor.jpg`       | Gallery card 5                              |
| `spa-couple-suite.jpg`   | Gallery card 6                              |

Then edit the captions and alt text in `src/lib/gallery.ts` to describe your
actual rooms. `scripts/scan-photos.mjs` runs on `predev`/`prebuild` and detects
them — no code change needed.

### 3. Set your real address, prices and domain

- `src/lib/site.ts` — street address, hours, rating. The address is currently a
  placeholder (`Sector 14 Market`).
- `src/lib/services.ts` — therapy names, durations and prices.
- `SITE_URL` in `src/app/layout.tsx`, `src/app/sitemap.ts` and
  `src/app/robots.ts` — replace `thenaturespa.example.com` with your domain.

---

## How it is put together

```
public/
  logo.png            transparent logo, used in the nav and footer
  logo-card.png       the version on a cream card
  images/             your own photographs go here
src/
  app/
    layout.tsx        fonts, SEO metadata, LocalBusiness JSON-LD
    page.tsx          the one-page site, section by section
    blog/             journal index + article pages (statically generated)
    sitemap.ts robots.ts
  components/
    hero/OilPourScene.tsx   the scroll-driven hero illustration
    sections/               Hero, Experience, Services, Gallery, Stats,
                            Reviews, JournalPreview, Faq, Contact, Marquee
    Nav Footer WhatsAppFab SmoothScroll ScrollProgress Reveal TiltCard SmartImage
  lib/
    site.ts           ← phone, email, socials, address, hours, rating
    services.ts       ← the therapy menu
    reviews.ts        ← guest reviews
    blog.ts           ← journal articles
    gallery.ts        ← photos + build-time photo resolution
scripts/scan-photos.mjs
```

### Motion elsewhere

Beyond the hero: a horizontal gallery that scrolls sideways as you scroll down,
pointer-tracked 3D card tilt with a specular glare (`TiltCard`), parallax photo
stacks, counters that count up when they enter view, and Lenis smooth scrolling.
Everything respects `prefers-reduced-motion`.

### Contact form → WhatsApp

`Contact.tsx` validates the name and mobile number, composes a formatted
message and opens `wa.me/918950507450` with it pre-filled. **No data is stored
or sent anywhere else** — there is no backend and no database.

To change the number, edit `phoneRaw` and `phoneDisplay` in `src/lib/site.ts`;
every link on the site derives from those two fields.

---

## Adding a journal article

Append an entry to `posts` in `src/lib/blog.ts`. The route, the listing card,
the "keep reading" cards, the sitemap entry and the `BlogPosting` structured
data are all generated from it. `body` is an array of blocks:

```ts
{ type: "p",     text: "A paragraph." }
{ type: "h2",    text: "A section heading" }
{ type: "quote", text: "A pull quote." }
{ type: "list",  items: ["First point", "Second point"] }
```

---

## Deploying

Any Next.js host works. On Vercel: import the repo, keep the defaults, add your
domain, and update `SITE_URL` in the three files listed above so canonical URLs,
the sitemap and social previews point at the real site.
