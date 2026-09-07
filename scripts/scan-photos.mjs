/**
 * Build-time photo scan.
 *
 * Looks in /public/images and records which of the spa's own photographs have
 * actually been added. The site then points straight at the real file (or
 * straight at the stock fallback) instead of requesting a missing image and
 * recovering in the browser.
 *
 * Runs automatically via the `predev` / `prebuild` npm scripts.
 */
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = join(root, "public", "images");
const outFile = join(root, "src", "lib", "photos.json");

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

let files = [];
if (existsSync(imagesDir)) {
  files = readdirSync(imagesDir).filter((f) =>
    exts.has(f.slice(f.lastIndexOf(".")).toLowerCase()),
  );
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ files: files.sort() }, null, 2) + "\n");

console.log(
  files.length
    ? `[photos] found ${files.length} in public/images: ${files.join(", ")}`
    : "[photos] none in public/images yet — using stock fallbacks",
);
