/**
 * Generates dist/sw.js after a build.
 *
 * Walks the built output, turns it into a precache list, derives a build id
 * from the contents of every precached file, and substitutes both into
 * src/sw/sw.template.js. Nothing runs in dev — the worker only exists in a
 * production build.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const TEMPLATE = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../sw/sw.template.js",
);

/** Never worth a user's storage: crawler-only or large on-demand downloads. */
const EXCLUDED_PATHS = new Set(["/og-image.jpg"]);
const EXCLUDED_EXTENSIONS = new Set([".pdf", ".map"]);
const EXCLUDED_NAMES = new Set([".DS_Store", "sw.js"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

/** Absolute filesystem path -> the URL path it will be served from. */
function toUrlPath(outDir, file) {
  return `/${relative(outDir, file).split(sep).join(posix.sep)}`;
}

function isExcluded(urlPath) {
  const name = posix.basename(urlPath);
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  return (
    EXCLUDED_PATHS.has(urlPath) ||
    EXCLUDED_NAMES.has(name) ||
    EXCLUDED_EXTENSIONS.has(ext)
  );
}

export default function pwa() {
  return {
    name: "portfolio-pwa",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        if (!dir) {
          throw new Error(
            "portfolio-pwa: astro:build:done did not provide `dir`; the Astro integration API has changed.",
          );
        }

        const outDir = fileURLToPath(dir);
        const files = (await walk(outDir)).sort();

        const precache = [];
        const pages = [];
        const hash = createHash("sha256");

        for (const file of files) {
          const urlPath = toUrlPath(outDir, file);
          if (isExcluded(urlPath)) continue;

          // Astro's directory build format emits `about/index.html`, served at
          // `/about/`. Precache the served path, not the file path.
          const isPage = urlPath.endsWith("/index.html");
          const servedPath = isPage ? urlPath.slice(0, -"index.html".length) : urlPath;

          precache.push(servedPath);
          if (isPage) pages.push(servedPath);

          // Hash contents, not names: pages and files in public/ keep their
          // names across deploys even when their bytes change.
          hash.update(servedPath);
          hash.update(await readFile(file));
        }

        const buildId = hash.digest("hex").slice(0, 12);
        const offlineUrl = pages.find((page) => page === "/offline/") ?? "/";
        if (offlineUrl === "/") {
          logger.warn("no /offline page found; falling back to the home page");
        }

        const template = await readFile(TEMPLATE, "utf8");
        const sw = template
          .replace("__BUILD_ID__", buildId)
          .replace("__PRECACHE__", JSON.stringify(precache, null, 2))
          .replace("__PAGES__", JSON.stringify(pages, null, 2))
          .replace("__OFFLINE_URL__", offlineUrl);

        await writeFile(join(outDir, "sw.js"), sw, "utf8");

        const bytes = (
          await Promise.all(
            files
              .filter((file) => !isExcluded(toUrlPath(outDir, file)))
              .map(async (file) => (await readFile(file)).byteLength),
          )
        ).reduce((total, size) => total + size, 0);

        logger.info(
          `sw.js written — ${precache.length} entries (${pages.length} pages, ${(bytes / 1024 / 1024).toFixed(2)} MB) at build ${buildId}`,
        );
      },
    },
  };
}
