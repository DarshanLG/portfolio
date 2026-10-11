import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile, heroStats } from '../data.js'
import { Arrow, Down } from './Icons.jsx'
import { reduced, onVisible } from '../App.jsx'

// Placeholder figure shown until profile.heroVideo is set.
function StandIn() {
  return (
    <svg className="standin" viewBox="0 0 220 640" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfcabb" /><stop offset="1" stopColor="#bdb7a6" />
        </linearGradient>
        <linearGradient id="sh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfaf6" /><stop offset="1" stopColor="#e4e0d4" />
        </linearGradient>
        <linearGradient id="tr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b3f5c" /><stop offset=".5" stopColor="#2b2f4a" /><stop offset="1" stopColor="#3b3f5c" />
        </linearGradient>
        <radialGradient id="fl" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#1c1d2c" stopOpacity=".22" /><stop offset="1" stopColor="#1c1d2c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="628" rx="86" ry="10" fill="url(#fl)" />
      {/* hair + head */}
      <path d="M78 66c0-32 18-50 33-50s34 18 34 50c0 10-2 20-6 28H84c-4-8-6-18-6-28z" fill="#2a2a33" />
      <ellipse cx="111" cy="74" rx="26" ry="32" fill="url(#sk)" />
      <path d="M84 60c6-26 48-30 56-2-10-10-40-14-56 2z" fill="#2a2a33" />
      <rect x="100" y="100" width="22" height="22" rx="8" fill="url(#sk)" />
      {/* shirt */}
      <path d="M58 136c6-14 26-20 52-20s46 6 52 20l10 128c1 10-6 16-14 16H62c-8 0-15-6-14-16z" fill="url(#sh)" />
      <path d="M100 118l10 22 10-22" fill="none" stroke="#d6d2c5" strokeWidth="2" />
      {/* arms */}
      <path d="M58 140c-10 6-16 30-18 70l-4 74c0 8 12 10 14 2l10-70z" fill="url(#sh)" />
      <path d="M162 140c10 6 16 30 18 70l4 74c0 8-12 10-14 2l-10-70z" fill="url(#sh)" />
      <ellipse cx="42" cy="296" rx="9" ry="12" fill="url(#sk)" />
      <ellipse cx="178" cy="296" rx="9" ry="12" fill="url(#sk)" />
      {/* trousers */}
      <path d="M64 266h92l10 344c0 6-6 10-12 10h-28c-6 0-10-4-10-10l-6-250-6 250c0 6-4 10-10 10H66c-6 0-12-4-12-10z" fill="url(#tr)" />
      <path d="M110 300v60" stroke="#20233a" strokeWidth="2" />
      {/* shoes */}
      <path d="M58 612h44c4 0 6 6 2 10H56c-4-4-2-10 2-10z" fill="#f6f4ee" />
      <path d="M118 612h44c4 0 6 6 2 10h-48c-4-4-2-10 2-10z" fill="#f6f4ee" />
    </svg>
  )
}

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    if (reduced()) return
    let ctx
    // Deferred until the tab is on screen: these are `from` tweens, so they set
    // the hero to opacity 0 on their first frame. In a background tab that frame
    // never advances and the hero stays blank. See onVisible() in App.jsx.
    const stop = onVisible(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('.ghost', { yPercent: 30, opacity: 0, duration: 1.4 })
          .from('.figure', { y: 60, opacity: 0, duration: 1.2 }, '-=1.1')
          .from('.hero-copy > *', { y: 40, opacity: 0, duration: 1, stagger: 0.08 }, '-=.9')
          .from('.hero-side > *', { y: 24, opacity: 0, duration: .8, stagger: 0.08 }, '-=.8')
        gsap.to('.ghost', {
          xPercent: -8, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }, root)
    })
    return () => { stop(); ctx?.revert() }
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="ghost" aria-hidden="true">{profile.firstName.toUpperCase()}</div>
      <div className="wrap hero-stage">
        <div className="hero-copy">
          <span className="label">{profile.fullName}</span>
          <h1>
            {profile.title[0]}<br />{profile.title[1]}<span className="dot">.</span>
          </h1>
          <p className="tag">{profile.tagline}</p>
        </div>

        <div className="figure">
          {profile.heroVideo ? (
            // A looping autoplay clip is motion like any other, so under
            // prefers-reduced-motion the still frame stands in for it.
            reduced() && profile.heroPoster ? (
              <img src={profile.heroPoster} alt={`${profile.fullName}, ${profile.title.join(' ')}`} />
            ) : (
              <video
                poster={profile.heroPoster || undefined}
                autoPlay muted loop playsInline
                preload="auto"
                disablePictureInPicture
                aria-label={`${profile.firstName} introducing himself`}
              >
                {/* WebM first: it has the alpha channel. Browsers that can't
                    decode VP9 alpha skip it and take the opaque MP4. */}
                {profile.heroVideoAlpha && (
                  <source src={profile.heroVideoAlpha} type="video/webm" />
                )}
                <source src={profile.heroVideo} type="video/mp4" />
              </video>
            )
          ) : (
            <>
              <StandIn />
              <span className="slot">HERO VIDEO GOES HERE</span>
            </>
          )}
        </div>

        <div className="hero-side">
          <div className="hero-actions">
            <a className="btn dark" href="#work">Explore work <Arrow /></a>
            <a className="btn" href="#contact">Let's talk</a>
            <a className="btn plain" href={profile.resume} target="_blank" rel="noreferrer">Résumé <Down /></a>
          </div>
          <div className="stats">
            {heroStats.map((s) => (
              <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
