import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// The open/closed state every dialog owner needs: the item being shown (null
// while closed), a setter to open one, and a stable close for onClose.
export function useDialog() {
  const [item, setItem] = useState(null)
  const close = useCallback(() => setItem(null), [])
  return [item, setItem, close]
}

// The shell every dialog on the site shares. While it is open it takes over the
// page the way a dialog should: focus moves into it and is held there, Escape
// and the backdrop close it, the page behind cannot scroll, and focus returns
// to whatever opened it.
//
// It grows out of the element that opened it and shrinks back into it on the
// way out, so the path in and the path out are the same. Both directions are
// CSS transitions rather than keyframes, which means a dialog closed and
// reopened mid-flight turns around from wherever it is on screen instead of
// jumping. Input is never held up by the exit: the page is unlocked and the
// scrim stops catching clicks the moment it starts to close.
//
// Callers supply the contents and the id of the element that names it.
export default function Dialog({ open, onClose, titleId, className = '', children }) {
  const back = useRef(null)
  const panel = useRef(null)
  const first = useRef(null)
  const [mounted, setMounted] = useState(Boolean(open))
  const [shown, setShown] = useState(false)

  // Keep the last contents on screen while the dialog animates out; the caller
  // has already cleared whatever they were rendered from.
  const contents = useRef(children)
  if (open) contents.current = children

  if (open && !mounted) setMounted(true)

  // Where it should grow from: the center of whatever had focus or was pressed
  // when it opened, in the panel's own coordinates. Measured with offsetLeft /
  // offsetTop, which ignore the scale it starts at.
  useLayoutEffect(() => {
    if (!open || !mounted) return
    const opener = document.activeElement
    const p = panel.current
    if (opener instanceof HTMLElement && opener !== document.body) {
      const r = opener.getBoundingClientRect()
      p.style.setProperty('--ox', `${(r.left + r.width / 2 - p.offsetLeft).toFixed(1)}px`)
      p.style.setProperty('--oy', `${(r.top + r.height / 2 - p.offsetTop).toFixed(1)}px`)
    } else {
      // Nothing to grow from (Safari doesn't focus buttons on click): center.
      p.style.removeProperty('--ox')
      p.style.removeProperty('--oy')
    }
    // Make the browser resolve the closed pose now, so flipping to open in the
    // same frame transitions from it. (Waiting on requestAnimationFrame instead
    // would stall in a throttled tab and leave the dialog invisible.)
    void getComputedStyle(back.current).opacity
    setShown(true)
  }, [open, mounted])

  // Closing: start the exit at once, unmount once the scrim has faded. The
  // timer is a backstop for a transition that never reports back (a hidden
  // tab, or a property the browser decided not to animate).
  useEffect(() => {
    if (open || !mounted) return
    setShown(false)
    const t = setTimeout(() => setMounted(false), 450)
    return () => clearTimeout(t)
  }, [open, mounted])

  const onTransitionEnd = (e) => {
    if (e.target === back.current && e.propertyName === 'opacity' && !open) setMounted(false)
  }

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    first.current?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      // Hold Tab inside the panel so the page behind stays unreachable.
      const f = panel.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
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
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [open, onClose])

  if (!mounted) return null

  return (
    <div
      className={`dlg-back${shown && open ? ' is-open' : ''}${open ? '' : ' is-closing'}`}
      ref={back}
      onClick={onClose}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        className={`dlg ${className}`.trim()}
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
        {contents.current}
      </div>
    </div>
  )
}
