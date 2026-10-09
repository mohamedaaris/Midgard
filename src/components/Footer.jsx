import { GITHUB_URL, LINKEDIN_URL } from './Navbar'

export default function Footer() {
  const now = new Date()
  const year = now.getFullYear()
  const monthYear = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  return (
    <footer className="footer">
      <span><b>Midgard</b> · Engineering intelligent systems</span>
      <span>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:mohamedaaris.p.2024.cse@rajalakshmi.edu.in">Email</a>
      </span>
      <span>© {year} · Updated {monthYear}</span>
    </footer>
  )
}
