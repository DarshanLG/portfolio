import { experience } from '../data.js'
import Timeline from './Timeline.jsx'
import RoleDialog from './RoleDialog.jsx'
import { useDialog } from './Dialog.jsx'

export default function Experience() {
  const [open, setOpen, close] = useDialog()

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">Experience</span>
          <h2>Where I've <span className="serif">worked.</span></h2>
          <p>Six roles since 2019, including 4+ years full time. Open one for the full account of what I built there.</p>
        </div>
        <Timeline items={experience} onOpen={setOpen} />
      </div>
      <RoleDialog role={open} onClose={close} />
    </section>
  )
}
