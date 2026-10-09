import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const CYCLE = ['SYSTEMS', 'INTELLIGENCE', 'IMPACT']

function CycleWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % CYCLE.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="cycle-word" aria-live="polite">
      <span className="corner tl" /><span className="corner tr" />
      <span className="corner bl" /><span className="corner br" />
      <AnimatePresence mode="wait">
        <motion.span
          key={CYCLE[i]}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
          transition={{ duration: 0.35 }}
          style={{ display: 'inline-block' }}
        >
          {CYCLE[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function LitWord({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.13, 1])
  const color = accent
    ? useTransform(progress, range, ['rgba(200,255,46,0.16)', '#c8ff2e'])
    : useTransform(progress, range, ['rgba(244,244,245,0.14)', '#f4f4f5'])
  return (
    <motion.span className={accent ? 'it lit' : ''} style={{ opacity, color }}>
      {children}{' '}
    </motion.span>
  )
}

function ScrollStatement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = 'Midgard turns messy real-world problems into working systems — from data to decision to action.'.split(' ')
  const accent = new Set(['working', 'decision'])
  return (
    <p ref={ref} className="stmt">
      {words.map((w, i) => (
        <LitWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min((i + 1.5) / words.length, 1)]}
          accent={accent.has(w)}
        >
          {w}
        </LitWord>
      ))}
    </p>
  )
}

const ICONS_A = ['React', 'Next.js', 'JavaScript', 'Python', 'Flask', 'Tailwind', 'Framer Motion', 'Socket.IO', 'MySQL', 'Git']
const ICONS_B = ['WebRTC', 'SBERT', 'Llama 3.2', 'scikit-learn', 'pandapower', 'CesiumJS', 'Node.js', 'Kotlin', 'Flutter', 'Supabase']

function IconMarquee({ items, reverse }) {
  const row = [...items, ...items]
  return (
    <div className="icon-marquee">
      <div className={`icon-track ${reverse ? 'reverse' : ''}`}>
        {row.map((t, i) => (
          <span key={i} className="icon-chip">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about" ref={ref} style={{ paddingTop: '5rem', maxWidth: 'none' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <CycleWord />
        </motion.div>
        <ScrollStatement />
      </div>
      <div style={{ marginTop: '3rem' }}>
        <IconMarquee items={ICONS_A} />
        <IconMarquee items={ICONS_B} reverse />
      </div>
    </section>
  )
}
