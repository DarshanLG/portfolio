import { useState } from 'react'
import { projects, profile } from '../data.js'
import Cover from './Covers.jsx'
import { ArrowUR } from './Icons.jsx'

export default function Work() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">03 — Selected work</span>
          <h2>Things I've <span className="serif">built.</span></h2>
        </div>
        <div className="stack rv">
          {projects.map((p, i) => (
            <article key={p.id} className={`panel ${open === i ? 'open' : ''}`} onClick={() => setOpen(i)}>
              <button className="spine" aria-expanded={open === i} aria-label={`Open ${p.title}`} onClick={() => setOpen(i)}>
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{p.title}</span>
                <span className="plus" aria-hidden="true">+</span>
              </button>
              <div className="inner" aria-hidden={open !== i}>
                <div className="txt">
                  <span className="label">{String(i + 1).padStart(2, '0')} — {p.kicker}</span>
                  <h3>{p.title}</h3>
                  <p className="blurb">{p.blurb}</p>
                  <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <div className="foot">
                    <a className="btn dark" href={p.link || profile.github} target="_blank" rel="noreferrer" tabIndex={open === i ? 0 : -1}>
                      View on GitHub <ArrowUR />
                    </a>
                  </div>
                </div>
                <div className="cover"><Cover kind={p.cover} /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
