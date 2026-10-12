import { useEffect, useRef, useState } from 'react'
import { profile, about, heroStats } from '../data.js'
import { Arrow, Down } from './Icons.jsx'
import { reduced, resumeProps } from '../App.jsx'

// Deterministic barcode from a string
function bars(seed) {
  let h = 0
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return Array.from({ length: 34 }, () => {
    h = (h * 1103515245 + 12345) >>> 0
    return 1 + (h % 3)
  })
}

// Progressive resistance past a boundary: the further you pull, the less it
// follows, and it never passes `dimension` beyond the edge.
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

// An ID card hanging from a lanyard. Drag it; it swings back like a pendulum.
//
// The swing is a spring described the way Apple describes them: `response` is
// roughly the period in seconds and `damping` is the damping ratio (1 = settles
// with no overshoot). A lanyard really does swing, so it is deliberately
// under-damped, unless the reader asked for reduced motion, in which case it
// eases straight back with no swing.
export default function Badge() {
  const stage = useRef(null)
  const arm = useRef(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const el = arm.current
    const card = el.querySelector('.card-id')
    const calm = reduced()
    const response = 0.65, damping = calm ? 1 : 0.12
    const w0 = (2 * Math.PI) / response       // natural frequency, rad/s
    const LIMIT = 1.1                          // soft edge of the drag, rad
    const MAX_W = 12                           // cap on a thrown swing, rad/s

    let angle = calm ? 0 : 0.32                // rad
    let omega = 0                              // rad/s
    let dragging = false
    let grab = 0                               // card angle minus pointer angle at grab
    let samples = []                           // recent { t, a } for release velocity
    let startPt = null                         // where the press began, for tap detection
    let raf = 0, prev = 0
    const TAP = 6                              // px of travel still counted as a tap

    const render = () => { el.style.transform = `rotate(${angle}rad)` }

    // Time-based, so it swings at the same speed on 60 Hz and 120 Hz screens.
    const tick = (now) => {
      const dt = Math.min((now - (prev || now)) / 1000, 1 / 30)
      prev = now
      if (!dragging) {
        // semi-implicit Euler on a damped pendulum
        omega += (-w0 * w0 * Math.sin(angle) - 2 * damping * w0 * omega) * dt
        angle += omega * dt
      }
      render()
      // Go idle once it has settled instead of repainting a still card forever.
      if (!dragging && Math.abs(angle) < 1e-3 && Math.abs(omega) < 1e-3) {
        angle = 0; omega = 0; render(); raf = 0; prev = 0
        return
      }
      raf = requestAnimationFrame(tick)
    }
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick) }

    // Measured from .rig itself -- a zero-size element sitting exactly at the
    // hanging point. The lanyard no longer hangs from the middle of the stage
    // (it is lined up with a letter of the background name), so assuming the
    // centre here would swing the card around the wrong point.
    const pointerAngle = (e) => {
      const r = el.parentElement.getBoundingClientRect()
      return Math.atan2(-(e.clientX - r.left), Math.max(40, e.clientY - r.top))
    }

    const down = (e) => {
      if (e.button !== 0) return
      // A press on a link on the back belongs to the link. Capturing the
      // pointer here would retarget the click to the card and the link would
      // never open.
      if (e.target.closest('a, button')) return
      dragging = true
      // Where the press started, so a release can tell a tap from a throw.
      startPt = [e.clientX, e.clientY]
      // Keep the point they grabbed under the pointer, rather than snapping
      // the card's centre line to it.
      grab = angle - pointerAngle(e)
      omega = 0
      samples = [{ t: e.timeStamp, a: angle }]
      card.setPointerCapture(e.pointerId)
      card.classList.add('held')
      wake()
    }
    const move = (e) => {
      if (!dragging) return
      const raw = pointerAngle(e) + grab
      const over = Math.abs(raw) - LIMIT
      angle = over > 0 ? Math.sign(raw) * (LIMIT + rubberband(over, 0.4)) : raw
      samples.push({ t: e.timeStamp, a: angle })
      // only the last ~100ms says anything about the release
      while (samples.length > 2 && e.timeStamp - samples[0].t > 100) samples.shift()
    }
    const up = (e) => {
      if (!dragging) return
      dragging = false
      card.classList.remove('held')
      // Hand the pointer's velocity to the spring so there is no seam between
      // dragging and swinging. If they held still before letting go, it's 0.
      const first = samples[0], last = samples[samples.length - 1]
      const span = (last.t - first.t) / 1000
      const stale = e.timeStamp - last.t > 50
      const v = !stale && span > 0 ? (last.a - first.a) / span : 0
      omega = Math.max(-MAX_W, Math.min(MAX_W, v))
      prev = 0
      wake()

      // A press that went nowhere is a tap: turn the card over. A real drag
      // swings it instead, so flinging the badge never flips it by accident.
      // Presses that land on a link on the back are that link's, not ours.
      if (e.type !== 'pointerup' || !startPt) return
      const travel = Math.hypot(e.clientX - startPt[0], e.clientY - startPt[1])
      startPt = null
      if (travel <= TAP && !e.target.closest('a, button')) setFlipped((f) => !f)
    }

    // pointerup, pointercancel and lostpointercapture all end a drag.
    const bound = [
      ['pointerdown', down], ['pointermove', move], ['pointerup', up],
      ['pointercancel', up], ['lostpointercapture', up],
    ]
    bound.forEach(([type, fn]) => card.addEventListener(type, fn))
    // a small nudge whenever it scrolls into view
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !calm && !dragging) { omega += 1.2; wake() }
    }, { threshold: .4 })
    io.observe(stage.current)
    render()
    wake()
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      bound.forEach(([type, fn]) => card.removeEventListener(type, fn))
    }
  }, [])

  return (
    <div className="badge-stage" ref={stage}>
      <div className="rig">
        <div className="rig-arm" ref={arm}>
          <div className="strap" />
          <div className="clip" />
          <div
            className="card-id"
            tabIndex={0}
            aria-label={`Developer ID card for ${profile.fullName}. Activate to turn it over.`}
            aria-pressed={flipped}
            role="button"
            onKeyDown={(e) => {
              // Keys pressed on a link inside the card bubble up here; let
              // Enter on "Explore work" follow the link, not flip the card.
              if (e.target !== e.currentTarget) return
              if (e.key !== 'Enter' && e.key !== ' ') return
              e.preventDefault()
              setFlipped((f) => !f)
            }}
          >
            <div className={`card-3d ${flipped ? 'flipped' : ''}`}>
              <div className="card-face front" aria-hidden={flipped}>
                <div className="top">
                  <span className="mono">{profile.initials}</span>
                  <div><b>DEVELOPER ID</b><small>Software Engineer</small></div>
                </div>
                <div className="photo">
                  {profile.photo ? <img src={profile.photo} alt="" draggable="false" /> : <span>{profile.initials}</span>}
                </div>
                <div className="body">
                  <b>{profile.fullName.toUpperCase()}</b>
                  <em>Full stack · Backend · AI</em>
                  <div className="meta"><span>{about.badgeId}</span><span>{profile.location.toUpperCase()}</span></div>
                  <div className="barcode" aria-hidden="true">
                    {bars(profile.fullName).map((w, i) => <i key={i} style={{ width: w }} />)}
                  </div>
                </div>
              </div>

              {/* The hero's old right-hand column, trimmed onto the back. */}
              <div className="card-face back" aria-hidden={!flipped}>
                <div className="top"><b>AT A GLANCE</b></div>
                <div className="back-body">
                  <div className="back-stats">
                    {heroStats.map((s) => (
                      <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
                    ))}
                  </div>
                  <div className="back-actions">
                    <a className="btn dark" href="#work" tabIndex={flipped ? 0 : -1}>Explore work <Arrow /></a>
                    <a className="btn" href="#contact" tabIndex={flipped ? 0 : -1}>Let's talk</a>
                    <a {...resumeProps('btn plain', flipped)}>Résumé <Down /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="label badge-hint">
        <span>Drag it</span>
        <span>Tap to flip</span>
      </span>
    </div>
  )
}
