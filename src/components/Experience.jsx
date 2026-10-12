import { useCallback, useState } from 'react'
import { experience } from '../data.js'
import Timeline from './Timeline.jsx'
import RoleDialog from './RoleDialog.jsx'

export default function Experience() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head rv">
          <span className="label">04 — Experience</span>
          <h2>Where I've <span className="serif">worked.</span></h2>
          <p>Four roles over five years. Open one for the full account of what I built there.</p>
        </div>
        <Timeline items={experience} onOpen={setOpen} />
      </div>
      <RoleDialog role={open} onClose={close} />
    </section>
  )
}
