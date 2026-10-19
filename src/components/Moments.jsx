import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { moments } from '../data.js'
import { reduced, onVisible } from '../App.jsx'

const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })

export default function Moments() {
  const root = useRef(null)
  useEffect(() => {
    if (reduced()) return
    let ctx
    // Same reasoning as the hero: the count-up blanks each number to 0 on its
    // first frame, so it must not start while the tab is throttled.
    const stop = onVisible(() => {
      ctx = gsap.context(() => {
        root.current.querySelectorAll('[data-n]').forEach((el) => {
          const target = parseFloat(el.dataset.n), d = parseInt(el.dataset.d || '0')
          const o = { v: 0 }
          gsap.to(o, {
            v: target, duration: 1.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => { el.textContent = fmt(o.v, d) },
            onStart: () => { el.textContent = fmt(0, d) },
          })
        })
      }, root)
    })
    return () => { stop(); ctx?.revert() }
  }, [])

  return (
    <section className="section" id="moments" ref={root}>
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">Highlights</span>
          <h2>Proud <span className="serif">moments.</span></h2>
          <p>The numbers behind the work, from production and from the lab.</p>
        </div>
        <div className="moments">
          {moments.map((m) => (
            <div className="moment rv" key={m.label}>
              <div className="where"><span className="label">{m.where}</span></div>
              <div className="num">
                <span data-n={m.n} data-d={m.decimals || 0}>{fmt(m.n, m.decimals || 0)}</span>
                {m.suffix && <sup>{m.suffix}</sup>}
              </div>
              <p>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
