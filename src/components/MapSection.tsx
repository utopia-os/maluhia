import { useState } from 'react'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'
import ShadowButton from './ShadowButton'

export default function MapSection() {
  const [isMapActive, setIsMapActive] = useState(false)

  // Global keyboard navigation
  useGlobalKeyboardNavigation({})

  const scrollToCrowdfunding = () => {
    const element = document.getElementById('crowdfunding')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-transparent sm:p-20 sm:pb-10 h-dvh p-8 pt-20 flex flex-col">
      <div className="container mx-auto flex-1">
        <div className="w-full h-full rounded-lg overflow-hidden shadow-xl relative">
          <iframe
            src="https://dev.utopia-map.org?embedded=true"
            className="w-full h-full border-0"
            title="Utopia Map"
            allow="fullscreen"
          />
          {!isMapActive && (
            <div
              className="absolute inset-0 bg-transparent cursor-pointer flex items-center justify-center"
              onClick={() => setIsMapActive(true)}
            >
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <p className="text-gray-800 font-semibold">Klicken um Karte zu aktivieren</p>
              </div>
            </div>
          )}
          {isMapActive && (
            <button
              className="absolute top-4 right-4 btn btn-sm btn-circle z-10"
              onClick={() => setIsMapActive(false)}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="container mx-auto mt-10 flex justify-center">
        <ShadowButton onClick={scrollToCrowdfunding}>
          Zum Crowdfunding
        </ShadowButton>
      </div>
    </section>
  )
}