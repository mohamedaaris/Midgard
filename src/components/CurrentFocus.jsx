import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const FLOW = ['Surface variables', 'Input quality checks', 'Spatial CNN', 'Depth-resolved field', 'D26 · TCHP', 'Research exports']

const GALLERY = [
  { src: '/assets/OceanEmbed.jpeg', tag: '3D field', caption: 'Subsurface temperature field' },
  { src: '/assets/OceanEmbed%202.jpeg', tag: 'Depth view', caption: 'Depth-resolved view' },
  { src: '/assets/OceanEmbed%203.jpeg', tag: 'Anomaly', caption: 'Thermal anomaly analysis' },
]

/* ── About-style scroll-lit words ── */
function Lit({ text, accents = {}, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <LitW key={i} progress={scrollYProgress} n={words.length} i={i} accent={accents[w]}>{w}</LitW>
      ))}
    </p>
  )
}

function LitW({ children, progress, n, i, accent }) {
  const opacity = useTransform(progress, [i / n, Math.min((i + 1.2) / n, 1)], [0.12, 1])
  return (
    <motion.span style={{ opacity, color: accent || '#f4f4f5' }}>
      {children}{' '}
    </motion.span>
  )
}

function FadeCol({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [24, 0])
  return <motion.div style={{ opacity, y }}>{children}</motion.div>
}

function LitBlock() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  return (
    <div ref={ref} className="focus-lit">
      <Lit
        className="focus-quote"
        text="A spatial CNN turns surface observations into an interactive ocean field — maps, models and heat indicators researchers can actually explore."
        accents={{ field: '#c8ff2e', 'heat': '#c8ff2e' }}
      />
      <FadeCol progress={scrollYProgress} range={[0, 0.45]}>
        <p className="focus-body">
          2D maps, 3D visualizations, vertical temperature profiles and subsurface anomaly analysis.
          Derived indicators such as <b>D26</b> and <b>Tropical Cyclone Heat Potential (TCHP)</b> help
          analysts examine subsurface heat along historical or hypothetical cyclone paths.
        </p>
      </FadeCol>
      <FadeCol progress={scrollYProgress} range={[0.4, 0.9]}>
        <p className="focus-body">
          Observational validation, input-quality checks, model qualification and transparent data
          provenance keep outputs scientifically interpretable — with historical replay, scenario
          exploration and reusable research exports.
        </p>
        <p className="focus-honest">
          Honest scope: supports ocean research and cyclone-related thermal assessment — it does
          not claim to predict cyclone tracks or intensity.
        </p>
      </FadeCol>
    </div>
  )
}

/* ── Work-style swirling fan deck for the 3 field views ── */
function OceanFan({ onOpen }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [compact, setCompact] = useState(false)
  const n = GALLERY.length

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)')
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % n), 3600)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <div className="ocean-fan">
      <div
        className="ocean-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {GALLERY.map((g, i) => {
          const rel = (i - active + n) % n
          const dim = rel !== 0
          return (
            <motion.div
              key={g.src}
              className="fan-card"
              onClick={() => (rel === 0 ? onOpen(i) : setActive(i))}
              animate={{
                x: rel * (compact ? 36 : 88),
                y: rel === 0 ? 0 : rel * (compact ? 14 : 26),
                rotate: rel * (compact ? 4 : 7),
                scale: 1 - rel * 0.07,
                opacity: 1 - rel * 0.16,
                zIndex: 50 - rel,
                filter: dim ? 'brightness(0.55)' : 'brightness(1)',
              }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              whileHover={rel === 0 ? { scale: 1.02 } : { filter: 'brightness(0.8)' }}
              style={{ cursor: 'pointer' }}
            >
              <img src={g.src} alt="" loading="lazy" />
              <div
                className="fan-card-shade"
                style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,5,6,0.88)), radial-gradient(120% 90% at 80% 0%, rgba(77,216,255,0.16), transparent 60%)' }}
              />
              <div className="fan-card-body">
                <h4>OceanEmbed</h4>
                <p>{g.caption}</p>
                <span className="pill wip">In development</span>
              </div>
            </motion.div>
          )
        })}
      </div>
      <div className="fan-tabs">
        {GALLERY.map((g, i) => (
          <button key={g.src} className={`fan-tab ${i === active ? 'on' : ''}`} onClick={() => setActive(i)}>
            {g.tag}
          </button>
        ))}
      </div>
      <p className="fan-hint">Hover to pause. Click a card to view large.</p>
    </div>
  )
}

function Lightbox({ i, onClose }) {
  const m = GALLERY[i % GALLERY.length]
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <motion.div className="modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.figure
        className="moment-light"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <img src={m.src} alt={m.caption} />
        <figcaption><b>{m.caption}</b><span>OceanEmbed · research prototype</span></figcaption>
      </motion.figure>
    </motion.div>,
    document.body
  )
}

export default function CurrentFocus() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(0)
  const [flowPaused, setFlowPaused] = useState(false)
  const [shot, setShot] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (!flowPaused && !document.hidden) setStep((v) => (v + 1) % FLOW.length)
    }, 900)
    return () => clearInterval(t)
  }, [flowPaused])

  return (
    <section className="section focus-section" id="now" ref={ref}>
      <div className="focus-blob focus-blob-a" aria-hidden />
      <div className="focus-blob focus-blob-b" aria-hidden />
      <motion.div
        className="focus-head"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="focus-head-left">
          <p className="kicker">Currently working on</p>
          <h2 className="h-giant">Ocean<span className="it">Embed</span></h2>
          <p className="fan-tag" style={{ marginTop: '0.6rem' }}>AI-powered subsurface ocean intelligence</p>
        </div>
        <div className="focus-head-right">
          <p className="section-desc" style={{ marginTop: 0 }}>
            OceanEmbed reconstructs subsurface ocean temperature from seven daily surface variables,
            giving depth-resolved views of the North Indian Ocean from the surface to 1,000 metres
            across 15 depth levels.
          </p>
          <div className="pub-badges" style={{ marginTop: '1.2rem' }}>
            <span className="pill wip"><span className="pill-dot" aria-hidden />In development</span>
            <span className="pill">Research prototype</span>
          </div>
        </div>
      </motion.div>

      <div className="focus-split">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <OceanFan onOpen={setShot} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <LitBlock />
        </motion.div>
      </div>

      <motion.div
        className="focus-flow"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7 }}
        onMouseEnter={() => setFlowPaused(true)}
        onMouseLeave={() => setFlowPaused(false)}
      >
        {FLOW.map((s, i) => (
          <span key={s} className={`focus-flow-item${i === step ? ' on' : ''}`}>
            {s}{i < FLOW.length - 1 && <i aria-hidden>→</i>}
          </span>
        ))}
      </motion.div>

      <AnimatePresence>
        {shot !== null && <Lightbox i={shot} onClose={() => setShot(null)} />}
      </AnimatePresence>
    </section>
  )
}
