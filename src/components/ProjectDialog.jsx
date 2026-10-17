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

            {project.media && (
              <figure className="dlg-media">
                <img
                  src={project.media.src} alt={project.media.alt}
                  width={project.media.width} height={project.media.height} loading="lazy"
                />
                {project.media.caption && <figcaption>{project.media.caption}</figcaption>}
              </figure>
            )}

            <p className="dlg-lead">{project.about || project.blurb}</p>

            {project.points?.length > 0 && (
              <ul className="dlg-points">
                {project.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            )}

            {project.tags?.length > 0 && (
              <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
            )}

            <div className="dlg-actions">
              {project.demo && (
                <a className="btn dark" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Try the live demo <ArrowUR />
                </a>
              )}
              <a className={project.demo ? 'btn' : 'btn dark'} href={project.link || profile.github} target="_blank" rel="noopener noreferrer">
                View on GitHub <ArrowUR />
              </a>
            </div>
          </div>
        </>
      )}
    </Dialog>
  )
}
