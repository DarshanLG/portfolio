import { journey, certifications } from '../data.js'

export default function Journey() {
  return (
    <section className="section" id="journey">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">04 — Journey</span>
          <h2>Education &amp; <span className="serif">experience.</span></h2>
        </div>

        <div className="tl">
          {journey.map((j) => (
            <div key={j.role + j.from} className={`tl-item rv ${j.kind === 'Education' ? 'edu' : ''}`}>
              <div className="tl-years"><b>{j.from}</b><span>to {j.to}</span></div>
              <div className="tl-rail"><i /></div>
              <div className="tl-card">
                <span className="kind">{j.kind}</span>
                <h3>{j.role}</h3>
                <div className="org">{j.org} <em>· {j.where}</em></div>
                {j.text && <p>{j.text}</p>}
                {j.tags.length > 0 && <div className="tags">{j.tags.map((t) => <span key={t}>{t}</span>)}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="learn">
          <div className="rv">
            <h3>Always <span className="serif">learning.</span></h3>
            <p>Four cloud certifications across Google Cloud and Microsoft Azure.</p>
          </div>
          <div className="certs rv">
            {certifications.map((c, i) => (
              <div className="cert" key={c.name}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div><b>{c.name}</b><small>{c.org}</small></div>
                <span className="yr">{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
