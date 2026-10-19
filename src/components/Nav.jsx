import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { reduced } from '../App.jsx'

const items = [
  ['about', 'About'], ['skills', 'Skills'], ['work', 'Work'],
  ['experience', 'Experience'], ['education', 'Education'],
  ['moments', 'Highlights'], ['contact', 'Contact'],
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const pill = useRef(null)
  const ind = useRef(null)
  const placed = useRef(false)

  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    const onScroll = () => {
      if (window.scrollY < 200) setActive('')
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  // When the links don't all fit (phones), fade whichever edge has more links
  // past it, so it reads as something that scrolls rather than a cut-off bar.
  useEffect(() => {
    const p = pill.current
    const edges = () => {
      const max = p.scrollWidth - p.clientWidth
      p.classList.toggle('more-l', max > 1 && p.scrollLeft > 1)
      p.classList.toggle('more-r', max > 1 && p.scrollLeft < max - 1)
    }
    edges()
    p.addEventListener('scroll', edges, { passive: true })
    const ro = new ResizeObserver(edges)
    ro.observe(p)
    return () => { p.removeEventListener('scroll', edges); ro.disconnect() }
  }, [])

  // Move the shared indicator under the active link. Layout effect so it is
  // placed in the same frame the link changes color, with no flash in between.
  useLayoutEffect(() => {
    const place = () => {
      const marker = ind.current
      const link = pill.current?.querySelector('a.on')
      if (!marker) return
      if (!link) { marker.classList.remove('show'); return }
      // The first time it appears there is no previous position to come from,
      // so it fades in where it belongs instead of sliding in from x = 0.
      marker.classList.toggle('snap', !placed.current)
      marker.style.setProperty('--x', `${link.offsetLeft}px`)
      marker.style.setProperty('--w', `${link.offsetWidth}px`)
      marker.classList.add('show')
      if (!placed.current) {
        placed.current = true
        requestAnimationFrame(() => marker.classList.remove('snap'))
      }
      // On narrow screens the pill scrolls sideways; keep the active link in view.
      const p = pill.current
      if (p.scrollWidth > p.clientWidth) {
        const left = link.offsetLeft - (p.clientWidth - link.offsetWidth) / 2
        p.scrollTo({ left, behavior: reduced() ? 'auto' : 'smooth' })
      }
    }
    place()
    window.addEventListener('resize', place)
    // Link widths change once the display font loads.
    document.fonts?.ready.then(place).catch(() => {})
    return () => window.removeEventListener('resize', place)
  }, [active])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      {/* The bar spans the window so its scroll blur does, but the contents
          sit in the same column as every section's content. */}
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="mono">{profile.initials}</span>
          <span className="who">{profile.shortName}</span>
        </a>
        <nav className="pill" aria-label="Sections" ref={pill}>
          <span className="ind" ref={ind} aria-hidden="true" />
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
