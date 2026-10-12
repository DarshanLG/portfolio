import { certifications } from '../data.js'
import { ArrowUR, Down } from './Icons.jsx'

// Initials of the issuer, used as the card's mark when no logo file is set.
// 'Google Cloud' -> GC, 'Microsoft' -> M.
const monogram = (org) =>
  org.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

// Credential cards, in the same mould as the Achievements tiles. Every field
// below `name` / `org` is optional -- the card only draws the parts that have
// something in them, so an entry with no links is still a valid, tidy card.
export default function Certifications() {
  return (
    <div className="learn">
      <div className="rv learn-head">
        <h3>Always <span className="serif">learning.</span></h3>
        <p>Four cloud certifications across Google Cloud and Microsoft Azure.</p>
      </div>

      <div className="certs">
        {certifications.map((c) => {
          const acts = Boolean(c.verify || c.pdf)
          return (
            <article className="cert-card rv" key={c.name}>
              <div className="cert-top">
                <span className="cert-mark" aria-hidden="true">
                  {c.logo ? <img src={c.logo} alt="" /> : monogram(c.org)}
                </span>
                <span className="label">{c.issued || c.year}</span>
              </div>

              <div className="cert-meta">
                <h4>{c.name}</h4>
                <small>{c.org}</small>
                {c.expires && <span className="cert-sub">Expires {c.expires}</span>}
                {c.credentialId && <span className="cert-sub">ID {c.credentialId}</span>}
              </div>

              {acts && (
                <div className="cert-acts">
                  {c.verify && (
                    <a className="btn" href={c.verify} target="_blank" rel="noreferrer">
                      Verify <ArrowUR />
                    </a>
                  )}
                  {c.pdf && (
                    <a className="btn plain" href={c.pdf} download>
                      Certificate <Down />
                    </a>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
