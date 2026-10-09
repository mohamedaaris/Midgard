import Navbar from './components/Navbar'
import CoreIdentity from './components/CoreIdentity'
import Manifesto from './components/Manifesto'
import AboutPortrait from './components/AboutPortrait'
import ProjectHub from './components/ProjectHub'
import CurrentFocus from './components/CurrentFocus'
import ExperienceTimeline from './components/ExperienceTimeline'
import SkillMatrix from './components/SkillMatrix'
import Moments from './components/Moments'
import ContactPortal from './components/ContactPortal'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <CoreIdentity />
        <ProjectHub />
        <CurrentFocus />
        <Manifesto />
        <AboutPortrait />
        <ExperienceTimeline />
        <SkillMatrix />
        <Moments />
        <ContactPortal />
      </main>
      <Footer />
    </>
  )
}

export default App
