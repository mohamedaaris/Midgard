import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
  '> Initializing portfolio environment...',
  '> Loading projects, skills & systems... [OK]',
  '> Verifying contact channel... [OK]',
  '> Ready ✓',
]

export default function EntrySequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    onComplete()
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { finish(); return }

    const timeouts = []
    bootSequence.forEach((line, idx) => {
      timeouts.push(setTimeout(() => {
        setVisibleLines(prev => (prev.includes(line) ? prev : [...prev, line]))
      }, 350 + idx * 450))
    })
    // Auto-enter after ~2.6s (was 7.3s)
    timeouts.push(setTimeout(finish, 2700))

    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') finish() }
    window.addEventListener('keydown', onKey)
    return () => {
      timeouts.forEach(t => clearTimeout(t))
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="entry-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.015) 2px, rgba(0,245,255,0.015) 4px)',
      }} />

      <motion.div
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.75) 0%, rgba(185,70,255,0.35) 45%, transparent 70%)',
          position: 'relative', zIndex: 10,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 180 }}
      >
        <motion.div
          style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid rgba(0,245,255,0.4)', borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <div style={{ marginTop: '1.75rem', minHeight: 110, zIndex: 10, width: '100%', maxWidth: 400, padding: '0 1rem' }}>
        <AnimatePresence>
          {visibleLines.map((line) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: line.includes('✓') ? '#00ff88' : line.includes('[OK]') ? '#00f5ff' : '#8892b0',
                textAlign: 'left', marginBottom: '0.35rem', fontSize: '0.8rem', letterSpacing: '1px',
              }}
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: '1.05rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #00f5ff, #b946ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '3px', textAlign: 'center', marginTop: '1.25rem',
        }}>
          P MOHAMED AARIS
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", color: '#8892b0',
          fontSize: '0.7rem', letterSpacing: '3px', marginTop: '0.4rem', textAlign: 'center',
        }}>
          MIDGARD · ENGINEERING INTELLIGENT SYSTEMS
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 220, height: 2, background: 'rgba(0,245,255,0.12)', borderRadius: 1, overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #00f5ff, #b946ff)', borderRadius: 1 }}
            initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        </div>
        <button
          onClick={finish}
          style={{
            background: 'transparent', border: '1px solid rgba(0,245,255,0.35)', borderRadius: 4,
            color: '#00f5ff', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem',
            letterSpacing: '2px', padding: '0.45rem 1.25rem', cursor: 'pointer',
          }}
        >
          SKIP →
        </button>
      </div>
    </motion.div>
  )
}
