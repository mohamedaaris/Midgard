import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const projects = [
  {
    title: 'SolarGrid AI',
    tagline: 'Intelligent rooftop solar integration for DISCOMs',
    description: 'AI-assisted grid intelligence combining machine learning, physics-based power-flow simulation, GIS risk mapping and 3D digital twins — classifying proposed rooftop-solar connections as Safe, Caution or Constrained before approval, with a traceable citizen–DISCOM–vendor workflow.',
    stack: ['Python', 'scikit-learn', 'pandapower'],
    cat: 'Energy Intelligence',
    status: 'Live',
    url: 'https://sih26-1-urz4.onrender.com/',
    shot: '/assets/solargrid%20panel%20placement.png',
    glow: 'rgba(200,255,46,0.16)',
    media: [
      { src: '/assets/solargrid%20panel%20placement.png', caption: '3D panel placement' },
      { src: '/assets/solargrid%20citizen%20portal%20application%20page.png', caption: 'Citizen application portal' },
      { src: '/assets/solargrid%20incentive%20page%20in%20citizen%20page.png', caption: 'Incentive breakdown' },
      { src: '/assets/solargrid%20vendor%20listing%20in%20citizen%20portal.png', caption: 'Verified vendors' },
      { src: '/assets/solargrid%20vendors%20report%20to%20the%20discom%20in%20vendor%20portal.png', caption: 'Vendor report to DISCOM' },
      { src: '/assets/Citizen%20application%20validating%20page%20in%20discom%20portal.png', caption: 'DISCOM validation view' },
    ],
  },
  {
    title: 'OceanEmbed',
    tagline: 'AI-powered subsurface ocean intelligence',
    description: 'Reconstructs subsurface ocean temperature from seven daily surface variables — depth-resolved views of the North Indian Ocean to 1,000 metres, with D26 and TCHP thermal indicators along cyclone paths.',
    stack: ['Python', 'CNN', '3D Viz'],
    cat: 'Ocean Intelligence',
    status: 'In development',
    url: null,
    shot: '/assets/OceanEmbed.jpeg',
    glow: 'rgba(77,216,255,0.16)',
    note: 'Currently in development — demo on request.',
    media: [
      { src: '/assets/OceanEmbed.jpeg', caption: 'Subsurface field' },
      { src: '/assets/OceanEmbed%202.jpeg', caption: 'Depth-resolved view' },
      { src: '/assets/OceanEmbed%203.jpeg', caption: 'Thermal analysis' },
    ],
  },
  {
    title: 'MiraiSync',
    tagline: 'Realtime collaborative watch-party platform',
    description: 'Synchronized video playback across locations with realtime chat via WebSockets, room creation and multi-source support with latency handling.',
    stack: ['JavaScript', 'Flask', 'Socket.IO'],
    cat: 'Full Stack',
    status: 'Live',
    url: 'https://miraisync.app/',
    shot: '/assets/miraisync2.jpg',
    glow: 'rgba(200,255,46,0.16)',
    media: [
      { src: '/assets/miraisync1.jpg', caption: 'Watch room' },
      { src: '/assets/miraisync2.jpg', caption: 'Synchronized playback' },
      { src: '/assets/miraisync3.jpg', caption: 'Live chat' },
      { src: '/assets/miraisync4.jpg', caption: 'Room management' },
      { src: '/assets/miraisync5.jpg', caption: 'Mobile view' },
    ],
  },
  {
    title: 'ResuMatch AI',
    tagline: 'AI resume parsing & job matching assistant',
    description: 'Resume parsing, skill extraction and job matching with SBERT / TF-IDF, plus an AI assistant for recommendations and application drafts.',
    stack: ['Python', 'Flask', 'SBERT'],
    cat: 'AI',
    status: 'Live',
    url: 'https://aarisx0-resumatch.hf.space/',
    shot: '/assets/resumatch1.jpeg',
    glow: 'rgba(150,140,255,0.16)',
    media: [
      { src: '/assets/resumatch1.jpeg', caption: 'Dashboard' },
      { src: '/assets/resumatch2.jpeg', caption: 'Resume analysis' },
      { src: '/assets/resumatch3.jpeg', caption: 'Job matches' },
      { src: '/assets/resumatch4.jpeg', caption: 'AI assistant' },
      { src: '/assets/resumatch5.jpeg', caption: 'Application flow' },
    ],
  },
  {
    title: 'FlowLink',
    tagline: 'Seamless Android ↔ web continuity & sharing',
    description: 'Cross-platform sharing (React, Kotlin, Node.js, WebSocket, WebRTC) with session discovery, deep-linking and drag-and-drop transfers.',
    stack: ['React', 'Kotlin', 'WebRTC'],
    cat: 'Client',
    status: 'Live',
    url: 'https://flowlink-1sta.onrender.com/',
    shot: '/assets/flowlink1.png',
    glow: 'rgba(110,200,255,0.16)',
    media: [
      { src: '/assets/flowlink1.png', caption: 'Overview' },
      { src: '/assets/flowlink2.png', caption: 'Pairing' },
      { src: '/assets/flowlink3.png', caption: 'File transfer' },
      { src: '/assets/flowlink4.png', caption: 'Text & URL share' },
      { src: '/assets/flowlink5.png', caption: 'Session view' },
      { src: '/assets/flowlink6.png', caption: 'Mobile app' },
      { src: '/assets/flowlink7.png', caption: 'Device linking' },
      { src: '/assets/flowlink8.png', caption: 'Transfer queue' },
      { src: '/assets/flowlink9.png', caption: 'Notifications' },
      { src: '/assets/flowlink10.png', caption: 'History' },
      { src: '/assets/flowlink11.png', caption: 'Settings' },
      { src: '/assets/flowlink12.png', caption: 'Deep linking' },
      { src: '/assets/flowlink13.png', caption: 'Drag & drop' },
      { src: '/assets/flowlink14.png', caption: 'Cross-device sync' },
    ],
  },
  {
    title: 'Research Agent',
    tagline: 'Multi-agent literature search & citation fixer',
    description: 'Searches papers for a topic, builds a reference list, and validates / corrects citations automatically.',
    stack: ['Python', 'Flask', 'REST APIs'],
    cat: 'AI',
    status: 'Live',
    url: 'https://research-pnaa.onrender.com/',
    shot: '/assets/research1.png',
    glow: 'rgba(255,158,44,0.14)',
    media: [
      { src: '/assets/research1.png', caption: 'Home' },
      { src: '/assets/research2.png', caption: 'Search' },
      { src: '/assets/research3.png', caption: 'Results' },
      { src: '/assets/research4.png', caption: 'References' },
      { src: '/assets/research5.png', caption: 'Validation' },
      { src: '/assets/research6.png', caption: 'Corrections' },
      { src: '/assets/research7.png', caption: 'Export' },
    ],
  },
  {
    title: 'AgentX',
    tagline: 'Chat-first interface to build AI agents',
    description: 'Chat, reasoning and tool use in one interface. Create and deploy agents through conversation (Llama 3.2 3B) with a modular tools system.',
    stack: ['Python', 'Llama 3.2', 'Flask'],
    cat: 'AI',
    status: 'In development',
    url: null,
    shot: '/assets/chatbot1.jpeg',
    glow: 'rgba(255,110,120,0.14)',
    note: 'In development — code on request.',
    media: [
      { src: '/assets/chatbot1.jpeg', caption: 'Chat interface' },
      { src: '/assets/chatbot2.jpeg', caption: 'Agent builder' },
      { src: '/assets/chatbot3.jpeg', caption: 'Tool integrations' },
      { src: '/assets/chatbot4.jpeg', caption: 'Reasoning view' },
      { src: '/assets/chatbot5.jpeg', caption: 'Settings' },
    ],
  },
  {
    title: 'E-commerce Store',
    tagline: 'Full-stack online shopping experience',
    description: 'Product browsing, cart, JWT auth and checkout. Next.js + Node.js + MySQL end to end.',
    stack: ['Next.js', 'Node.js', 'MySQL'],
    cat: 'Web',
    status: 'Live',
    url: 'https://ecommerce-gngm.vercel.app/',
    shot: '/assets/ecommerce.jpg',
    glow: 'rgba(120,255,200,0.13)',
    media: [{ src: '/assets/ecommerce.jpg', caption: 'Homepage' }],
  },
]

