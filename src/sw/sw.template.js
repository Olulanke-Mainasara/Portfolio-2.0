/*
 * Service worker template. Placeholders are filled in at build time by
 * src/integrations/pwa.mjs — this file is never served as-is.
 */
const BUILD_ID = "__BUILD_ID__";
const PRECACHE = __PRECACHE__;
const PAGES = __PAGES__;
const OFFLINE_URL = "__OFFLINE_URL__";

// The precache name carries the build id, so a new build installs into a fresh
// cache and the old one is dropped wholesale on activate.
const PRECACHE_NAME = `portfolio-precache-${BUILD_ID}`;
const FONT_CACHE = "portfolio-fonts-v1";
const KEEP = [PRECACHE_NAME, FONT_CACHE];

const FONT_ORIGINS = new Set([
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
]);

// Pages are served network-first so a fresh deploy is picked up immediately,
// but a slow connection shouldn't out-wait the cached copy we already hold.
const NETWORK_TIMEOUT = 3000;

const PAGE_SET = new Set(PAGES);
const PRECACHE_SET = new Set(PRECACHE);

const absolute = (path) => new URL(path, self.location.origin).href;

/**
 * Built pages live at directory paths (`/about/`), but links and the router may
 * ask for `/about`. Resolve whatever came in to the key we actually cached.
 */
function canonicalPage(pathname) {
  const candidates = pathname.endsWith("/")
    ? [pathname, pathname.slice(0, -1)]
    : [pathname, `${pathname}/`];
  return candidates.find((candidate) => PAGE_SET.has(candidate)) ?? null;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE_NAME);
      // Added one at a time: addAll rejects the whole install if any single
      // entry 404s, which would leave the site with no worker at all.
      const results = await Promise.allSettled(
        PRECACHE.map((path) =>
          cache.add(new Request(absolute(path), { cache: "reload" })),
        ),
      );
      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed) console.warn(`[sw] ${failed} precache entries failed`);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => !KEEP.includes(name)).map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (FONT_ORIGINS.has(url.origin)) {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // A full page load is mode "navigate", but Astro's ClientRouter fetches the
  // next page with plain fetch() — same-origin, mode "cors". Both need the
  // page strategy, so match on the path rather than on request mode alone.
  const page = canonicalPage(url.pathname);
  if (request.mode === "navigate" || page) {
    event.respondWith(networkFirstPage(request, page));
    return;
  }

  // Hashed build output is immutable; anything else precached is versioned by
  // the cache name, so both are safe to serve straight from the cache.
  if (url.pathname.startsWith("/_astro/") || PRECACHE_SET.has(url.pathname)) {
    event.respondWith(cacheFirst(request, PRECACHE_NAME));
  }
});

async function networkFirstPage(request, page) {
  const cache = await caches.open(PRECACHE_NAME);
  const key = page ? absolute(page) : request.url;

  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT);
    if (response && response.ok && response.type === "basic") {
      cache.put(key, response.clone());
    }
    return response;
  } catch {
    const cached = (await cache.match(key)) ?? (await cache.match(request));
    if (cached) return cached;

    const offline = await cache.match(absolute(OFFLINE_URL));
    if (offline) return offline;

    return new Response("You are offline, and this page has not been cached.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.ok && response.type === "basic") {
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      // Font requests are no-cors, so responses come back opaque (status 0).
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached ?? (await network) ?? Response.error();
}

function fetchWithTimeout(request, timeout) {
  const network = fetch(request);
  // If the timeout wins the race the request is still in flight; swallow any
  // later rejection so it can't surface as an unhandled promise rejection.
  network.catch(() => {});

  let timer;
  const expiry = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("network timeout")), timeout);
  });

  return Promise.race([network, expiry]).finally(() => clearTimeout(timer));
}
