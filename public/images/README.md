# Your spa photos go here

Save your own photographs into this folder using these exact filenames.
The website picks them up automatically and the stock fallback images disappear.

| Filename                  | Where it appears                          |
| ------------------------- | ----------------------------------------- |
| `spa-lounge.jpg`          | Gallery slide 1 + social share preview     |
| `spa-reception.jpg`       | Gallery slide 2                            |
| `spa-treatment-room.jpg`  | Gallery slide 3 + "Experience" photo stack |
| `spa-detail.jpg`          | Gallery slide 4 + "Experience" photo stack |
| `spa-corridor.jpg`        | Gallery slide 5                            |
| `spa-couple-suite.jpg`    | Gallery slide 6                            |

Recommended: JPG or WebP, at least 1200px on the long edge, under ~400 KB each.
Captions and alt text live in `src/lib/gallery.ts` — edit them to match your photos.

## Gallery page & home1 "Gallery" section

These power the standalone `/gallery` page and the Gallery section on
`/home1` (above "Our Space"). Save photos named below (any of
.jpg/.jpeg/.png/.webp/.avif — extension doesn't need to match what's below).
Note `g3` was removed intentionally and is skipped — the list is not
consecutive:

| Filename | Where it appears                       |
| -------- | --------------------------------------- |
| `g1.*`   | Gallery page tile 1 + home1 Gallery tile 1 |
| `g2.*`   | Gallery page tile 2 + home1 Gallery tile 2 |
| `g4.*`   | Gallery page tile 3 + home1 Gallery tile 3 |
| `g5.*`   | Gallery page tile 4 + home1 Gallery tile 4 |
| `g6.*`   | Gallery page tile 5 + home1 Gallery tile 5 |
| `g7.*`   | Gallery page tile 6 + home1 Gallery tile 6 |
| `g8.*`   | Gallery page tile 7 only                 |
| `g9.*`   | Gallery page tile 8 only                 |

Captions and alt text live in `src/lib/galleryPhotos.ts` — edit them to match
your photos.
