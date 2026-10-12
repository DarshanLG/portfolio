import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from './data.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Moments from './components/Moments.jsx'
import Contact from './components/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Props for a Résumé link, wherever one appears. While profile.resumeEnabled
// is false the link stays exactly where it is but is inert: no href, nothing to
// focus, and dimmed by .is-off. `focusable` lets a caller hold it out of the tab
// order for its own reasons -- the badge's back face does, while turned away.
export function resumeProps(className = '', focusable = true) {
  const on = profile.resumeEnabled
  return {
    className: `${className}${on ? '' : ' is-off'}`.trim(),
    href: on ? profile.resume : undefined,
    target: '_blank',
    rel: 'noreferrer',
    'aria-disabled': on ? undefined : 'true',
    tabIndex: on && focusable ? undefined : -1,
  }
}

// Run `fn` once the page is actually on screen, and return a cleanup function.
//
// GSAP is driven by requestAnimationFrame, which browsers throttle to zero in a
// background tab. An intro that starts by setting things to opacity 0 therefore
// never advances past that first frame — someone who middle-clicks the link from
// LinkedIn and switches over a minute later lands on a blank page. Waiting for
// the first paint costs nothing and removes the whole failure mode.
export function onVisible(fn) {
  if (typeof document === 'undefined') return () => {}
  if (document.visibilityState === 'visible') {
    fn()
    return () => {}
  }
  const handler = () => {
    if (document.visibilityState !== 'visible') return
    document.removeEventListener('visibilitychange', handler)
    fn()
  }
  document.addEventListener('visibilitychange', handler)
  return () => document.removeEventListener('visibilitychange', handler)
}

// A revealed element is done animating: hand it back to the stylesheet. The
// class lifts the CSS hiding rule, and clearing GSAP's inline transform lets
// hover effects (e.g. .moment:hover) work again and drops the will-change hint.
function settle(el) {
  gsap.killTweensOf(el)
  el.classList.add('rv-done')
  gsap.set(el, { clearProps: 'transform,opacity' })
}

export default function App() {
  // Gentle scroll reveals for anything marked .rv
  useEffect(() => {
    if (reduced()) return
    let ctx
    let failsafe

    const stop = onVisible(() => {
      // Hiding lives in CSS behind this class, so the page reads normally when
      // JS is disabled, errors, or hasn't run yet. See `.anim-ready .rv`.
      document.documentElement.classList.add('anim-ready')

      ctx = gsap.context(() => {
        gsap.utils.toArray('.rv').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              onComplete: () => settle(el),
            }
          )
        })
      })

      // The display fonts arrive after this effect runs and change the height of
      // every section when they swap in. ScrollTrigger caches start positions on
      // creation, so without this refresh it keeps the ones it measured against
      // the fallback font and sections further down never un-hide.
      document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {})

      // Last resort: anything on screen but still invisible once the intro
      // window has passed gets shown outright. Better a missed animation than
      // a blank section.
      failsafe = setTimeout(() => {
        gsap.utils.toArray('.rv').forEach((el) => {
          const { top, bottom } = el.getBoundingClientRect()
          const onScreen = top < window.innerHeight && bottom > 0
          if (onScreen && Number(getComputedStyle(el).opacity) === 0) settle(el)
        })
      }, 2500)
    })

    return () => {
      stop()
      clearTimeout(failsafe)
      ctx?.revert()
      document.documentElement.classList.remove('anim-ready')
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Education />
        <Moments />
      </main>
      <Contact />
    </>
  )
}
