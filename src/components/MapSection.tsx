import { useState } from 'react'

export default function MapSection() {
  const [isMapActive, setIsMapActive] = useState(false)

  return (
    <section className="bg-transparent h-screen p-8 sm:py-12">
      <div className="container mx-auto h-full">
        <div className="w-full h-full rounded-lg overflow-hidden shadow-xl relative">
          <iframe
            src="http://localhost:8080?embedded=true"
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
    </section>
  )
}