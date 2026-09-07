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

The hero is your own clip (`public/spaa.mp4`) **scrubbed by scroll** rather than
played on a clock: the bottle tips and dispenses cream as the visitor scrolls,
and stops wherever they stop. Captions on the left narrate it as it goes.

It lives in [`src/components/hero/ScrollVideo.tsx`](src/components/hero/ScrollVideo.tsx).
Seeking a video on every scroll event is what makes this effect stutter, so
scroll only ever sets a *target* time — a rAF loop eases the real playhead
toward it and skips the seek entirely when the gap is under one frame.

If the browser cannot decode the file, or the visitor has reduced motion turned
on, `public/hero-poster.jpg` is shown instead, so the hero is never blank.

The clip you supplied is 3840×2160 at 5.2 MB, which is far more than a hero
panel needs and slow to seek. `public/spaa-720.webm` is a 1280×720 VP9 version
of it at 0.38 MB — thirteen times smaller, and roughly twice as fast to seek,
which is what scrubbing actually costs. The browser picks it first and falls
back to the original mp4 only if it cannot decode VP9.

**Replacing the clip:** drop the new file in as `public/spaa.mp4`. Ideally also
produce a 720p WebM alongside it (`ffmpeg -i spaa.mp4 -vf scale=1280:-2 -c:v
libvpx-vp9 -b:v 2.6M -an spaa-720.webm`) and refresh `public/hero-poster.jpg`
from any frame you like. If you only replace the mp4, the site still works — it
will just use the heavier file.

**Why it is not a boxed rectangle:** the clip was shot on white, and the hero
composites it with `mix-blend-mode: multiply`, so white drops out and the
subject sits directly on the page. Two things switch that off if you are not
careful, and both cost an afternoon to find: a `transform` on the blended
element itself (put the blend on a wrapper and animate a child instead), and
any `perspective` / `transform-style: preserve-3d` ancestor between the film
and the backdrop, which puts it in a separate 3D rendering context.

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

The review carousel shows **placeholders**, each marked with a small "Sample"
chip. Open your Google Business listing, copy each real review (name, stars,
date, text) into the `reviews` array, and delete that entry's `sample: true`
line — the chip disappears on its own.

They are left as obvious placeholders rather than invented testimonials on
purpose: made-up reviews on a live business page are a real problem, and fake
ones would also poison the review structured data Google reads from this file.

Also update `site.rating` in `src/lib/site.ts` so the rating badge, the stats
band and the structured data match your live listing.

### 2. Add your own photos — `public/images/`

The gallery, the therapy cards and the journal currently use licensed stock
photography (Unsplash), chosen to show Indian and South Asian guests where
possible. Therapy card photos are the `image` field in `src/lib/services.ts`;
journal photos are the `image` field in `src/lib/blog.ts`. Drop your own
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
  spaa.mp4            the hero clip, scrubbed by scroll
  hero-poster.jpg     first frame — poster and reduced-motion fallback
  images/             your own photographs go here
src/
  app/
    layout.tsx        fonts, SEO metadata, LocalBusiness JSON-LD
    page.tsx          the one-page site, section by section
    blog/             journal index + article pages (statically generated)
    sitemap.ts robots.ts
  components/
    hero/ScrollVideo.tsx    the scroll-scrubbed hero video
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
stacks, drifting botanicals at three depths behind the hero, counters that count
up when they enter view, and Lenis smooth scrolling. Everything respects
`prefers-reduced-motion`.

### Keeping the scroll smooth

Three rules this codebase follows, because each of them was measurably costing
frames:

- **No `backdrop-filter` on anything that scrolls.** Blurring what is behind an
  element is the most expensive thing a browser composites. Only the nav keeps
  it, where the area is small.
- **No `blur()` on something that also moves.** A blurred surface has to be
  re-rasterised every frame it changes. The hero's coloured light is plain
  radial gradients, which are already soft and cost nothing to move.
- **Scroll sets a target, never a value.** The hero video eases toward its
  target time in a rAF loop and skips seeks under one frame, rather than
  seeking on every scroll event; the loop parks itself when the hero is off
  screen.

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
