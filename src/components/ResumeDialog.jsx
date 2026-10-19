import { useEffect } from 'react'
import PreviewDialog from './PreviewDialog.jsx'
import { useDialog } from './Dialog.jsx'
import { profile } from '../data.js'

// Every Résumé link opens this instead of the file itself: a look at the page
// first, with the download up top. Links fire `open-resume` (see resumeProps in
// App.jsx), so this is mounted once and none of them need to know about it.
const resume = {
  label: 'Résumé',
  title: profile.shortName,
  image: profile.resumePreview,
  alt: `Résumé of ${profile.fullName}`,
  width: 1700, height: 2200,
  file: profile.resume,
  filename: profile.resumeFile,
}

export default function ResumeDialog() {
  const [doc, setDoc, close] = useDialog()

  useEffect(() => {
    const show = () => setDoc(resume)
    window.addEventListener('open-resume', show)
    return () => window.removeEventListener('open-resume', show)
  }, [setDoc])

  return <PreviewDialog doc={doc} onClose={close} />
}
