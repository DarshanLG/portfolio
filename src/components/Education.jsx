import { education } from '../data.js'
import Timeline from './Timeline.jsx'
import RoleDialog from './RoleDialog.jsx'
import { useDialog } from './Dialog.jsx'
import Certifications from './Certifications.jsx'

export default function Education() {
  const [open, setOpen, close] = useDialog()

  return (
    <section className="section" id="education">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">Education</span>
          <h2>Where I <span className="serif">studied.</span></h2>
          <p>Open a degree for the coursework behind it.</p>
        </div>
        <Timeline items={education} edu onOpen={setOpen} />

        <Certifications />
      </div>
      <RoleDialog role={open} onClose={close} />
    </section>
  )
}