/* ── Case-study modal ── */
function Modal({ project, onClose }) {
  const [i, setI] = useState(0)
  const media = project.media || []
  const item = media.length ? media[i % media.length] : null

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
      <motion.div
        className="modal-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={project.title}
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <span className={`pill ${project.status === 'Live' ? 'live' : 'wip'}`}>{project.status}</span>
        <h3 style={{ marginTop: '0.7rem' }}>{project.title}</h3>
        <p className="modal-tag">{project.tagline}</p>
        <p className="modal-tag" style={{ color: '#a1a1aa', fontSize: '0.92rem', lineHeight: 1.7 }}>{project.description}</p>
        {item && (
          <>
            <div className="modal-shot"><img src={item.src} alt={item.caption} loading="lazy" /></div>
            <div className="modal-nav">
              <button onClick={() => setI((i - 1 + media.length) % media.length)} aria-label="Previous">‹</button>
              <span>{(i % media.length) + 1} / {media.length} — {item.caption}</span>
              <button onClick={() => setI((i + 1) % media.length)} aria-label="Next">›</button>
            </div>
          </>
        )}
        <div className="stack-row">{project.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}</div>
        <div style={{ marginTop: '1.2rem' }}>
          {project.url
            ? <a className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }} href={project.url} target="_blank" rel="noopener noreferrer">Visit live site →</a>
            : <p className="modal-tag">Code available on request — ask me in an interview.</p>}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

