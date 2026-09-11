/**
 * Reads publication dates straight from blog frontmatter, for the sitemap's
 * `lastmod`.
 *
 * astro.config.mjs runs before the content collections exist, so getCollection
 * isn't available here. This deliberately parses only the two fields it needs
 * and throws rather than guessing — a wrong `lastmod` published to search
 * engines is worse than a build that stops and tells you.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, posix, sep } from "node:path";

const BLOG_DIR = "src/content/blog";

function markdownFiles(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(full, base);
    return entry.name.endsWith(".md") ? [{ full, base }] : [];
  });
}

function frontmatter(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`No frontmatter found in ${file}`);
  return match[1];
}

function field(block, name) {
  const match = block.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, "m"));
  return match ? match[1].replace(/^["']|["']$/g, "") : null;
}

/** Map of route pathname -> publication Date, for non-draft posts. */
export function blogPostDates() {
  const dates = new Map();

  // This runs while astro.config.mjs loads, so a missing directory would fail
  // the build with a bare ENOENT before Astro can say anything useful.
  if (!existsSync(BLOG_DIR)) return dates;

  for (const { full, base } of markdownFiles(BLOG_DIR)) {
    const source = readFileSync(full, "utf8");
    const block = frontmatter(source, full);

    if (field(block, "draft") === "true") continue;

    const raw = field(block, "pubDate");
    if (!raw) throw new Error(`Missing pubDate in ${full}`);

    const date = new Date(raw);
    if (Number.isNaN(date.valueOf())) {
      throw new Error(`Unparseable pubDate ${JSON.stringify(raw)} in ${full}`);
    }

    // The glob loader derives ids from the path relative to the collection
    // base, minus the extension, with a trailing `/index` stripped.
    const id = full
      .slice(base.length + 1)
      .split(sep)
      .join(posix.sep)
      .replace(/\.md$/, "")
      .replace(/\/index$/, "");

    dates.set(`/blog/${id}/`, date);
  }

  return dates;
}
