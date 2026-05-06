# Engineering Reference — Sruthilaya Portfolio

Quick guide to editing and extending the site without having to dig through component code.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Fonts | Courier Prime (serif) · DM Mono (mono) via `next/font/google` |
| Styling | Inline styles + scoped `<style>` blocks (no Tailwind used meaningfully) |
| Animation | CSS transitions · CSS keyframes · vanilla JS for highlight pulses |

---

## Content — Edit Here First

All user-facing text and data lives in `content/`. You should never need to touch a component to update copy.

### `content/profile.ts`
Your personal bio. Controls:
- Name, full name, role, tagline, location, status label
- Email, LinkedIn URL + handle
- Stats shown in the Experience bento card (`yearsExp`, `roles`, `domain`, `roleLabel`)
- Current education string (shown in bento)
- Tech stack chips — `primary` array (blue tinted) and `secondary` array (neutral)
- Resume path + download filename

```ts
// To update availability status:
status: 'Open to work',   // shown with green dot in hero
available: true,          // controls nav "AVAILABLE" dot
```

### `content/projects.ts`
Array of `Project` objects. **First 3 appear in the carousel** — order matters.

```ts
// Add a project:
{
  id: 6,
  title: 'Your Project',
  tag: 'AI / LLM',
  year: '2025',
  stack: ['Python', 'FastAPI'],
  summary: 'One sentence — shown in carousel card (keep under ~100 chars)',
  description: 'Full paragraph — shown in overlay detail panel',
  link: 'https://github.com/...',   // optional
}
```

### `content/experience.ts`
Array of `Role` objects in the timeline. Oldest first.

Also exports:
- `LATEST_ROLE` — the last role (shown in Experience bento card right column)
- `BENTO_HIGHLIGHTS` — two bullet strings shown in the bento card preview

```ts
// Update bento card preview bullets:
export const BENTO_HIGHLIGHTS = [
  'Led CX analytics across 3 product lines',
  'Built NLP tagging pipeline reducing manual effort by 60%',
]
```

### `content/activity.ts`
Array of `Activity` objects. **First 2 shown in bento preview.**

Platforms: `'x' | 'linkedin' | 'paper' | 'github' | 'blog'`

```ts
// Replace '#' with real URLs when you have them:
url: 'https://x.com/your-actual-post',
```

Tags: `'LLM' | 'RAG' | 'Agents' | 'NLP' | 'Career' | 'Research' | 'Building'`

### `content/thoughts.ts`
Array of `Thought` objects. **First 3 hooks shown in bento preview.**

- `hook` — required one-liner (shown in quotes everywhere)
- `rant` — optional paragraph shown in overlay
- `image` — optional image path e.g. `'/images/thought1.jpg'`

Tags: `'Philosophy' | 'Books' | 'Lifestyle' | 'Tech' | 'Poetry' | 'Random' | 'Food' | 'Building'`

To add a tag colour, edit `TAG_COLORS` at the bottom of the file.

---

## Pages & Layout

### `app/layout.tsx`
Root wrapper. Touch this to:
- Change the page `<title>` and `<meta description>`
- Swap fonts (currently Courier Prime + DM Mono)
- Add global providers or analytics scripts

### `app/page.tsx`
Two full-viewport sections with `scroll-snap-type: y mandatory` on `<main>`:
1. **Hero** — left content column + HeroPhoto on the right
2. **Bento** — rendered by `<BentoSection />`

The tech stack chips in the hero are currently hardcoded inline — if you want them driven by `PROFILE.stack`, they're on lines ~200–227.

---

## Components

### `components/Nav.tsx`
Fixed navigation. Three links: **Projects**, **Experience**, **Contact**.

Clicking each:
1. Scrolls `main` to `#bento-section`
2. After 600ms fires a custom window event (`highlight-projects`, `highlight-experience`, `highlight-contact`)
3. `BentoSection` listens and pulses the matching card's border for 3 seconds

To add a nav link: add an entry to the array in both the desktop and mobile menus, dispatch a new custom event, and add the listener + ref in `BentoSection.tsx`.

### `components/BentoSection.tsx`
The 2-row bento grid. Row 1: Projects | Experience. Row 2: Activity | Thoughts | (Contact + Resume).

Each cell has:
- A `ref` for the highlight pulse
- An overlay opened by a state boolean (`overlayOpen`, `expOpen`, `activityOpen`, `thoughtsOpen`)
- Content imported from `content/`

To add a new cell: add it to the grid JSX, create an overlay component, add `useState` + `ref` + event listener in BentoSection.

### `components/LoadingScreen.tsx`
8-stage loading sequence (~14.5s total). Edit `STAGES` to change:
- `pct` — the percentage shown
- `title` — large serif text
- `subtitle` — mono italic text (wrapped in `{ }` braces)
- `floats` — 5 text strings scattered around the screen

Edit `ICONS` to swap loading icons:
```ts
const ICONS = [
  { src: '/icons/laptop.png', label: 'Laptop' },
  // one icon per stage, 8 total
]
```

Icons live in `public/icons/`. Replace PNGs to update them.

### `components/HeroPhoto.tsx`
Stop-motion avatar. Three frames: `sruthilaya.png` → `sruthilaya2.png` → `sruthilaya3.png` in `public/`.

- No hover → shows frame 1
- Mouse enters → steps through frames, holds on frame 3
- Mouse leaves → back to frame 1

To update: replace the three PNGs in `public/`. Frame interval is `FRAME_DURATION = 120ms`.

### `components/LoadingWrapper.tsx`
Controls whether loading screen shows:
- **First visit** (no `sessionStorage` key) → full 14.5s loader
- **Refresh** → 2s texture fade-in, then site appears
- Session key is set when `onDone()` fires (loader completes)

To force-show the loader during dev: run in console:
```js
sessionStorage.removeItem('portfolio-loaded'); location.reload();
```

---

## Overlays

All four overlays (`ProjectsOverlay`, `ExperienceOverlay`, `ActivityOverlay`, `ThoughtsOverlay`) share the same pattern:
- Triggered by a boolean prop `open`
- `useBodyScrollLock(open)` from `lib/useBodyScrollLock.ts` prevents background scroll
- `Escape` key closes
- `← Back` button closes
- Same paper texture background at 35% opacity
- Tag filter bar at the top

---

## Adding New Sections

1. Add data to `content/` (create a new file if needed)
2. Create an overlay component in `components/`
3. Add a bento cell in `BentoSection.tsx` with a ref + state + event listener
4. Add a nav link in `Nav.tsx` that dispatches the highlight event
5. If the section has a tag filter, follow the `ActivityOverlay` pattern

---

## Public Assets

```
public/
  texture.jpg          — paper background (used on all pages)
  resume.pdf           — downloadable CV
  sruthilaya.png       — hero photo frame 1
  sruthilaya2.png      — hero photo frame 2
  sruthilaya3.png      — hero photo frame 3
  mousepointer.png     — custom cursor PNG
  icons/               — loading screen icons (8 PNGs, one per stage)
```

---

## Environment & Dev

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

Fonts are loaded via Next.js — no Google Fonts `@import` in CSS.

CSS variables in `globals.css`:
- `--font-serif` → Courier Prime (set by layout.tsx)
- `--font-mono` → DM Mono (set by layout.tsx)
- `--f-mono` → alias for `--font-mono` (used in body/Nav legacy)
- `--midnight` → `#1A1A1A` (primary text colour)
- `--bg` → `#F4F4F0` (background)