/* ── Swirling fan deck — the single home of all 6 projects ── */
function FanDeck({ onOpen }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [compact, setCompact] = useState(false)
  const n = projects.length

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)')
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(a => (a + 1) % n), 3600)
    return () => clearInterval(t)
  }, [paused, n])

  const p = projects[active]

  return (
    <div className="fan">
      <div className="fan-left">
        <p className="kicker">Featured work</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="fan-cat">{p.cat}</p>
            <h3 className="fan-title">{p.title}</h3>
            <p className="fan-tag">{p.tagline}</p>
            <p className="fan-desc">{p.description}</p>
            <div className="stack-row" style={{ margin: '1rem 0 1.4rem' }}>
              {p.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
            </div>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <button className="btn btn-solid" onClick={() => onOpen(p)}>Case study</button>
              {p.url && <a className="btn btn-ghost" href={p.url} target="_blank" rel="noopener noreferrer">Live site ↗</a>}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="fan-tabs">
          {projects.map((t, i) => (
            <button
              key={t.title}
              className={`fan-tab ${i === active ? 'on' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.title.split(' ')[0].replace('—', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="fan-stage">
        {projects.map((t, i) => {
          const rel = (i - active + n) % n
          if (rel > 4) return null
          const dim = rel !== 0
          return (
            <motion.div
              key={t.title}
              className="fan-card"
              onClick={() => (rel === 0 ? onOpen(t) : setActive(i))}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
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
              <img src={t.shot} alt="" loading="lazy" />
              <div className="fan-card-shade" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(5,5,6,0.88)), radial-gradient(120% 90% at 80% 0%, ${t.glow}, transparent 60%)` }} />
              <div className="fan-card-body">
                <h4>{t.title}</h4>
                <p>{t.tagline}</p>
                <span className={`pill ${t.status === 'Live' ? 'live' : 'wip'}`}>{t.status}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <p className="fan-hint">Hover a card to pause. Click a card to open the case study.</p>
    </div>
  )
}

export default function ProjectHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [selected, setSelected] = useState(null)

  return (
    <section className="section" id="work" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <FanDeck onOpen={setSelected} />
      </motion.div>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
