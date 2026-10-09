import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const groups = [
  { h: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'Kotlin'], used: 'Used across Midgard builds' },
  { h: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'], used: 'Used in MiraiSync, FlowLink' },
  { h: 'Backend / Data', items: ['Flask', 'FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL', 'Supabase'], used: 'Used in ResuMatch, SolarGrid AI' },
  { h: 'Realtime', items: ['Socket.IO', 'WebSocket', 'WebRTC'], used: 'Used in MiraiSync, FlowLink' },
  { h: 'AI', items: ['SBERT', 'scikit-learn', 'Llama 3.2', 'LLM APIs', 'NLP'], used: 'Used in ResuMatch, AgentX, SolarGrid AI' },
  { h: 'Scientific / Geo', items: ['pandapower', 'CesiumJS', 'MapLibre', 'NetCDF'], used: 'Used in SolarGrid AI' },
  { h: 'Mobile', items: ['Flutter', 'Kotlin'], used: 'Used in FlowLink Android' },
  { h: 'Security & Tools', items: ['NIST 800-88', 'Git', 'Vercel', 'Render'], used: 'Used in hardening builds, shipping' },
]

const WAVE_WORDS = ['SolarGrid AI', 'MiraiSync', 'ResuMatch', 'FlowLink', 'AI Agents', 'Power-flow', 'Realtime Sync', 'GitHub', 'Vercel', 'Render', 'Python', 'React']

/* ── Rainbow thread canvas (how his works: layered sine strokes + glow) ── */
function ThreadCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let running = true

    const threads = [
      { color: '#c8ff2e', amp: 26, freq: 0.006, speed: 0.45, width: 2.2, glow: 14 },
      { color: '#ff9e2c', amp: 30, freq: 0.005, speed: -0.35, width: 2, glow: 12 },
      { color: '#4dd8ff', amp: 22, freq: 0.008, speed: 0.55, width: 2, glow: 12 },
      { color: '#ff5fa2', amp: 32, freq: 0.004, speed: 0.3, width: 1.8, glow: 12 },
      { color: '#ffffff', amp: 18, freq: 0.01, speed: -0.6, width: 1.4, glow: 8 },
      { color: '#9d7bff', amp: 28, freq: 0.0055, speed: 0.4, width: 1.6, glow: 10 },
    ]

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(r.width, 300)
      canvas.height = 120
    }
    resize()
    window.addEventListener('resize', resize)

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting && !document.hidden
      if (running) draw()
      else cancelAnimationFrame(raf)
    })
    io.observe(canvas)
    const onVis = () => {
      running = !document.hidden
      if (running) draw()
    }
    document.addEventListener('visibilitychange', onVis)

    let t = 0
    const draw = () => {
      if (!running) return
      t += 0.016
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      threads.forEach((th, li) => {
        ctx.beginPath()
        for (let x = -20; x <= W + 20; x += 6) {
          const y =
            H / 2 +
            Math.sin(x * th.freq + t * th.speed + li * 1.3) * th.amp +
            Math.sin(x * th.freq * 2.7 + t * th.speed * 1.6) * th.amp * 0.35
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = th.color
        ctx.lineWidth = th.width
        ctx.shadowColor = th.color
        ctx.shadowBlur = th.glow
        ctx.globalAlpha = 0.85
        ctx.stroke()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="thread-canvas" aria-hidden />
}

const proof = [
  { v: 7, label: 'Working R&D builds' },
  { v: 6, label: 'Live demos' },
  { v: 34, label: 'Tools & frameworks' },
  { v: 5, label: 'Story milestones' },
]

function ProofNum({ v }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / 1100, 1)
      setN(Math.round(v * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, v])
  return <b ref={ref}>{n}</b>
}

export default function SkillMatrix() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" ref={ref} style={{ padding: '6rem 0 4rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <p className="kicker">Capabilities</p>
        <motion.h2
          className="h-giant"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          Technology, <span className="it">with receipts.</span>
        </motion.h2>
      </div>

      <motion.div
        className="vable-grid"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        {groups.map((g, gi) => (
          <motion.article
            key={g.h}
            className="vable-cell"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 + gi * 0.07, duration: 0.5 }}
          >
            <h3>{g.h}</h3>
            <p className="vable-items">{g.items.join('   ')}</p>
            <p className="vable-used">{g.used}</p>
          </motion.article>
        ))}
      </motion.div>

      <div className="thread-strip">
        <ThreadCanvas />
        <div className="thread-words" aria-hidden>
          <div className="thread-track">
            {[...WAVE_WORDS, ...WAVE_WORDS].map((w, i) => (
              <span key={i} className="thread-word"><i>✦</i>{w}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="proof-grid">
        <motion.h3
          className="h-giant"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Proof in<br /><span className="it">numbers</span>
        </motion.h3>
        <div className="proof-card">
          {proof.map((p, i) => (
            <motion.div
              key={p.label}
              className="proof-cell"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
            >
              <ProofNum v={p.v} />
              <span>{p.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
