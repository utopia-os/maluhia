import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('EN')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        width: isScrolled ? 'min(91.666667%, 80rem)' : '100%',
        borderRadius: isScrolled ? '9999px' : '0px',
      }}
      className={`navbar fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'top-4 bg-white/70 backdrop-blur-md shadow-2xl'
          : 'top-0  backdrop-blur-sm'
      }`}
    >
      {/* Logo - Start */}
      <div className="navbar-start">
       
      </div>

      {/* Navigation Links - Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className={`menu menu-horizontal px-1 transition-all duration-500 ease-in-out ${isScrolled ? 'gap-1' : 'gap-2'}`}>
          <li>
            <button
              onClick={() => scrollToSection('home')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('story')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out `}
            >
              Story
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('dialog')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out `}
            >
              Dialog
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('map')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out `}
            >
              {isScrolled ? 'Map' : 'World of Maluhia'}
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('crowdfunding')}
              className={`btn btn-ghost transition-all duration-500 ease-in-out `}
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
          <div tabIndex={0} role="button" className={`btn btn-ghost gap-2 transition-all duration-500 ease-in-out `}>
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
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow-lg"
          >
            <li>
              <button onClick={() => setSelectedLanguage('DE')}>
                🇩🇪 Deutsch
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedLanguage('EN')}>
                🇬🇧 English
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedLanguage('ES')}>
                🇪🇸 Español
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedLanguage('FR')}>
                🇫🇷 Français
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedLanguage('PT')}>
                🇵🇹 Português
              </button>
            </li>
          </ul>
        </div>

        {/* Login Button - Orange gradient like in screenshots */}
        <button className={`btn bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-500 ease-in-out px-8`}>
          Login
        </button>

        {/* Mobile Menu Button */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <button onClick={() => scrollToSection('home')}>Home</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('story')}>Story</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('dialog')}>Dialog</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('map')}>World of Maluhia</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('crowdfunding')}>
                Crowdfunding
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}