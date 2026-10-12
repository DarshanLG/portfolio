import { useEffect, useRef } from 'react'

// The shell every dialog on the site shares. Rendered only while something is
// open, so there is nothing in the document to trip over the rest of the time.
// While it is open it takes over the page the way a dialog should: focus moves
// into it and is held there, Escape and the backdrop close it, the page behind
// cannot scroll, and focus returns to whatever opened it.
//
// Callers supply the contents and the id of the element that names it.
export default function Dialog({ open, onClose, titleId, children }) {
  const panel = useRef(null)
  const first = useRef(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    first.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      // Hold Tab inside the panel so the page behind stays unreachable.
      const f = panel.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!f?.length) return
      const a = f[0], z = f[f.length - 1]
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', onKey)

    // Lock the page, padding for the scrollbar it removes so nothing shifts.
    const body = document.body
    const bar = window.innerWidth - document.documentElement.clientWidth
    const wasOverflow = body.style.overflow
    const wasPad = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (bar > 0) body.style.paddingRight = `${bar}px`

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.overflow = wasOverflow
      body.style.paddingRight = wasPad
      // Put the reader back where they were.
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dlg-back" onClick={onClose}>
      <div
        className="dlg"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panel}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dlg-x" onClick={onClose} ref={first} aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}
