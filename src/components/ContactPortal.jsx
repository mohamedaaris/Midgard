import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { GITHUB_URL, LINKEDIN_URL } from './Navbar'

const WEB3FORMS_KEY = 'ae1493e1-92ed-4079-9832-12e41c47791a'
const EMAIL = 'mohamedaaris.p.2024.cse@rajalakshmi.edu.in'

export default function ContactPortal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', reason: 'Project collaboration', message: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)
  const [li, setLi] = useState(8) // K (last letter)
  const [paused, setPaused] = useState(false)
  const [dims, setDims] = useState({ w: 63, h: 74 })

  const LINE = "LET'S BUILD"
  const LETTERS = LINE.split('').map((ch, i) => ({ ch, i })).filter(o => o.ch !== ' ')

  // Auto-run the selector across every letter; hold it while hovering one
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setLi(v => (v + 1) % LETTERS.length), 1100)
    return () => clearInterval(t)
  }, [paused, LETTERS.length])

  const sel = LETTERS[li].i
  const hoverLetter = (pos) => (e) => {
    setPaused(true)
    setLi(pos)
    const r = e.currentTarget.getBoundingClientRect()
    setDims({ w: Math.round(r.width), h: Math.round(r.height) })
  }

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: form.name, email: form.email, message: `[${form.reason}] ${form.message}`,
            subject: `Midgard inquiry from ${form.name}`,
            from_name: 'Midgard contact form',
          }),
        })
      const out = await res.json()
      if (out.success) {
        setStatus('ok')
        setForm({ name: '', email: '', reason: 'Project collaboration', message: '' })
      } else setStatus('err')
    } catch {
      setStatus('err')
    } finally {
      setSending(false)
      setTimeout(() => setStatus(null), 6000)
    }
  }

  return (
    <section className="section" id="contact" ref={ref}>
      <p className="kicker">Contact &amp; collaboration</p>
      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <h2 className="contact-big" onMouseLeave={() => setPaused(false)}>
            {LINE.split('').map((ch, i) =>
              ch === ' '
                ? <span key={i} className="talk-space"> </span>
                : (
                  <span
                    key={i}
                    className={`talk-ch ${i === sel ? 'on' : ''}`}
                    onMouseEnter={hoverLetter(LETTERS.findIndex(o => o.i === i))}
                  >
                    {ch}
                    {i === sel && (
                      <span className="talk-box" aria-hidden>
                        <i className="th tl" /><i className="th tr" /><i className="th bl" /><i className="th br" />
                        <em>{ch}&nbsp;&nbsp;{dims.w} × {dims.h}</em>
                      </span>
                    )}
                  </span>
                )
            )}
          </h2>
          <p className="contact-mail">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <div className="contact-btns">
            <a className="btn btn-solid" href={`mailto:${EMAIL}`}>Email the founder</a>
            <a className="btn btn-ghost" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <p className="section-desc" style={{ marginTop: '1.6rem' }}>
            Open to pilot builds, project collaboration and technical conversations.
            We usually reply within 24–48 hours.
          </p>
        </motion.div>

        <motion.form
          className="form-card"
          onSubmit={submit}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.75 }}
        >
          <label htmlFor="c-name">Name</label>
          <input id="c-name" value={form.name} onChange={set('name')} placeholder="Your name" required />
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
          <label htmlFor="c-reason">I'm here for</label>
          <select id="c-reason" value={form.reason} onChange={set('reason')}>
            <option>Project collaboration</option>
            <option>Custom build</option>
            <option>AI / automation consulting</option>
            <option>MVP / prototype</option>
            <option>Just saying hi</option>
          </select>
          <label htmlFor="c-msg">Message</label>
          <textarea id="c-msg" value={form.message} onChange={set('message')} placeholder="What problem are you trying to solve?" required />
          <button className="btn btn-solid" type="submit" disabled={sending} style={{ marginTop: '1.2rem', width: '100%', justifyContent: 'center' }}>
            {sending ? 'Sending…' : status === 'ok' ? '✓ Sent' : 'Send'}
          </button>
          {status === 'ok' && <p className="form-status ok">Thanks — your message is on its way.</p>}
          {status === 'err' && <p className="form-status err">Could not send. Please email me directly.</p>}
        </motion.form>
      </div>
    </section>
  )
}
