# Darshan Goneppanavar — Portfolio

React + Vite + GSAP. All content lives in `src/data.js`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Where the media lives
Everything the site loads is in `public/`, one folder per kind:

| Folder | Contents |
| --- | --- |
| `public/` (root) | `favicon.svg`, `og.png` (link-preview image; scrapers expect it at the root) |
| `public/hero/` | `hero.webm` (alpha), `hero.mp4` (fallback), `hero-poster.png` |
| `public/profile/` | `portrait.jpg` for the ID badge |
| `public/resume/` | `Resume.docx` (download) and `resume-preview.png` (shown in the dialog) |
| `public/certs/` | certificate PDFs, their `.webp` previews, issuer badges |
| `public/scene/` | Skills desk scene: background, head atlas, mask |

Paths are set in `src/data.js`. Replace a file in place to update it; re-render
`resume-preview.png` whenever the DOCX changes. Add GitHub links per project
with the `link` field in `projects`.

## Deploy (free)
- **Vercel:** import the repo → framework "Vite" → deploy.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** `npm run build` and publish the `dist` folder.

### Live at https://darshanlg-portfolio.vercel.app/
`index.html` hard-codes this URL in the canonical, `og:url`, `og:image` and
`twitter:image` tags. Open Graph requires **absolute** URLs, so if the site
moves to a custom domain, replace all four occurrences, redeploy, then confirm
with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

The preview image is `public/og.png` (1512×795) — replace it to change how the
site looks when the link is shared. Keep the 1.91:1 aspect ratio and update the
`og:image:width` / `og:image:height` tags if the size changes.
