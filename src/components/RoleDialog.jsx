import Dialog from './Dialog.jsx'
import { Down } from './Icons.jsx'

// The detail view behind a role on the Experience timeline or a degree on the
// Education one. It renders whichever of the optional parts the entry has:
// resume bullets, coursework, a transcript to download, tech tags.
export default function RoleDialog({ role, onClose }) {
  return (
    <Dialog open={role} onClose={onClose} titleId="dlg-role">
      {role && (
        <>
          <div className="dlg-head">
            <span className="label">{role.period || `${role.from} — ${role.to}`}</span>
            <h3 id="dlg-role">{role.role}</h3>
            <div className="org">{role.org} <em>· {role.where}</em></div>
          </div>

          <div className="dlg-body">
            {role.details?.length > 0 && (
              <ul className="dlg-points">
                {role.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            )}

            {role.courses?.length > 0 && (
              <div className="dlg-group">
                <span className="label">Coursework</span>
                <div className="tags">{role.courses.map((c) => <span key={c}>{c}</span>)}</div>
              </div>
            )}

            {role.tags?.length > 0 && (
              <div className="tags">{role.tags.map((t) => <span key={t}>{t}</span>)}</div>
            )}

            {/* Only shown once a file is actually set, so there is never a link
                to a transcript that is not there. */}
            {role.transcript && (
              <div className="dlg-group">
                <a className="btn dark" href={role.transcript} download>
                  Download transcript <Down />
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </Dialog>
  )
}
