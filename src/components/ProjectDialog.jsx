import Dialog from './Dialog.jsx'
import Cover from './Covers.jsx'
import { ArrowUR } from './Icons.jsx'
import { profile } from '../data.js'

// Everything the accordion used to show when a project was expanded: the
// cover graphic, the blurb, the points and the tags, plus the repo link.
export default function ProjectDialog({ project, onClose }) {
  return (
    <Dialog open={project} onClose={onClose} titleId="dlg-project">
      {project && (
        <>
          <div className="dlg-head">
            <span className="label">{project.kicker}</span>
            <h3 id="dlg-project">{project.title}</h3>
          </div>

          <div className="dlg-body">
            <div className="dlg-cover"><Cover kind={project.cover} /></div>

            <p className="dlg-lead">{project.blurb}</p>

            {project.points?.length > 0 && (
              <ul className="dlg-points">
                {project.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            )}

            {project.tags?.length > 0 && (
              <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
            )}

            <div className="dlg-group">
              <a className="btn dark" href={project.link || profile.github} target="_blank" rel="noreferrer">
                View on GitHub <ArrowUR />
              </a>
            </div>
          </div>
        </>
      )}
    </Dialog>
  )
}
