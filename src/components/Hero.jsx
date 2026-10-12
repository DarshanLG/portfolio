import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data.js'
import Badge from './Badge.jsx'
import { reduced, onVisible } from '../App.jsx'

// Placeholder figure shown until profile.heroVideo is set.
function StandIn() {
  return (
    <svg className="standin" viewBox="0 0 220 640" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfcabb" /><stop offset="1" stopColor="#bdb7a6" />
        </linearGradient>
        <linearGradient id="sh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfaf6" /><stop offset="1" stopColor="#e4e0d4" />
        </linearGradient>
        <linearGradient id="tr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b3f5c" /><stop offset=".5" stopColor="#2b2f4a" /><stop offset="1" stopColor="#3b3f5c" />
        </linearGradient>
        <radialGradient id="fl" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#1c1d2c" stopOpacity=".22" /><stop offset="1" stopColor="#1c1d2c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="628" rx="86" ry="10" fill="url(#fl)" />
      {/* hair + head */}
      <path d="M78 66c0-32 18-50 33-50s34 18 34 50c0 10-2 20-6 28H84c-4-8-6-18-6-28z" fill="#2a2a33" />
      <ellipse cx="111" cy="74" rx="26" ry="32" fill="url(#sk)" />
      <path d="M84 60c6-26 48-30 56-2-10-10-40-14-56 2z" fill="#2a2a33" />
      <rect x="100" y="100" width="22" height="22" rx="8" fill="url(#sk)" />
      {/* shirt */}
      <path d="M58 136c6-14 26-20 52-20s46 6 52 20l10 128c1 10-6 16-14 16H62c-8 0-15-6-14-16z" fill="url(#sh)" />
      <path d="M100 118l10 22 10-22" fill="none" stroke="#d6d2c5" strokeWidth="2" />
      {/* arms */}
      <path d="M58 140c-10 6-16 30-18 70l-4 74c0 8 12 10 14 2l10-70z" fill="url(#sh)" />
      <path d="M162 140c10 6 16 30 18 70l4 74c0 8-12 10-14 2l-10-70z" fill="url(#sh)" />
      <ellipse cx="42" cy="296" rx="9" ry="12" fill="url(#sk)" />
      <ellipse cx="178" cy="296" rx="9" ry="12" fill="url(#sk)" />
      {/* trousers */}
      <path d="M64 266h92l10 344c0 6-6 10-12 10h-28c-6 0-10-4-10-10l-6-250-6 250c0 6-4 10-10 10H66c-6 0-12-4-12-10z" fill="url(#tr)" />
      <path d="M110 300v60" stroke="#20233a" strokeWidth="2" />
      {/* shoes */}
      <path d="M58 612h44c4 0 6 6 2 10H56c-4-4-2-10 2-10z" fill="#f6f4ee" />
      <path d="M118 612h44c4 0 6 6 2 10h-48c-4-4-2-10 2-10z" fill="#f6f4ee" />
    </svg>
  )
}

// Where the figure's head sits inside the video frame, measured from the clip
// itself and averaged over its length (he gestures, so the horizontal centre
// drifts; the top of his head barely moves). Re-measure if the clip changes.
const HEAD_X = 0.4928   // centre of the head, across the frame
const HEAD_TOP = 0.1315 // top of the hair, down the frame
const FEET = 0.9603     // soles, down the frame
const FEET_GAP = 10     // breathing room between the soles and the hero's edge
const MIN_STRAP = 104   // lanyard between the letter and the top of the card
const PAD_TOP = 90      // .hero padding-top
const PAD_BOTTOM = 56   // .hero padding-bottom at this size

