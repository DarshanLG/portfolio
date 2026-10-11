import { useEffect, useRef } from 'react'
import { profile, about } from '../data.js'
import { Down, ArrowUR } from './Icons.jsx'
import { reduced } from '../App.jsx'

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
function Badge() {
  const stage = useRef(null)
  const arm = useRef(null)

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
    let raf = 0, prev = 0

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

    const pointerAngle = (e) => {
      const r = stage.current.getBoundingClientRect()
      const px = r.left + r.width / 2, py = r.top
      return Math.atan2(-(e.clientX - px), Math.max(40, e.clientY - py))
    }

    const down = (e) => {
      if (e.button !== 0) return
      dragging = true
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
    }

    card.addEventListener('pointerdown', down)
    card.addEventListener('pointermove', move)
    card.addEventListener('pointerup', up)
    card.addEventListener('pointercancel', up)
    card.addEventListener('lostpointercapture', up)
    // a small nudge whenever it scrolls into view
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !calm && !dragging) { omega += 1.2; wake() }
    }, { threshold: .4 })
    io.observe(stage.current)
    render()
    wake()
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      card.removeEventListener('pointerdown', down)
      card.removeEventListener('pointermove', move)
      card.removeEventListener('pointerup', up)
      card.removeEventListener('pointercancel', up)
      card.removeEventListener('lostpointercapture', up)
    }
  }, [])

  return (
    <div className="badge-stage" ref={stage}>
      <div className="rig">
        <div className="rig-arm" ref={arm}>
          <div className="strap" />
          <div className="clip" />
          <div className="card-id" role="img" aria-label={`Developer ID card for ${profile.fullName}`}>
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
              <div className="meta"><span>{about.badgeId}</span><span>LONG BEACH, CA</span></div>
              <div className="barcode" aria-hidden="true">
                {bars(profile.fullName).map((w, i) => <i key={i} style={{ width: w }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="label badge-hint">Drag the badge</span>
    </div>
  )
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-copy rv">
          <span className="label">01 — About</span>
          <h2>Hi, I'm <span className="serif">{profile.firstName}.</span></h2>
          {about.bio.map((p, i) => <p key={i}>{p}</p>)}
          <div className="row">
            <a className="btn dark" href={profile.resume} target="_blank" rel="noreferrer">Résumé <Down /></a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUR /></a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUR /></a>
          </div>
        </div>
        <Badge />
        <div className="rv">
          <dl className="facts">
            {about.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <p className="quote">“{about.quote}”</p>
        </div>
      </div>
    </section>
  )
}
