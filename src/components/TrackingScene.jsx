import { useEffect, useRef, useState } from 'react'
import { reduced } from '../App.jsx'

// The Skills backdrop: a 3D-style render of Darshan at a desk in a park,
// whose head turns to follow the cursor.
//
// There are nine renders of the scene, one per head pose (3x3: up / level /
// down by left / centre / right). The neutral pose is the background. The
// other eight only differ around the head, so docs/scene-poses.py cuts that
// region out of each into one atlas (scene-heads.webp) plus a feathered mask
// (scene-mask.png). The shader draws the background and pastes the current
// head over it through the mask, cross-fading for a moment when the pose
// changes. Nothing outside the head ever changes, so the hoodie, laptop and
// grass never shimmer between poses.

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * .5 + .5, .5 - aPos.y * .5);
  gl_Position = vec4(aPos, 0., 1.);
}`

const FRAG = `
precision highp float;
uniform sampler2D uColor;
uniform sampler2D uHeads;
uniform sampler2D uMask;
uniform vec4 uCover;  // screen uv -> image uv: xy scale, zw offset
uniform vec4 uBox;    // head box in image uv: x0 y0 x1 y1
uniform vec2 uA;      // pose being faded out (col, row)
uniform vec2 uB;      // pose being faded in
uniform float uMix;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * uCover.xy + uCover.zw;
  vec3 c = texture2D(uColor, uv).rgb;
  vec2 q = (uv - uBox.xy) / (uBox.zw - uBox.xy);
  if (q.x > 0. && q.y > 0. && q.x < 1. && q.y < 1.) {
    float m = texture2D(uMask, q).r;
    vec3 a = texture2D(uHeads, (q + uA) / 3.).rgb;
    vec3 b = texture2D(uHeads, (q + uB) / 3.).rgb;
    c = mix(c, mix(a, b, uMix), m);
  }
  gl_FragColor = vec4(c, 1.);
}`

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Same maths as CSS object-fit: cover + object-position, so the <img>
// fallback and the canvas crop identically.
function cover(cw, ch, iw, ih, [px, py]) {
  const s = Math.max(cw / iw, ch / ih)
  const fx = cw / (iw * s), fy = ch / (ih * s)
  return [fx, fy, (1 - fx) * px, (1 - fy) * py]
}

function setup(canvas, images) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
  if (!gl) return null
  if (images.some((i) => Math.max(i.width, i.height) > gl.getParameter(gl.MAX_TEXTURE_SIZE))) return null
  const sh = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
    return s
  }
  const prog = gl.createProgram()
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'aPos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const u = (n) => gl.getUniformLocation(prog, n)
  ;['uColor', 'uHeads', 'uMask'].forEach((name, unit) => {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
    // Non-power-of-two textures in WebGL 1: clamp, no mipmaps.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[unit])
    gl.uniform1i(u(name), unit)
  })
  return { gl, u }
}

// Screen point -> look direction in [-1, 1]. tanh keeps it lively near the
// face and saturates gently towards the edges of the screen.
function lookFrom(eye, x, y) {
  const sx = Math.max(window.innerWidth * 0.32, 260)
  const sy = Math.max(window.innerHeight * 0.36, 260)
  return [Math.tanh(((x - eye[0]) / sx) * 1.5), Math.tanh(((y - eye[1]) / sy) * 1.5)]
}

// Look value -> grid index 0..2, with hysteresis so the head doesn't flick
// back and forth when the cursor rests on a boundary.
function step(prev, v, enter, leave) {
  if (prev === 1) return v < -enter ? 0 : v > enter ? 2 : 1
  if (prev === 0) return v > -leave ? (v > enter ? 2 : 1) : 0
  return v < leave ? (v < -enter ? 0 : 1) : 2
}

const FADE = 100 // ms, short enough that the double image never registers

export default function TrackingScene({ scene, alt, focusEl }) {
  const canvas = useRef(null)
  const focusRef = useRef(focusEl)
  const kickRef = useRef(null)
  const [ready, setReady] = useState(false)
  focusRef.current = focusEl
  // Start turning on the same frame the skill is pointed at, rather than
  // whenever a polling timer next happens to come round.
  useEffect(() => { kickRef.current?.() }, [focusEl])
  const pos = scene.position
  const objPos = `${pos[0] * 100}% ${pos[1] * 100}%`

  useEffect(() => {
    let alive = true
    let raf = 0
    let ro, io
    const cleanup = []
    const still = reduced()
    const c = canvas.current
    // Phones get the smaller background; the full one only where it will show.
    const big = c.clientWidth * Math.min(window.devicePixelRatio || 1, 2) > 1400

    Promise.all([big ? scene.src : scene.srcSm, scene.heads, scene.mask].map(loadImage)).then((imgs) => {
      if (!alive) return
      let r
      try { r = setup(c, imgs) } catch (e) { console.warn('[scene]', e) }
      if (!r) return // the <img> stays as the fallback
      const { gl, u } = r
      gl.uniform4f(u('uBox'), ...scene.box)
      const uA = u('uA'), uB = u('uB'), uMix = u('uMix'), uCover = u('uCover')

      let cov = [1, 1, 0, 0]
      // pose state: a = shown (or fading out), b = fading in
      let a = [1, 1], b = [1, 1], fadeStart = -1
      const draw = (t) => {
        const k = fadeStart < 0 ? 1 : Math.min((t - fadeStart) / FADE, 1)
        if (k >= 1 && fadeStart >= 0) { a = b; fadeStart = -1 }
        gl.uniform2f(uA, a[0], a[1])
        gl.uniform2f(uB, b[0], b[1])
        gl.uniform1f(uMix, fadeStart < 0 ? 0 : k * k * (3 - 2 * k))
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      const size = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        c.width = Math.round(c.clientWidth * dpr)
        c.height = Math.round(c.clientHeight * dpr)
        gl.viewport(0, 0, c.width, c.height)
        cov = cover(c.clientWidth, c.clientHeight, scene.size[0], scene.size[1], pos)
        gl.uniform4f(uCover, ...cov)
        draw(performance.now())
      }
      // Where his eyes are on screen right now.
      const eyes = () => {
        const bx = c.getBoundingClientRect()
        return [
          bx.left + ((scene.face[0] - cov[2]) / cov[0]) * bx.width,
          bx.top + ((scene.face[1] - cov[3]) / cov[1]) * bx.height,
        ]
      }

      const look = [0, 0], vel = [0, 0], tgt = [0, 0]
      let col = 1, row = 1
      let last = 0, visible = true, pointer = null, lastMove = -1e9
      // Flips the first time a skill is pointed at, and stays on.
      let engaged = false
      const IDLE = 4000

      const tick = (t) => {
        raf = 0
        if (!alive || !visible) return
        const dt = Math.min((t - (last || t)) / 1000, 1 / 30)
        last = t
        // He faces straight ahead until the first skill is pointed at. After
        // that he behaves as he always did -- looking at the focused skill,
        // otherwise following the cursor, otherwise glancing around. That
        // wider range is what reaches the up and down poses in the atlas; the
        // skill cards all sit at about his eye level, so hovering them alone
        // only ever exercises the middle row.
        const f = focusRef.current
        if (f) engaged = true
        let idle = false
        if (f && f.isConnected) {
          const fb = f.getBoundingClientRect()
          ;[tgt[0], tgt[1]] = lookFrom(eyes(), fb.left + fb.width / 2, fb.top + fb.height / 2)
        } else if (!engaged) {
          tgt[0] = 0
          tgt[1] = 0
        } else if (pointer && t - lastMove < IDLE) {
          ;[tgt[0], tgt[1]] = lookFrom(eyes(), pointer[0], pointer[1])
        } else {
          // Nobody pointing (touch screens, or the mouse is resting): glance
          // around now and then, and come back to the viewer in between.
          idle = true
          const s = t / 1000
          const away = Math.sin(s * 0.55) > 0.15
          tgt[0] = away ? Math.sin(s * 0.31) * 0.9 : 0
          tgt[1] = away ? Math.sin(s * 0.19 + 2) * 0.7 : 0
        }
        // A light spring on the look itself, so a fast flick across the
        // screen passes through the in-between pose instead of skipping it.
        const w = 14
        let moving = false
        for (let i = 0; i < 2; i++) {
          vel[i] += (w * w * (tgt[i] - look[i]) - 2 * w * vel[i]) * dt
          look[i] += vel[i] * dt
          if (Math.abs(tgt[i] - look[i]) > 1e-3 || Math.abs(vel[i]) > 1e-3) moving = true
        }
        col = step(col, look[0], 0.34, 0.24)
        row = step(row, look[1], 0.4, 0.28)
        if (col !== b[0] || row !== b[1]) {
          // Start a new fade from whatever is on screen now.
          if (fadeStart >= 0) a = b
          b = [col, row]
          fadeStart = t
        }
        draw(t)
        if (moving || idle || f || fadeStart >= 0) raf = requestAnimationFrame(tick)
      }
      const kick = () => { if (!raf && visible && alive) { last = 0; raf = requestAnimationFrame(tick) } }

      size()
      setReady(true)
      ro = new ResizeObserver(size)
      ro.observe(c)
      if (still) return

      kickRef.current = kick
      cleanup.push(() => { kickRef.current = null })
      // Wakes the loop when the mouse has rested long enough to go idle.
      let restTimer = 0
      cleanup.push(() => clearTimeout(restTimer))
      const onMove = (e) => {
        if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
        pointer = [e.clientX, e.clientY]
        lastMove = performance.now()
        kick()
        clearTimeout(restTimer)
        restTimer = setTimeout(kick, IDLE + 16)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      cleanup.push(() => window.removeEventListener('pointermove', onMove))
      io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick() })
      io.observe(c)
      kick()
    }).catch(() => {})

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro?.disconnect()
      io?.disconnect()
      cleanup.forEach((f) => f())
    }
  }, [scene])

  return (
    <div className={`scene-media ${ready ? 'gl' : ''}`}>
      <img src={scene.srcSm} srcSet={`${scene.srcSm} 1280w, ${scene.src} ${scene.size[0]}w`} sizes="100vw"
        alt={alt} style={{ objectPosition: objPos }} draggable="false" />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  )
}
