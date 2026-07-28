<div align="center">

# Mainasara Olulanke — Portfolio

A fast, animation-heavy personal portfolio built with Astro, React, and Tailwind CSS.

[mainasaraolulanke.com](https://mainasaraolulanke.com)

</div>

---

## About

This is the source for my personal site: a frontend engineer's portfolio covering my work, a bit about me, and a blog. It's built to be fast by default (Astro ships zero JS unless a component needs it) while still being expressive — scroll-driven reveals, staggered text splits, a WebGL project menu, and a light/dark theme that persists across visits.

## Features

- **Content-driven blog** using Astro's Content Layer API, with reading-time estimates and prev/next post navigation
- **Light & dark themes** with system-preference detection, `localStorage` persistence, and no flash-of-wrong-theme on load
- **Scroll-linked animations** — parallax hero text, curtain reveals, and scroll-triggered fades built with Framer Motion and GSAP (SplitText, ScrollTrigger)
- **Responsive nav** that collapses into individually confined pill chips on desktop and a full staggered slide-out menu on mobile
- **WebGL tool carousel** (`InfiniteMenu`) for browsing the tech stack I reach for
- **Smooth scrolling** via Lenis, synced with Astro's View Transitions for soft navigation between pages
- **Working contact form** that opens a pre-filled `mailto:` link — no backend required

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | [Astro](https://astro.build) 7, [React](https://react.dev) 19 (islands) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Motion | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com) (SplitText, ScrollTrigger), [motion-plus](https://motion.dev) |
| Scrolling | [Lenis](https://lenis.darkroom.engineering) |
| Content | Astro Content Layer API (Markdown collections) |
| Icons | [astro-icon](https://www.astroicon.dev) |
| Type checking | TypeScript, `astro check` |

## Project Structure

```text
/
├── public/                  # Static assets (images, favicon)
├── src/
│   ├── components/
│   │   ├── Home/             # Homepage-only sections (Hero, About, Projects, FAQ...)
│   │   ├── Blog/              # Blog post card, listing pieces
│   │   └── Shared/            # Nav, Footer, and reusable UI (theme toggle, reveals, etc.)
│   ├── content/
│   │   └── blog/               # Markdown blog posts
│   ├── content.config.ts       # Content collection schema
│   ├── data/                   # Static site data (projects, technologies, FAQs...)
│   ├── layouts/
│   │   └── Layout.astro        # Root document shell, theme script, nav/footer
│   ├── lib/                    # Small utilities (e.g. reading-time calculator)
│   ├── pages/                  # File-based routes
│   └── styles/
│       └── global.css          # Tailwind import + theme tokens
└── package.json
```

## Getting Started

```sh
# Install dependencies
npm install

# Start the dev server at localhost:4321
npm run dev
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| --- | --- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts the local dev server at `localhost:4321` |
| `npm run build` | Type-checks with `astro check`, then builds to `./dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run astro ...` | Runs Astro CLI commands (e.g. `astro add`, `astro check`) |

## Deployment

The site is deployed on [Vercel](https://vercel.com), building automatically from the `main` branch.

## Contact

- Email: [mainasara.o.olulanke@gmail.com](mailto:mainasara.o.olulanke@gmail.com)
- LinkedIn: [mainasara-olulanke](https://www.linkedin.com/in/mainasara-olulanke-01658a228/)
- X: [@MainasaraOlu](https://x.com/MainasaraOlu)
