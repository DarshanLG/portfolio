import { useState } from 'react'
import { skills, families, scene } from '../data.js'
import TrackingScene from './TrackingScene.jsx'

// A full-bleed render of Darshan at his desk, skill families split left and
// right, and his head turns to look at whichever skill you point at. The card
// at the bottom says where that skill was used.
export default function Skills() {
  const [cur, setCur] = useState(skills[0])
  const [focusEl, setFocusEl] = useState(null)
  const famLabel = (id) => families.find((f) => f.id === id)?.label
  const sides = [families.slice(0, 3), families.slice(3)]

  const pick = (s) => (e) => {
    setCur(s)
    setFocusEl(e.currentTarget)
  }

  const group = (f) => (
    <div className="sk-group" key={f.id}>
      <span className="label">{f.label}</span>
      <div className="sk-list">
        {skills.filter((s) => s.f === f.id).map((s) => (
          <button
            key={s.s}
            className={`sk f-${s.f} ${cur === s ? 'on' : ''}`}
            onPointerEnter={(e) => e.pointerType === 'mouse' && pick(s)(e)}
            // Only a mouse "leaves". On touch, pointerleave fires straight
            // after the tap and would make him look away immediately.
            onPointerLeave={(e) => e.pointerType === 'mouse' && setFocusEl(null)}
            onPointerDown={pick(s)}
            onFocus={pick(s)}
            onBlur={() => setFocusEl(null)}
            aria-pressed={cur === s}
          >
            <i aria-hidden="true">{s.s}</i>{s.name}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section className="section skills" id="skills">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">Skills</span>
          <h2>The tools I <span className="serif">build with.</span></h2>
          <p>Every skill here has shipped somewhere. Pick one to see where.</p>
        </div>
      </div>

      <div className="wrap rv"><div className="scene">
        <TrackingScene scene={scene} alt="Darshan, as a 3D character, working on a laptop at a desk in a park" focusEl={focusEl} />
        <div className="scene-ui">
          <div className="sk-side left">{sides[0].map(group)}</div>
          <div className="sk-mid">
            <div className="sk-readout" aria-live="polite">
              <div className={`mini f-${cur.f}`}><b>{cur.s}</b></div>
              <div>
                <span className="label">{famLabel(cur.f)}</span>
                <h3>{cur.name}</h3>
                <p>{cur.used}</p>
              </div>
            </div>
          </div>
          <div className="sk-side right">{sides[1].map(group)}</div>
        </div>
      </div></div>
    </section>
  )
}
