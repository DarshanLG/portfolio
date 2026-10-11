import { useEffect, useState } from 'react'
import { profile } from '../data.js'

const items = [
  ['about', 'About'], ['skills', 'Skills'], ['work', 'Work'],
  ['journey', 'Experience'], ['moments', 'Achievements'], ['contact', 'Contact'],
]

export default function Nav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    const top = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', top, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', top) }
  }, [])

  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="Back to top">
        <span className="mono">{profile.initials}</span>
        <span className="who">{profile.shortName}</span>
      </a>
      <nav className="pill" aria-label="Sections">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
        ))}
      </nav>
    </header>
  )
}
