import { Arrow } from './Icons.jsx'

// Big years on the left, a rail with dots, cards on the right. Shared by the
// Experience and Education sections so the two read as one continuous story
// told in two parts.
//
// When `onOpen` is given the whole card becomes clickable. The trigger is a
// real button inside the heading, stretched over the card by CSS, rather than
// a click handler on the card itself: that keeps the <h3> a heading for anyone
// scanning the page, and gives keyboard and screen-reader users the role for
// free instead of a div pretending to be a button.

// Something worth opening a dialog for.
const hasMore = (j) => Boolean(j.details?.length || j.courses?.length || j.transcript)

export default function Timeline({ items, edu = false, onOpen }) {
  return (
    <div className="tl">
      {items.map((j) => {
        const opens = Boolean(onOpen) && hasMore(j)
        return (
          <div key={j.role + j.from} className={`tl-item rv ${edu ? 'edu' : ''}`}>
          <div className="tl-years"><b>{j.from}</b><span>to {j.to}</span></div>
          <div className="tl-rail"><i /></div>
          <div className={`tl-card ${opens ? 'opens' : ''}`}>
            <span className="kind">{j.kind}</span>
            <h3>
              {opens ? (
                <button type="button" className="tl-open" onClick={() => onOpen(j)}>
                  {j.role}
                </button>
              ) : j.role}
            </h3>
            <div className="org">{j.org} <em>· {j.where}</em></div>
            {j.text && <p>{j.text}</p>}
            {j.tags.length > 0 && <div className="tags">{j.tags.map((t) => <span key={t}>{t}</span>)}</div>}
            {opens && (
              <span className="tl-more" aria-hidden="true">Read more <Arrow /></span>
            )}
          </div>
        </div>
        )
      })}
    </div>
  )
}
