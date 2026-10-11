import { useState } from 'react'
import { skills, families } from '../data.js'

export default function Skills() {
  const [fam, setFam] = useState('all')
  const [cur, setCur] = useState(skills[0])
  const famLabel = (id) => families.find((f) => f.id === id)?.label
  const idx = (s) => skills.indexOf(s) + 1

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">02 — Skills</span>
          <h2>The periodic table <span className="serif">of my stack.</span></h2>
          <p>{skills.length} elements in six families. Hover or tap a tile to see where I used it, or pick a family to light it up.</p>
        </div>

        <div className="fam-row rv" role="group" aria-label="Filter by family">
          <button className={`chip ${fam === 'all' ? 'on' : ''}`} onClick={() => setFam('all')} aria-pressed={fam === 'all'}>All</button>
          {families.map((f) => (
            <button key={f.id} className={`chip ${fam === f.id ? 'on' : ''}`} onClick={() => setFam(fam === f.id ? 'all' : f.id)} aria-pressed={fam === f.id}>
              <i className={`f-${f.id}`} style={{ background: 'var(--c)' }} />{f.label}
            </button>
          ))}
        </div>

        <div className="table-wrap rv">
          <div className="ptable">
            {skills.map((s) => (
              <button
                key={s.s}
                className={`el f-${s.f} ${cur === s ? 'on' : ''} ${fam !== 'all' && fam !== s.f ? 'dim' : ''}`}
                onMouseEnter={() => setCur(s)}
                onFocus={() => setCur(s)}
                onClick={() => setCur(s)}
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
    </section>
  )
}
