import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Journey from './components/Journey.jsx'
import Moments from './components/Moments.jsx'
import Contact from './components/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
          if (onScreen && Number(getComputedStyle(el).opacity) === 0) {
            gsap.set(el, { y: 0, opacity: 1 })
          }
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
        <Journey />
        <Moments />
      </main>
      <Contact />
    </>
  )
}
