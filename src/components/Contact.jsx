import { useState } from 'react'
import { profile } from '../data.js'
import { ArrowUR } from './Icons.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    catch { const r = document.createRange(); r.selectNode(document.getElementById('mail')); getSelection().removeAllRanges(); getSelection().addRange(r) }
  }
  return (
    <footer className="contact" id="contact">
      <div className="wrap section" style={{ paddingBottom: 0 }}>
        <span className="label">06 — Contact</span>
        <h2>Let's <span className="serif">talk.</span></h2>
        <div className="contact-grid">
          <p>I finish my MS in December 2026 and I'm looking for full-time software engineering roles in the US. If you're building something that has to work in production, I'd like to hear about it.</p>
          <div className="links">
            <div className="mail"><span className="k">Email</span><span id="mail">{profile.email}</span><button className={`copy ${copied ? 'done' : ''}`} onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button></div>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="k">LinkedIn</span><span>/in/darshanlg</span><ArrowUR /></a>
            <a href={profile.github} target="_blank" rel="noreferrer"><span className="k">GitHub</span><span>{profile.github.replace('https://github.com/', '@')}</span><ArrowUR /></a>
            <a href={profile.resume} target="_blank" rel="noreferrer"><span className="k">Résumé</span><span>PDF</span><ArrowUR /></a>
          </div>
        </div>
        <div className="foot-line">
          <span>© 2026 {profile.shortName}</span>
          <span>Built with React and GSAP</span>
        </div>
      </div>
    </footer>
  )
}
