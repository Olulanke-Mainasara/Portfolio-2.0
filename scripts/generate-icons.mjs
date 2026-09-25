/**
 * Generates the PWA icon set from the site logo.
 *
 * The mark is the same three-part composition used in
 * src/components/Shared/Logo/Logo.astro — a comet flanked by `<` and `>`
 * brackets — rebuilt here as a single square SVG and rasterised with sharp
 * (already in the tree via Astro's image service, so no extra dependency).
 *
 * Run with `node scripts/generate-icons.mjs`. Output is committed, so this
 * only needs re-running when the logo itself changes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/icons");

const INK = "#f7f5f2";
const GROUND = "#070b0f";
const SHADE = "#424141";

/**
 * Each part carries the viewBox from Logo.astro and the box it occupies once
 * logo.css has positioned it. Nested <svg> elements reproduce that layout
 * exactly, including how stroke-width:4 scales differently per part.
 */
const COMET_FILLED =
  "M33.9685 64.9631C33.9687 64.9337 33.9688 64.9044 33.9688 64.875C33.9688 63.2132 33.6737 61.627 33.1379 60.1765C31.448 55.6014 27.3638 52.375 22.5938 52.375C16.3116 52.375 11.2188 57.9714 11.2188 64.875C11.2188 70.0527 7.39915 74.25 2.68747 74.25C2.49525 74.25 2.30452 74.243 2.11548 74.2293C5.06297 79.8451 10.5829 83.625 16.9062 83.625C26.3028 83.625 33.9254 75.2779 33.9685 64.9631Z";
const COMET_STROKED =
  "M33.1379 60.1765C31.448 55.6014 27.3638 52.375 22.5938 52.375C16.3116 52.375 11.2188 57.9714 11.2188 64.875C11.2188 70.0527 7.39915 74.25 2.68747 74.25C2.49525 74.25 2.30452 74.243 2.11548 74.2293C5.06297 79.8451 10.5829 83.625 16.9062 83.625C26.3028 83.625 33.9254 75.2779 33.9685 64.9631C33.9687 64.9337 33.9688 64.9044 33.9688 64.875C33.9688 63.2132 33.6737 61.627 33.1379 60.1765ZM33.1379 60.1765C37.6664 58.4806 41.9737 56.2102 45.9789 53.4282M26.8594 53.3203C28.4038 48.3322 30.4733 43.5879 33.0104 39.1772M45.9789 53.4282C53.109 48.4754 59.2815 41.9008 64.0391 34.0586L78.7356 9.8336C79.2137 9.04553 79.4688 8.11959 79.4688 7.17245C79.4688 4.52289 77.5142 2.375 75.1031 2.375C74.2412 2.375 73.3986 2.65536 72.6815 3.18073L50.6368 19.3307C43.5003 24.5589 37.5175 31.3418 33.0104 39.1772M45.9789 53.4282C43.4086 47.097 38.7718 42.0016 33.0104 39.1772";

// Bounding box of the assembled mark, in the same units as the boxes below.
const MARK = { x: -12.5, y: 0, w: 59.75, h: 35.3963 };

const strokeAttrs = `fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

function markup() {
  return `
    <svg x="-12.5" y="5.018" width="17.5" height="25.128" viewBox="0 0 39 56" ${strokeAttrs} overflow="visible">
      <path d="M35.2812 53L3.71875 28L35.2813 3" />
    </svg>
    <svg x="0" y="0" width="33.75" height="35.3963" viewBox="0 0 82 86" ${strokeAttrs} overflow="visible">
      <path d="${COMET_FILLED}" fill="${SHADE}" />
      <path d="${COMET_STROKED}" />
    </svg>
    <svg x="29.75" y="5.25" width="17.5" height="25.789" viewBox="0 0 38 56" ${strokeAttrs} overflow="visible">
      <path d="M3.0625 3L34.9375 28L3.0625 53" />
    </svg>`;
}

/** A square icon: mark centred on the site's dark ground. */
function squareIcon(size, widthFraction, radius = 0) {
  const scale = (size * widthFraction) / MARK.w;
  const tx = (size - MARK.w * scale) / 2 - MARK.x * scale;
  const ty = (size - MARK.h * scale) / 2 - MARK.y * scale;
  const rx = radius ? ` rx="${radius}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}"${rx} fill="${GROUND}" />
  <g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(6)})">${markup()}
  </g>
</svg>`;
}

/**
 * The SVG favicon: the mark on a rounded dark tile, matching favicon.ico.
 * Browsers take the SVG over the .ico whenever both are linked, so it has to
 * carry its own ground — a bare mark drops the tile the .ico always had.
 */
function faviconSvg() {
  return `${squareIcon(64, 0.78, 11)}\n`;
}

const targets = [
  { file: "icon-192.png", size: 192, widthFraction: 0.84 },
  { file: "icon-512.png", size: 512, widthFraction: 0.84 },
  // Android crops maskable icons to a circle of 80% diameter. The mark's
  // extreme points (both bracket tips) sit on its horizontal centerline, where
  // that circle is at its widest, so it circumscribes at r/halfWidth ~ 0.984 —
  // the mark fits at 0.80 rather than the 0.66 a bbox-diagonal estimate implies.
  { file: "icon-maskable-512.png", size: 512, widthFraction: 0.8 },
  { file: "apple-touch-icon.png", size: 180, widthFraction: 0.78 },
];

await mkdir(outDir, { recursive: true });

for (const { file, size, widthFraction } of targets) {
  const svg = squareIcon(size, widthFraction);
  // The SVG carries explicit width/height, so it rasterises 1:1. The resize is
  // a belt-and-braces guarantee that the file matches the size the manifest
  // declares — a mismatch quietly disqualifies the maskable icon.
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, file));
  console.log(`  ${file}  ${size}x${size}`);
}

await writeFile(resolve(outDir, "icon.svg"), faviconSvg(), "utf8");
console.log("  icon.svg");
