import { certifications, profile } from '../data.js'
import { ArrowUR } from './Icons.jsx'
import PreviewDialog from './PreviewDialog.jsx'
import { useDialog } from './Dialog.jsx'
import { isPlainClick } from '../App.jsx'

// Initials of the issuer, used as the card's mark when no logo file is set.
// 'Google Cloud' -> GC, 'Microsoft' -> M.
const monogram = (org) =>
  org.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

// Keeps an exam code like "(AZ-900)" on one line, so a narrow card never
// splits it at the hyphen.
const nowrapCodes = (name) =>
  name.split(/(\([^)]*\))/).map((part, i) =>
    i % 2 ? <span className="nowrap" key={i}>{part}</span> : part)

// What the preview dialog needs for one certificate. The download keeps the
// issuer's PDF, renamed so it is recognizable in someone's Downloads folder.
const asDoc = (c) => ({
  label: `${c.org} · Certificate`,
  title: c.name,
  image: c.preview,
  alt: `${c.name} certificate for ${profile.fullName}`,
  width: c.size?.[0], height: c.size?.[1],
  file: c.pdf,
  filename: `Darshan_Goneppanavar_${c.pdf.split('/').pop()}`,
})

// Credential cards, in the same mould as the Highlights tiles. Every field
// below `name` / `org` is optional -- the card only draws the parts that have
// something in them, so an entry with no links is still a valid, tidy card.
export default function Certifications() {
  const [open, setOpen, close] = useDialog()

  // A plain click shows the certificate first; a modified click (new tab,
  // save link) still goes straight to the PDF.
  const show = (c) => (e) => {
    if (!c.preview || !isPlainClick(e)) return
    e.preventDefault()
    setOpen(asDoc(c))
  }

  return (
    <div className="learn">
      <div className="rv learn-head">
        <h3>Always <span className="serif">learning.</span></h3>
        <p>Cloud certifications across Google Cloud and Microsoft Azure.</p>
      </div>

      <div className="certs">
        {certifications.map((c) => {
          const acts = Boolean(c.verify || c.pdf)
          return (
            <article className="cert-card rv" key={c.name}>
              <div className="cert-top">
                <span className={`cert-mark${c.logo ? ' badge' : ''}`} aria-hidden="true">
                  {c.logo ? <img src={c.logo} alt="" /> : monogram(c.org)}
                </span>
                <span className="label">{c.issued || c.year}</span>
              </div>

              <div className="cert-meta">
                <h4>{nowrapCodes(c.name)}</h4>
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
                    <a className="btn plain" href={c.pdf} target="_blank" rel="noreferrer" onClick={show(c)}>
                      Certificate <ArrowUR />
                    </a>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>

      <PreviewDialog doc={open} onClose={close} />
    </div>
  )
}
