import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

// Links
export const GITHUB_URL = 'https://github.com/mohamedaaris'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/mohamedaaris/'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'moments', label: 'Moments' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // ids in page order — last one above the line wins
      const ids = navItems.map(n => n.id)
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="nav-logo" onClick={() => go('home')}>Midgard<em>.</em></span>

        <ul className="nav-links">
          {navItems.map(n => (
            <li key={n.id}>
              <span className={`nav-link ${active === n.id ? 'active' : ''}`} onClick={() => go(n.id)}>
                {n.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="resume-pill" href="#contact">Build With Us</a>
        </div>

        <button className="mobile-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>

        <motion.div className="nav-progress" style={{ scaleX: progress }} />
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {navItems.map(n => (
              <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
