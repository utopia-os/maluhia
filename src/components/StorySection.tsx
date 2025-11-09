import { useState } from 'react'

const slides = [
  {
    image: `${import.meta.env.BASE_URL}story/1.jpg`,
    text: 'In the heart of the ocean, where waves meet wisdom...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/2.jpg`,
    text: 'A movement begins with a single wave...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/3.jpg`,
    text: 'Carrying the ancient knowledge of the seas...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/4.jpg`,
    text: 'Where turtles guide us through the depths...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/5.jpg`,
    text: 'Teaching us patience and perseverance...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/6.jpg`,
    text: 'Together we create ripples of change...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/7.jpg`,
    text: 'Building communities across the world...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/8.jpg`,
    text: 'Connected by purpose and vision...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/9.jpg`,
    text: 'Join us on this journey...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/10.jpg`,
    text: 'Discovering new horizons together...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/11.jpg`,
    text: 'Building sustainable futures...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/12.jpg`,
    text: 'United by a shared vision...'
  },
  {
    image: `${import.meta.env.BASE_URL}story/13.jpg`,
    text: 'Maluhia - Movement for a better tomorrow'
  }
]

export default function StorySection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    const prevSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    setCurrentSlide(prevSlide)
    document.getElementById(`slide${prevSlide + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault()
    const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(nextSlide)
    document.getElementById(`slide${nextSlide + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto sm:px-4">
        <div className="flex items-center sm:gap-4 relative">
          {/* Previous button - hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="btn btn-circle shrink-0 hidden sm:flex"
          >
            ❮
          </button>

          {/* Carousel */}
          <div className="carousel w-full h-128 sm:rounded-box grow">
            {slides.map((slide, index) => (
              <div
                key={index}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <div className="w-full relative">
                  <img
                    src={slide.image}
                    className="w-full h-128 object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white text-2xl font-semibold text-center px-8 max-w-3xl">
                      {slide.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next button - hidden on mobile */}
          <button
            onClick={goToNext}
            className="btn btn-circle shrink-0 hidden sm:flex"
          >
            ❯
          </button>

          {/* Mobile navigation buttons - absolute positioned over carousel */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none sm:hidden z-10">
            <button
              onClick={goToPrevious}
              className="btn btn-circle pointer-events-auto"
            >
              ❮
            </button>
            <button
              onClick={goToNext}
              className="btn btn-circle pointer-events-auto"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}