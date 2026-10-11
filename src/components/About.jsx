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

// An ID card hanging from a lanyard. Drag it; it swings back like a pendulum.
function Badge() {
  const stage = useRef(null)
  const arm = useRef(null)

  useEffect(() => {
    const el = arm.current
    let angle = reduced() ? 0 : 0.32
    let vel = 0
    let dragging = false
    let last = 0
    let raf
    const k = 0.028, damp = 0.965, L = 300

    const pivot = () => {
      const r = stage.current.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top }
    }
    const tick = () => {
      if (!dragging) { vel += -k * Math.sin(angle); vel *= damp; angle += vel }
      el.style.transform = `rotate(${angle}rad)`
      raf = requestAnimationFrame(tick)
    }
    const move = (e) => {
      if (!dragging) return
      const p = pivot()
      const a = Math.atan2(-(e.clientX - p.x), Math.max(40, e.clientY - p.y))
      const next = Math.max(-1.1, Math.min(1.1, a))
      vel = next - last
      last = next
      angle = next
    }
    const down = (e) => {
      dragging = true; last = angle
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }
    const up = () => { dragging = false }
    const card = el.querySelector('.card-id')
    card.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    // a small nudge whenever the user scrolls into it
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !reduced()) vel += 0.02 }, { threshold: .4 })
    io.observe(stage.current)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      card.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
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
