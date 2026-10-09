import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

function RevealWords({ text, dark = '#f4f4f5', light = 'rgba(244,244,245,0.13)', accents = {}, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <W key={i} progress={scrollYProgress} n={words.length} i={i} dark={dark} light={light} accent={accents[w]}>{w}</W>
      ))}
    </p>
  )
}

function W({ children, progress, n, i, dark, light, accent }) {
  const opacity = useTransform(progress, [i / n, Math.min((i + 1.2) / n, 1)], [0.12, 1])
  return (
    <motion.span style={{ opacity, color: accent || dark }}>
      {children}{' '}
    </motion.span>
  )
}

function FadeCol({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [24, 0])
  return <motion.div style={{ opacity, y }}>{children}</motion.div>
}

function BioBlock() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  return (
    <div ref={ref} className="cream-bio">
      <FadeCol progress={scrollYProgress} range={[0, 0.45]}>
        <p>
          Midgard began with a single project: <b>MiraiSync.</b> What started as an effort to build
          a real-time collaborative streaming platform became the first step in a much bigger journey —
          turning ideas into <b>working technology.</b> Encouragement and guidance from mentors and senior
          peers pushed me to think beyond individual applications and look at technology from a broader
          engineering perspective.
        </p>
      </FadeCol>
      <FadeCol progress={scrollYProgress} range={[0.4, 0.9]}>
        <p>
          Step by step, that curiosity grew into projects spanning AI agents, research automation,
          renewable-energy intelligence, connectivity, scientific computing, real-time systems and
          cybersecurity — learning continuously, building purposefully, and turning ambitious ideas
          into systems that work. <a href="#contact">Build with us →</a>
        </p>
      </FadeCol>
    </div>
  )
}

export default function AboutPortrait() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="cream" ref={ref}>
      <span className="cream-giant" aria-hidden>STORY</span>
      <div className="cream-inner">
        <motion.div
          className="cream-photo"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <img src="/assets/aaris.jpeg" alt="Mohamed Aaris P, Founder of Midgard" />
          <svg className="spin-badge" viewBox="0 0 120 120" aria-hidden>
            <defs>
              <path id="circ" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#0a0a0a" />
            <text>
              <textPath href="#circ" textLength="272" lengthAdjust="spacingAndGlyphs">MIDGARD • OUR STORY • CHENNAI •</textPath>
            </text>
            <text x="60" y="68" textAnchor="middle" className="badge-star">✦</text>
          </svg>
        </motion.div>

        <div>
          <RevealWords
            className="cream-quote"
            text="From the first build to a bigger vision. Midgard began with one working product — and grew into a way of solving problems."
            accents={{ bigger: '#c8ff2e', vision: '#c8ff2e' }}
          />
          <p className="cream-byline">— MOHAMED AARIS P, FOUNDER, MIDGARD</p>
          <BioBlock />
          <div className="cream-facts">
            <div><span>Roots</span><b>Started with MiraiSync — a real-time streaming build</b></div>
            <div><span>Today</span><b>AI · Software · Research · Automation</b></div>
            <div><span>Vision</span><b>An engineering-driven technology company</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
