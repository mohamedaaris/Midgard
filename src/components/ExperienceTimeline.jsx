import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const miles = [
  { n: '01', cat: 'The First Build', flap: 'BUILD', title: 'MiraiSync', body: 'The first project that turned an interest in technology into a working product — a real-time collaborative streaming platform.', img: '/assets/miraisync1.jpg' },
  { n: '02', cat: 'Guidance & Growth', flap: 'GROWTH', title: 'Mentors and senior peers', body: 'Feedback, guidance and new ideas that encouraged thinking bigger — beyond individual applications.', img: '/assets/mentor%20and%20peers.jpg' },
  { n: '03', cat: 'Expanding Possibilities', flap: 'BEYOND', title: 'AI, research, energy, security', body: 'Each new project — agents, research automation, SolarGrid AI, connectivity, scientific computing — expanded what was possible.', img: '/assets/research.png' },
  { n: '04', cat: 'Learning Beyond Projects', flap: 'LEARN', title: 'Hackathons, workshops, research', body: 'Applying new knowledge, testing ideas, and learning to identify meaningful problems and design complete systems.', img: '/assets/sih%201.jpg' },
  { n: '05', cat: 'The Midgard Vision', flap: 'VISION', title: 'From projects to a technology company', body: 'Bringing it all together — custom solutions for organizations, plus original products that make complex technology useful and impactful.', img: '/assets/sih.jpg' },
]

function SplitFlap({ text }) {
  return (
    <span className="splitflap" aria-hidden>
      {text.split('').map((c, i) => (
        <AnimatePresence mode="wait" key={i}>
          <motion.span
            key={c + text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, delay: i * 0.03 }}
          >
            {c}
          </motion.span>
        </AnimatePresence>
      ))}
    </span>
  )
}

export default function ExperienceTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [compact, setCompact] = useState(false)
  const n = miles.length

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)')
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const go = (d) => {
    setDir(d)
    setIdx(i => (i + d + n) % n)
  }

  const m = miles[idx]

  return (
    <section className="section" id="journey" ref={ref}>
      <div className="flip-grid">
        <div>
          <p className="kicker">Our story</p>
          <motion.h2
            className="h-giant"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75 }}
          >
            From the first build<br />to a <span className="it">bigger vision</span>
          </motion.h2>
          <p className="section-desc">How one working product became Midgard.</p>
          <div style={{ marginTop: '1.8rem' }}>
            <SplitFlap text={m.flap} />
          </div>
          <p className="flip-count">{String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
        </div>

        <div className="flip-stage">
          {miles.map((t, i) => {
            const rel = (i - idx + n) % n
            if (rel > 4) return null
            return (
              <motion.div
                key={t.n}
                className="flip-card"
                onClick={() => go(1)}
                animate={{
                  x: rel * (compact ? 12 : 26),
                  rotate: rel * (compact ? 3 : 6),
                  scale: 1 - rel * 0.045,
                  opacity: 1 - rel * 0.22,
                  zIndex: 60 - rel,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                drag={rel === 0 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1)
                  else if (info.offset.x > 70) go(-1)
                }}
                whileHover={rel === 0 ? { scale: 1.015 } : {}}
                style={{ cursor: 'pointer' }}
              >
                <span className="flip-num">{t.n}</span>
                <div className="flip-img">
                  <img src={t.img} alt="" loading="lazy" />
                </div>
                <div className="flip-text">
                  <p className="flip-cat">{t.cat}</p>
                  <h4>{t.title}</h4>
                  <p className="flip-body">{t.body}</p>
                </div>
              </motion.div>
            )
          })}
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              className="flip-ghost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </AnimatePresence>
        </div>
      </div>
      <p className="flip-hint">Drag or click the card to flip through {n} milestones</p>
      <div className="flip-dots">
        {miles.map((t, i) => (
          <button
            key={t.n}
            aria-label={`Go to milestone ${i + 1}`}
            className={`flip-dot ${i === idx ? 'on' : ''}`}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
          />
        ))}
      </div>
    </section>
  )
}
