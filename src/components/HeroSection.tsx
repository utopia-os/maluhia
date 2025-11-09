import ShadowButton from './ShadowButton'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'

export default function HeroSection() {
  const scrollToNextSection = () => {
    const element = document.getElementById('story')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Global keyboard navigation (Hero section uses default behavior from hook)
  useGlobalKeyboardNavigation({})

  return (
    <div className="hero h-dvh min-h-64">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-9xl text-[#297D95] mb-4" style={{ fontFamily: '"Reenie Beanie", cursive' }}>Maluhia</h1>
          <p className="text-3xl text-[#297D95]/80 mb-8">Movement</p>
          <ShadowButton onClick={scrollToNextSection}>
            Reise Starten
          </ShadowButton>
        </div>
      </div>
    </div>
  )
}
