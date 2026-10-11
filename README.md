# Darshan Goneppanavar — Portfolio

React + Vite + GSAP. All content lives in `src/data.js`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Add your media
1. Put your hero video in `public/hero.mp4` (portrait, plain background works best) and set `heroVideo: './hero.mp4'` in `src/data.js`.
2. Put a portrait in `public/portrait.jpg` and set `photo: './portrait.jpg'` — it shows on the ID badge.
3. Replace `public/resume.pdf` whenever your resume changes.
4. Add GitHub links per project with the `link` field in `projects`.

## Deploy (free)
- **Vercel:** import the repo → framework "Vite" → deploy.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** `npm run build` and publish the `dist` folder.

### After the first deploy — set the real domain
`index.html` hard-codes `https://darshangoneppanavar.com/` in the canonical,
`og:url` and `og:image` tags. Open Graph requires **absolute** URLs, so link
previews stay blank until these point at the live domain. Replace all four
occurrences, redeploy, then confirm with
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

The preview image is `public/og.png` (1512×795) — replace it to change how the
site looks when the link is shared. Keep the 1.91:1 aspect ratio and update the
`og:image:width` / `og:image:height` tags if the size changes.
