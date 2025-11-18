import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [lastScrollTime, setLastScrollTime] = useState(Date.now())
  const [isHovered, setIsHovered] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('EN')
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  // Scroll-Handler
  useEffect(() => {
    // Find the scroll container (first element with overflow-y-scroll)
    const scrollContainer = document.querySelector('.snap-y.snap-mandatory.overflow-y-scroll') as HTMLElement

    const handleScroll = () => {
      const currentScrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY

      // Navbar ist am Anfang immer sichtbar
      if (currentScrollY < 50) {
        setIsScrolled(false)
        setIsVisible(true)
      } else {
        setIsScrolled(true)
        // Navbar bleibt beim Scrollen sichtbar (egal ob hoch oder runter)
        // Der 3-Sekunden-Timer blendet sie bei Inaktivität aus
        setIsVisible(true)
      }

      // Aktive Sektion herausfinden
      const sections = ['home', 'story', 'join', 'map', 'crowdfunding']
      const sectionElements = sections.map(id => ({
        id,
        element: document.getElementById(id)
      })).filter(s => s.element !== null)

      // Finde die Sektion, die am meisten im Viewport ist
      let currentSection = 'home'
      let maxVisibility = 0

      sectionElements.forEach(({ id, element }) => {
        if (!element) return

        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        // Berechne wie viel von der Sektion sichtbar ist
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const visibility = visibleHeight / viewportHeight

        if (visibility > maxVisibility) {
          maxVisibility = visibility
          currentSection = id
        }
      })

      setActiveSection(currentSection)
      setLastScrollY(currentScrollY)
      setLastScrollTime(Date.now())
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  // Inaktivitäts-Timer (nur wenn nicht in Hero-Section)
  useEffect(() => {
    // Navbar bleibt in der Hero-Section immer sichtbar
    if (activeSection === 'home') return

    if (!isScrolled || !isVisible || isHovered) return

    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(hideTimeout)
  }, [lastScrollTime, isScrolled, isVisible, isHovered, activeSection])

  // Mouse-Move-Handler: Navbar erscheint bei Annäherung an oberen Bildschirmrand
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Wenn Maus innerhalb der oberen 100px des Viewports ist
      if (e.clientY < 100) {
        setIsVisible(true)
        setLastScrollTime(Date.now()) // Reset inactivity timer
      } else if (e.clientY > 150 && !isHovered && !isMenuOpen && !isLanguageOpen && activeSection !== 'home') {
        // Wenn Maus nicht am oberen Rand und keine Dropdowns offen, verstecken
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered, isMenuOpen, isLanguageOpen, activeSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }

    // Reset to first step/slide when clicking navbar
    setTimeout(() => {
      if (sectionId === 'story') {
        // Go to first story slide
        const firstSlide = document.getElementById('slide1')
        if (firstSlide) {
          firstSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
      } else if (sectionId === 'join') {
        // Trigger will reset to first question via event
        window.dispatchEvent(new CustomEvent('resetDialog'))
      }
    }, 100)
  }

  const isWhiteText = activeSection === 'map' || activeSection === 'crowdfunding'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`navbar sticky z-50 transition-all duration-1000 ease-in-out backdrop-blur-xs ${
        isVisible
          ? 'top-0'
          : '-top-24'
      } ${isWhiteText ? 'text-white' : 'text-black'}`}
    >
      {/* Logo - Start */}
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu font-bold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            data-theme={`${isWhiteText ? 'light' : 'dark'}`}
            onBlur={() => setIsMenuOpen(false)}
          >
                        <li>
              <button
                onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }}
                className={activeSection === 'home' ? 'active' : ''}
              >
                Start
              </button>
            </li>
            <li>
              <button
                onClick={() => { scrollToSection('story'); setIsMenuOpen(false); }}
                className={activeSection === 'story' ? 'active' : ''}
              >
                Story
              </button>
            </li>
            <li>
              <button
                onClick={() => { scrollToSection('join'); setIsMenuOpen(false); }}
                className={activeSection === 'join' ? 'active' : ''}
              >
                Join
              </button>
            </li>
            <li>
              <button
                onClick={() => { scrollToSection('map'); setIsMenuOpen(false); }}
                className={activeSection === 'map' ? 'active' : ''}
              >
                Map
              </button>
            </li>
            <li>
              <button
                onClick={() => { scrollToSection('crowdfunding'); setIsMenuOpen(false); }}
                className={activeSection === 'crowdfunding' ? 'active' : ''}
              >
                Crowdfunding
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation Links - Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className={`menu menu-horizontal px-1 transition-all duration-500 ease-in-out ${isScrolled ? 'gap-1' : 'gap-2'}`}>
          <li>
          <button
              onClick={() => scrollToSection('home')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out ${activeSection === 'home' ? 'text-[#E37039]' : ''}`}
            >
              Start
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('story')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out ${activeSection === 'story' ? 'text-[#E37039]' : ''}`}
            >
              Story
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('join')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out ${activeSection === 'join' ? 'text-[#E37039]' : ''}`}
            >
              Join
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('map')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out ${activeSection === 'map' ? 'text-[#E37039]' : ''}`}
            >
              Map
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('crowdfunding')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out ${activeSection === 'crowdfunding' ? 'text-[#E37039]' : ''}`}
            >
              Crowdfunding
            </button>
          </li>
        </ul>
      </div>

      {/* Right Side - Language and Login */}
      <div className="navbar-end gap-2">
        {/* Language Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost gap-2 transition-all duration-500 ease-in-out `}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <span className="font-semibold">{selectedLanguage}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow-lg font-bold"
            data-theme={`${isWhiteText ? 'light' : 'dark'}`}
            onBlur={() => setIsLanguageOpen(false)}
          >
            <li>
              <button onClick={() => { setSelectedLanguage('DE'); setIsLanguageOpen(false); }}>
                🇩🇪 Deutsch
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLanguage('EN'); setIsLanguageOpen(false); }}>
                🇬🇧 English
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLanguage('ES'); setIsLanguageOpen(false); }}>
                🇪🇸 Español
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLanguage('FR'); setIsLanguageOpen(false); }}>
                🇫🇷 Français
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLanguage('PT'); setIsLanguageOpen(false); }}>
                🇵🇹 Português
              </button>
            </li>
          </ul>
        </div>

        {/* Login Button - Orange gradient like in screenshots */}
        <button className={`btn bg-linear-to-r from-orange-500 to-orange-600 text-white border-none hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-500 ease-in-out px-8`}>
          Login
        </button>
      </div>
    </div>
  )
}