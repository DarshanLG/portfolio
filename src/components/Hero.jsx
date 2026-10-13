import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data.js'
import Badge from './Badge.jsx'
import { reduced, onVisible } from '../App.jsx'

// Where the figure's head sits inside the video frame, measured from the clip
// itself and averaged over its length (he gestures, so the horizontal centre
// drifts; the top of his head barely moves). Re-measure if the clip changes.
const HEAD_X = 0.4965   // centre of the head, across the frame
const HEAD_TOP = 0.1338 // top of the hair, down the frame
const FEET = 0.9512     // soles, down the frame
const FEET_GAP = 10     // breathing room between the soles and the hero's edge
// Top of the hole inside the A, down the letter's own box (Geist 800; measured
// by rasterising the glyph). The head and the lanyard both start on this
// line. Re-measure if the display font changes.
const A_CAVITY = 0.375
const STRAP = 104       // lanyard between the letter and the top of the card
const CARD_SCALE = 1.15 // how much larger than its 256px layout the card is drawn
const CARD_MIN = 0.85   // ...and how far it may shrink to stay above his soles
const CARD_FULL_AT = 1280 // window width below which the card scales down with it
const COPY_GAP = 20     // space kept between the title copy and the card
const HINT_W = 110      // room the "drag it / tap to flip" label needs beside the card

