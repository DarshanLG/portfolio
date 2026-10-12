import { useState } from 'react'
import { skills, families, scene } from '../data.js'
import TrackingScene from './TrackingScene.jsx'

// Two views of the same skills, sharing the selected skill:
//  - "scene": a full-bleed render of Darshan at his desk, families split left
//    and right, and his head turns to look at whichever skill you point at.
//  - "table": the original periodic table with family filters.
export default function Skills() {
  const [view, setView] = useState('scene')
  const [fam, setFam] = useState('all')
  const [cur, setCur] = useState(skills[0])
  const [focusEl, setFocusEl] = useState(null)
  const famLabel = (id) => families.find((f) => f.id === id)?.label
  const idx = (s) => skills.indexOf(s) + 1
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

  const readout = (
    <div className="sk-readout" aria-live="polite">
      <div className={`mini f-${cur.f}`}><small>{String(idx(cur)).padStart(2, '0')}</small><b>{cur.s}</b></div>
      <div>
        <span className="label">{famLabel(cur.f)}</span>
        <h3>{cur.name}</h3>
        <p>{cur.used}</p>
      </div>
    </div>
  )

  return (
    <section className="section skills" id="skills">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">02 — Skills</span>
          <h2>The periodic table <span className="serif">of my stack.</span></h2>
          <p>{skills.length} elements in six families. Point at (or tap) a skill and I'll look at it, then see where I used it.</p>
        </div>

        <div className="fam-row rv" role="group" aria-label="View">
          <button className={`chip ${view === 'scene' ? 'on' : ''}`} onClick={() => setView('scene')} aria-pressed={view === 'scene'}>At my desk</button>
          <button className={`chip ${view === 'table' ? 'on' : ''}`} onClick={() => setView('table')} aria-pressed={view === 'table'}>Periodic table</button>
          {view === 'table' && (
            <>
              <span className="fam-sep" aria-hidden="true" />
              <button className={`chip ${fam === 'all' ? 'on' : ''}`} onClick={() => setFam('all')} aria-pressed={fam === 'all'}>All</button>
              {families.map((f) => (
                <button key={f.id} className={`chip ${fam === f.id ? 'on' : ''}`} onClick={() => setFam(fam === f.id ? 'all' : f.id)} aria-pressed={fam === f.id}>
                  <i className={`f-${f.id}`} style={{ background: 'var(--c)' }} />{f.label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* The reveal class sits on this stable wrapper: switching views
          remounts the children, and a fresh .rv element would stay hidden. */}
      <div className="rv">
        {view === 'scene' ? (
          <div className="wrap sk-view" key="scene"><div className="scene">
            <TrackingScene scene={scene} alt="Darshan, as a 3D character, working on a laptop at a desk in a park" focusEl={focusEl} />
            <div className="scene-ui">
              <div className="sk-side left">{sides[0].map(group)}</div>
              <div className="sk-mid">{readout}</div>
              <div className="sk-side right">{sides[1].map(group)}</div>
            </div>
          </div></div>
        ) : (
          <div className="wrap sk-view" key="table">
            <div className="table-wrap">
              <div className="ptable">
                {skills.map((s) => (
                  <button
                    key={s.s}
                    className={`el f-${s.f} ${cur === s ? 'on' : ''} ${fam !== 'all' && fam !== s.f ? 'dim' : ''}`}
                    // Respond on press, not release, so a tap on a phone shows
                    // the detail straight away.
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setCur(s)}
                    onPointerDown={() => setCur(s)}
                    onFocus={() => setCur(s)}
                    aria-label={`${s.name}, ${famLabel(s.f)}`}
                  >
                    <small>{String(idx(s)).padStart(2, '0')}</small>
                    <b>{s.s}</b>
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>

              <aside className="detail" aria-live="polite">
                <div className={`big f-${cur.f}`}>
                  <small>{String(idx(cur)).padStart(2, '0')}</small>
                  <b>{cur.s}</b>
                </div>
                <span className="label">{famLabel(cur.f)}</span>
                <h3>{cur.name}</h3>
                <p>{cur.used}</p>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
