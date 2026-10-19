import { projects } from '../data.js'
import Cover from './Covers.jsx'
import ProjectDialog from './ProjectDialog.jsx'
import { useDialog } from './Dialog.jsx'

// Project cards, in the same mould as the certification tiles. The whole card
// opens a dialog with the full write-up.
//
// The trigger is a real button inside the heading, stretched over the card by
// CSS, rather than a click handler on the card itself: that keeps the <h3> a
// heading for anyone scanning the page, and gives keyboard and screen-reader
// users the role for free instead of a div pretending to be a button.
export default function Work() {
  const [open, setOpen, close] = useDialog()

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">Selected work</span>
          <h2>Things I've <span className="serif">built.</span></h2>
          <p>Open one for how it was built and what it does.</p>
        </div>

        <div className="work-grid">
          {projects.filter((p) => !p.hidden).map((p) => (
            <article className="work-card rv" key={p.id}>
              <div className="work-cover" aria-hidden="true"><Cover kind={p.cover} /></div>
              <div className="work-meta">
                <span className="label">{p.kicker}</span>
                <h3>
                  <button type="button" className="work-open" onClick={() => setOpen(p)}>
                    {p.title}
                  </button>
                </h3>
                <p>{p.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectDialog project={open} onClose={close} />
    </section>
  )
}
