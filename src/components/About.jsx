import { profile, about } from '../data.js'
import { Down, ArrowUR } from './Icons.jsx'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-copy rv">
          <span className="label">01 — About</span>
          <h2>Hi, I'm <span className="serif">{profile.firstName}.</span></h2>
          {about.bio.map((p, i) => <p key={i}>{p}</p>)}
          <div className="row">
            <a
              className={`btn dark ${profile.resumeEnabled ? '' : 'is-off'}`}
              href={profile.resumeEnabled ? profile.resume : undefined}
              target="_blank" rel="noreferrer"
              aria-disabled={profile.resumeEnabled ? undefined : 'true'}
              tabIndex={profile.resumeEnabled ? undefined : -1}
            >Résumé <Down /></a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUR /></a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUR /></a>
          </div>
        </div>
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
