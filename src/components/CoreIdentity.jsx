import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const rise = {
  hidden: { opacity: 0, y: 50 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
}

export default function CoreIdentity() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const goWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  const goLive = () => window.open('https://sih26-1-urz4.onrender.com/', '_blank', 'noopener')

  return (
    <header className="hero" id="home" ref={ref}>
      <div className="hero-blob" style={{ width: 480, height: 480, background: 'rgba(200,255,46,0.07)', top: '-8%', right: '6%' }} />
      <div className="hero-blob" style={{ width: 380, height: 380, background: 'rgba(120,90,255,0.08)', bottom: '-10%', left: '-6%' }} />

      <motion.div style={{ y: yText, opacity: fade }}>
        <motion.p className="kicker" variants={rise} initial="hidden" animate="show" custom={0.1}>
          College-collaboration startup
        </motion.p>
        <motion.h1 className="hero-name" variants={rise} initial="hidden" animate="show" custom={0.2}>
          Midgard<span className="dot">.</span>
        </motion.h1>
        <motion.p className="hero-pitch" variants={rise} initial="hidden" animate="show" custom={0.35}>
          Engineering <span className="it">intelligent systems</span> for real-world problems — AI-powered software, automation and <span className="it">decision systems</span> that work.
        </motion.p>
        <motion.div className="hero-ctas" variants={rise} initial="hidden" animate="show" custom={0.5}>
          <button className="btn btn-solid" onClick={goWork}>Explore our work</button>
          <button className="btn btn-ghost" onClick={goLive}>See SolarGrid AI live</button>
        </motion.div>
        <motion.div className="hero-meta" variants={rise} initial="hidden" animate="show" custom={0.65}>
          <span><b>FOCUS</b> · AI + Software Systems</span>
          <span><b>MODEL</b> · R&amp;D + Custom Builds</span>
          <span><b>STAGE</b> · Early-stage Startup</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ y: yPhoto }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-photo-wrap">
          <img src="/assets/aaris.jpeg" alt="Mohamed Aaris P, Founder of Midgard" />
        </div>
        <motion.div
          className="orb orb-lime" style={{ width: 150, height: 150, top: '-4%', right: '2%' }}
          animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb orb-chrome" style={{ width: 76, height: 76, top: '38%', right: '10%' }}
          animate={{ y: [0, 14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.div
          className="orb orb-red" style={{ width: 108, height: 108, bottom: '2%', right: '4%' }}
          animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        />
      </motion.div>

      <div className="scroll-hint">Scroll</div>
    </header>
  )
}