export default function Hero() {
  const root = useRef(null)

  // Line the figure's head up with the first A of the background name, and the
  // top of the lanyard with the second A.
  //
  // The letter positions depend on the viewport (the name is sized in vw), so
  // they are measured rather than hard-coded, and re-measured on resize and
  // once the display font has actually loaded. The name also slides on scroll,
  // so each letter is located as a fraction of the name's own width and that
  // fraction applied to its untransformed position -- otherwise the alignment
  // would drift with the parallax.
  useEffect(() => {
    const hero = root.current
    const ghost = hero.querySelector('.ghost')
    const figure = hero.querySelector('.figure')
    const stage = hero.querySelector('.badge-stage')
    const narrow = window.matchMedia('(max-width: 860px)')

    const place = () => {
      // Stacked layout: the name sits elsewhere, so let the stylesheet decide.
      if (narrow.matches) {
        hero.style.removeProperty('--fig-dx')
        hero.style.removeProperty('--fig-dy')
        figure?.style.removeProperty('--figure-w')
        hero.style.removeProperty('--rig-left')
        hero.style.removeProperty('--rig-top')
        hero.style.removeProperty('--card-top')
        return
      }
      const letters = ghost.querySelectorAll('span')
      if (letters.length < 6) return
      const gBox = ghost.getBoundingClientRect()
      const hBox = hero.getBoundingClientRect()
      if (!gBox.width) return
      // Undo the parallax: the name is centred on the hero when untransformed.
      const base = hBox.left + hBox.width / 2 - gBox.width / 2
      const at = (i) => {
        const b = letters[i].getBoundingClientRect()
        return base + ((b.left + b.width / 2) - gBox.left)
      }
      const firstA = at(1), secondA = at(5)


      // Size him from what is left over, rather than from a guess. His soles
      // sit just inside the bottom of the hero and the top of his head is one
      // lanyard's length below the letter; whatever space remains between the
      // two is how tall he can be. Sizing him any other way lets the lanyard
      // collapse at viewport heights that happen not to suit it.
      const media = figure?.querySelector('video, img, svg')
      let headTop = null
      if (media) {
        // The badge now hangs off the top of his head, so the lanyard plus the
        // card need that much room below that line. Sizing him so his
        // head-to-sole height equals the badge's total height makes the two
        // columns span exactly the same band: lanyard top level with his head,
        // card bottom level with his soles.
        const cardFace = stage?.querySelector('.card-face.front')
        const badge = MIN_STRAP + (cardFace ? cardFace.offsetHeight : 378)
        const fits = hBox.height - PAD_TOP - PAD_BOTTOM
        // Never taller than the row, or the hero would grow and move the very
        // measurements this was derived from.
        const frame = Math.max(420, Math.min(badge / (FEET - HEAD_TOP), fits))
        figure.style.setProperty('--figure-w', `${(frame * 576 / 1024).toFixed(1)}px`)

        const mb = media.getBoundingClientRect()
        // The clip is letterboxed inside its box, and sits at the bottom of it
        // (object-position: bottom), so neither painted edge is the element's.
        const scale = Math.min(mb.width / 576, mb.height / 1024)
        const pw = 576 * scale, ph = 1024 * scale
        const headNow = mb.left + (mb.width - pw) / 2 + HEAD_X * pw
        const cur = parseFloat(hero.style.getPropertyValue('--fig-dx')) || 0
        hero.style.setProperty('--fig-dx', `${(cur + firstA - headNow).toFixed(1)}px`)

        // Sit him so his soles land just inside the bottom of the hero, which
        // is what keeps the whole figure on one screen. There is a little
        // empty frame below the soles; letting that spill past the edge costs
        // nothing and buys him some size.
        const targetFeet = hBox.bottom - FEET_GAP
        const feetNow = mb.bottom - ph + FEET * ph
        const curY = parseFloat(hero.style.getPropertyValue('--fig-dy')) || 0
        hero.style.setProperty('--fig-dy', `${(curY + targetFeet - feetNow).toFixed(1)}px`)
        // Derived from the target rather than the current position, so it does
        // not have to wait a frame for the move above to take effect.
        headTop = targetFeet - (FEET - HEAD_TOP) * ph
      }
      if (stage) {
        const sb = stage.getBoundingClientRect()
        // .rig is a zero-size element at the hanging point. Putting it on the
        // letter rather than at the top of the stage shortens the lanyard, and
        // means the card swings about the A instead of a point above it.
        hero.style.setProperty('--rig-left', `${(secondA - sb.left).toFixed(1)}px`)
        // Top of the lanyard sits on the same line as the top of his head.
        if (headTop !== null) {
          hero.style.setProperty('--rig-top', `${(headTop - sb.top).toFixed(1)}px`)
        }
        // Card top meets the top of his head. Measured from the hanging point,
        // so the lanyard spans exactly the gap between them. Deliberately
        // derived from the figure and not from the stage's own height, which
        // stays fixed -- sizing the stage from this would move the row, the
        // figure and the head with it.
        // Lanyard keeps its own length; the card follows it down.
        hero.style.setProperty('--card-top', `${MIN_STRAP}px`)
      }
    }

    place()
    const ro = new ResizeObserver(place)
    ro.observe(hero)
    // The <video> reports no intrinsic size until its metadata arrives, so the
    // first measurement can be taken against a box that is about to change.
    // Watching the element itself catches that; watching only the hero does
    // not, because the hero's own box never moves when the clip resolves.
    const media = figure?.querySelector('video, img, svg')
    if (media) {
      ro.observe(media)
      media.addEventListener('loadedmetadata', place)
      media.addEventListener('loadeddata', place)
    }
    document.fonts?.ready.then(place).catch(() => {})
    return () => {
      ro.disconnect()
      media?.removeEventListener('loadedmetadata', place)
      media?.removeEventListener('loadeddata', place)
    }
  }, [])

  useEffect(() => {
    if (reduced()) return
    let ctx
    // Deferred until the tab is on screen: these are `from` tweens, so they set
    // the hero to opacity 0 on their first frame. In a background tab that frame
    // never advances and the hero stays blank. See onVisible() in App.jsx.
    const stop = onVisible(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('.ghost', { yPercent: 30, opacity: 0, duration: 1.4 })
          .from('.figure', { y: 60, opacity: 0, duration: 1.2 }, '-=1.1')
          .from('.hero-copy > *', { y: 40, opacity: 0, duration: 1, stagger: 0.08 }, '-=.9')
        gsap.to('.ghost', {
          xPercent: -8, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }, root)
    })
    return () => { stop(); ctx?.revert() }
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      {/* Letters are individually wrapped so the figure and the lanyard can be
          lined up against specific ones -- see alignToGhost below. */}
      <div className="ghost" aria-hidden="true">
        {[...profile.firstName.toUpperCase()].map((ch, i) => <span key={i}>{ch}</span>)}
      </div>
      <div className="wrap hero-stage">
        <div className="hero-copy">
          <span className="label">{profile.fullName}</span>
          <h1>
            {profile.title[0]}<br />{profile.title[1]}<span className="dot">.</span>
          </h1>
          <p className="tag">{profile.tagline}</p>
        </div>

        <div className="figure">
          {profile.heroVideo ? (
            // A looping autoplay clip is motion like any other, so under
            // prefers-reduced-motion the still frame stands in for it.
            reduced() && profile.heroPoster ? (
              <img src={profile.heroPoster} alt={`${profile.fullName}, ${profile.title.join(' ')}`} />
            ) : (
              <video
                poster={profile.heroPoster || undefined}
                autoPlay muted loop playsInline
                preload="auto"
                disablePictureInPicture
                aria-label={`${profile.firstName} introducing himself`}
              >
                {/* WebM first: it has the alpha channel. Browsers that can't
                    decode VP9 alpha skip it and take the opaque MP4. */}
                {profile.heroVideoAlpha && (
                  <source src={profile.heroVideoAlpha} type="video/webm" />
                )}
                <source src={profile.heroVideo} type="video/mp4" />
              </video>
            )
          ) : (
            <>
              <StandIn />
              <span className="slot">HERO VIDEO GOES HERE</span>
            </>
          )}
        </div>

        <Badge />
      </div>
    </section>
  )
}
