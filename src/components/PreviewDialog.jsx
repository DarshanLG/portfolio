import Dialog from './Dialog.jsx'
import { Down } from './Icons.jsx'

// A document shown before it is handed over: the page as an image, with a
// sticky bar on top holding its name and the download. The résumé and every
// certificate open in this.
//
// `doc` is null while closed, otherwise:
//   { label, title, image, alt, width?, height?, file, filename }
// The image is a rendered copy (browsers can't show a DOCX, and PDFs don't
// render inline on Android or in LinkedIn's browser); `file` is what downloads.
export default function PreviewDialog({ doc, onClose }) {
  return (
    <Dialog open={doc} onClose={onClose} titleId="dlg-preview" className="dlg-preview">
      {doc && (
        <>
          <div className="pv-bar">
            <div className="pv-title">
              <span className="label">{doc.label}</span>
              <h3 id="dlg-preview">{doc.title}</h3>
            </div>
            <div className="pv-acts">
              <a className="btn dark" href={doc.file} download={doc.filename}>Download <Down /></a>
            </div>
          </div>
          <div className="pv-page">
            <img src={doc.image} alt={doc.alt} width={doc.width} height={doc.height} />
          </div>
        </>
      )}
    </Dialog>
  )
}