export default function Hero() {
  const root = useRef(null)

  // Line the figure's head up with the first A of the background name -- centred
  // under it, top of the head where the hole in the A begins -- and hang the
  // lanyard from the second A, its top on the same line as his head.
  //
  // The letter positions depend on the viewport (the name is sized in vw), so
  // they are measured rather than hard-coded, and re-measured on resize and
  // once the display font has actually loaded. The name also slides on scroll
  // and drops in on load, so each letter is located relative to the name's own
  // box and that offset applied to its untransformed position -- otherwise the
  // alignment would drift with the parallax or the intro.
  useEffect(() => {
    const hero = root.current
    const ghost = hero.querySelector('.ghost')
    const figure = hero.querySelector('.figure')
    const stage = hero.querySelector('.badge-stage')
    const narrow = window.matchMedia('(max-width: 860px)')

    const copy = hero.querySelector('.hero-copy')
    const title = copy?.querySelector('h1')

    const place = () => {
      // Start from the stylesheet's sizes each time, so a fit worked out at
      // one width never sticks after the window grows again.
      title?.style.removeProperty('font-size')
      copy?.style.removeProperty('max-width')
      hero.classList.remove('hint-up')
      // Stacked layout: the name sits elsewhere, so let the stylesheet decide.
      if (narrow.matches) {
        hero.style.removeProperty('--fig-dx')
        hero.style.removeProperty('--fig-dy')
        figure?.style.removeProperty('--figure-w')
        hero.style.removeProperty('--rig-left')
        hero.style.removeProperty('--rig-top')
        hero.style.removeProperty('--card-top')
        hero.style.removeProperty('--card-scale')
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
      // Where the hole in the first A begins, untransformed. The intro tween
      // drops the name in from below, so its resting top is read from the
      // stylesheet (a positioned element's computed `top` is the used value,
      // in px) rather than measured, and the letter located relative to the
      // name's box.
      const aBox = letters[1].getBoundingClientRect()
      const ghostTop = hBox.top + (parseFloat(getComputedStyle(ghost).top) || 0)
      const line = ghostTop + (aBox.top - gBox.top) + A_CAVITY * aBox.height

      // Size him from what is left over, rather than from a guess. The top of
      // his head sits on the line and his soles just inside the bottom of the
      // hero; whatever space lies between the two is how tall he is. He is out
      // of flow, so this never changes the hero's height.
      const media = figure?.querySelector('video, img, svg')
      let headTop = null, soles = null
      if (media) {
        const targetFeet = hBox.bottom - FEET_GAP
        const frame = Math.max(420, (targetFeet - line) / (FEET - HEAD_TOP))
        figure.style.setProperty('--figure-w', `${(frame * 576 / 1024).toFixed(1)}px`)

        const mb = media.getBoundingClientRect()
        // The intro tween slides the figure up into place, and the clip can
        // finish loading (which re-runs this) while that is still going. The
        // tween is a transform, so it is read back and discounted; otherwise
        // whatever offset it had at that instant would be baked in for good.
        const t = getComputedStyle(figure).transform
        const tf = t && t !== 'none' ? new DOMMatrixReadOnly(t) : null
        const tx = tf ? tf.m41 : 0, ty = tf ? tf.m42 : 0
        // The clip is letterboxed inside its box, and sits at the bottom of it
        // (object-position: bottom), so neither painted edge is the element's.
        const scale = Math.min(mb.width / 576, mb.height / 1024)
        const pw = 576 * scale, ph = 1024 * scale
        const headNow = mb.left - tx + (mb.width - pw) / 2 + HEAD_X * pw
        const cur = parseFloat(hero.style.getPropertyValue('--fig-dx')) || 0
        hero.style.setProperty('--fig-dx', `${(cur + firstA - headNow).toFixed(1)}px`)

        // Top of the hair on the line.
        const headNowY = mb.bottom - ty - ph + HEAD_TOP * ph
        const curY = parseFloat(hero.style.getPropertyValue('--fig-dy')) || 0
        hero.style.setProperty('--fig-dy', `${(curY + line - headNowY).toFixed(1)}px`)
        // Derived from the target rather than the current position, so it does
        // not have to wait a frame for the move above to take effect.
        headTop = line
        soles = line + (FEET - HEAD_TOP) * ph
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
        // The lanyard has a fixed length and the card hangs below it, drawn
        // larger than its layout box. On a window too short for that, the
        // card shrinks (within reason) so it never reaches past his soles,
        // which is where the hero's edge would crop it.
        hero.style.setProperty('--card-top', `${STRAP}px`)
        const cardFace = stage.querySelector('.card-face.front')
        const cardH = cardFace ? cardFace.offsetHeight : 378
        // On narrower windows the card also scales with the width, otherwise
        // at 1.15x it is wider than its column and runs into the title.
        let scale = CARD_SCALE * Math.min(1, hBox.width / CARD_FULL_AT)
        if (soles !== null) scale = Math.min(scale, (soles - headTop - STRAP) / cardH)
        scale = Math.max(CARD_MIN, scale)
        hero.style.setProperty('--card-scale', scale.toFixed(3))

        // The card's position is fixed by the letter, so the copy gives way
        // instead: the tagline wraps inside the room left of the card, and the
        // title shrinks just enough that "Engineer." clears it.
        const cardLeft = secondA - 128 * scale - COPY_GAP
        if (copy && title) {
          const cb = copy.getBoundingClientRect()
          const room = cardLeft - cb.left
          if (room > 0 && room < cb.width) {
            copy.style.maxWidth = `${room.toFixed(1)}px`
            const r = document.createRange()
            r.selectNodeContents(title)
            const textW = Math.max(...[...r.getClientRects()].map((x) => x.right)) - cb.left
            if (textW > room) {
              const size = parseFloat(getComputedStyle(title).fontSize)
              title.style.fontSize = `${(size * room / textW).toFixed(1)}px`
            }
          }
        }
        // Not enough room right of the card for the hint: it moves up beside
        // the lanyard instead of running off the edge.
        if (secondA + 128 * scale + 16 + HINT_W > hBox.right) hero.classList.add('hint-up')
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
          lined up against specific ones -- see place() above. */}
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
          {/* A looping autoplay clip is motion like any other, so under
              prefers-reduced-motion the still frame stands in for it. */}
          {reduced() && profile.heroPoster ? (
            <img src={profile.heroPoster} alt={`${profile.fullName}, ${profile.title.join(' ')}`} />
          ) : (
            <video
              poster={profile.heroPoster || undefined}
              autoPlay muted loop playsInline
              preload="auto"
              disablePictureInPicture
              aria-label={`${profile.firstName} waving hello`}
            >
              {/* WebM first: it has the alpha channel. Browsers that can't
                  decode VP9 alpha skip it and take the opaque MP4. */}
              {profile.heroVideoAlpha && (
                <source src={profile.heroVideoAlpha} type="video/webm" />
              )}
              <source src={profile.heroVideo} type="video/mp4" />
            </video>
          )}
        </div>

        <Badge />
      </div>
    </section>
  )
}
