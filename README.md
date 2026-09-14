# Daxsara — Website

A fully static site. No build step, no backend, no database.

## Structure
- `index.html`, `about.html`, `events.html`, `academy.html`, `services.html`, `work.html`, `thought.html`, `contact.html` — top-level pages
- `events/*.html` — individual event pages
- `js/data.js` — **edit this file** to add/change/remove events, projects, and thought pieces. Nothing else needs to change for content edits to those.
- `js/i18n.js` — English/Persian text for navigation, footer, and homepage/contact copy. The نF/EN button in the nav toggles it.
- `js/main.js` — behavior: the eight-pointed star component, scroll reveal, the opening scroll sequence, and rendering events/projects/thoughts from `data.js`.
- `css/style.css` — the whole visual system (colors, type, layout, animation) lives here as CSS custom properties at the top.

## Adding a new event
1. Add an entry to the `DAXSARA_EVENTS` array in `js/data.js`.
2. Duplicate any file in `/events/` and rename it to `your-slug.html`; update the visible text (title, date, city, venue, description). It will automatically show up in the homepage preview and the `/events.html` archive once the data entry exists.

## Adding a new project or thought piece
Add an entry to `DAXSARA_PROJECTS` or `DAXSARA_THOUGHTS` in `js/data.js`. The `/work.html` and `/thought.html` archive lists render from that data automatically (thought essay bodies are written directly on `thought.html` — add a matching `<article>` block there).

## Deploying
### GitHub Pages
1. Push this folder to a GitHub repository.
2. In the repo settings → Pages, set the source to the branch/root you pushed to.
3. Done — no build step required.

### Cloudflare Pages / any static host
Point the host at this folder as the site root. No build command is needed.

## Scope note on Persian (فارسی)
The language toggle switches navigation, the footer, and the homepage and contact page copy into Persian, written as its own copy rather than a literal translation, with the page direction switching to RTL and Persian type (Vazirmatn). The longer editorial pages — About, Academy, Services, Work, and the Thought essays — are currently English-only. Extending the same `data-i18n` + `js/i18n.js` pattern to those pages is straightforward and is a good next step if a fully bilingual site is needed.
