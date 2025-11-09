import { useState, useEffect, useCallback } from 'react'
import ShadowButton from './ShadowButton'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'

const slides = [
  {
    image: `${import.meta.env.BASE_URL}story/1.png`,
    text: 'In den Tiefen des weiten Ozeans lebte vor langer, langer Zeit die Honu, die alte Meeresschildkröte. Langsam und leise glitt sie durch das Wasser, so still, dass selbst die Wellen innehielten, um ihr zuzusehen.',
    horizontal: 'left', // 'left' | 'center' | 'right'
    vertical: 'bottom' // 'top' | 'center' | 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/23.png`,
    text: 'Die Honu trug auf ihrem Panzer das Symbol von Maluhiia (Fieden) das in uns wächst und sich ausbreitet – von Herz zu Herz, wie eine Welle. Man sagt in diesem kraftvollen Zeichen, sei die Erinnerung der Welt verborgen – die Lieder der Ahnen, die Wege der Sterne, das Flüstern der Erde.',
    horizontal: 'right',
    vertical: 'top'
  },
  {
    image: `${import.meta.env.BASE_URL}story/3.png`,
    text: 'Die uralte Schildkröte liebte ihren blauen Planeten sehr: die Felsen, das Wasser, die Pflanzen, die Tiere … Vor allem liebte sie die Menschen, denn aus den Augen ihrer Kinder lächelte die Liebe des unendlichen Weltengeistes.',
    horizontal: 'left',
    vertical: 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/4.png`,
    text: 'Doch eines Nachts kam der große Schatten und legte sich in die Herzen der Menschen. Erschrocken sah Honu, dass die Menschen immer unglücklicher wurden, sodass sie ihren Planeten zu hassen begannen und einander mit immer grausameren Kriegen quälten.',
    horizontal: 'right',
    vertical: 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/5.png`,
    text: 'Da beschloss die Honu, zu allen Ufern der Erde zu schwimmen und den Menschen das Licht zurückzubringen. Sie schwamm Tag für Tag, Nacht für Nacht, Jahr für Jahr. Sie überquerte Ozeane, sah die Strände vieler Länder, und überall, wo sie vorbeikam, hinterließ sie eine Spur aus Licht.',
    horizontal: 'left',
    vertical: 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/6.jpg`,
    text: 'Dieses Licht verband die Küsten miteinander – so wie Kinder ihre Hände halten, wenn sie einen Kreis bilden. Und so wurden die Menschen, die Tiere, die Bäume und die Flüsse wieder miteinander verbunden – durch das sanfte Leuchten der Honu.',
    horizontal: 'right',
    vertical: 'top'
  },
  {
    image: `${import.meta.env.BASE_URL}story/7.jpg`,
    text: 'Manchmal, wenn Stürme tobten und die Wellen hochschlugen, blieb die Honu ganz ruhig. Sie wusste: Frieden entsteht nicht durch Eile, sondern durch Geduld. „Aloha", flüsterte sie in den Wind – und der Wind brachte Liebe und Mitgefühl zu den Herzen der Menschen.',
    horizontal: 'left',
    vertical: 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/8.jpg`,
    text: 'Wenn die Honu Inseln erreichte, erinnerte sie die Menschen an Lokahi – die Harmonie, die entsteht, wenn alle zusammenstehen wie die Wellen am Ufer. Und wenn sie weiterzog, hinterließ sie das Geschenk von Pono – das Gleichgewicht, das wie eine Waage den Frieden trägt.',
    horizontal: 'right',
    vertical: 'top'
  },
  {
    image: `${import.meta.env.BASE_URL}story/9.jpg`,
    text: 'Und wenn Herzen schwer wurden, wenn Streit oder Kummer die Menschen trennten, dann schwamm die Honu nah an den Strand. Ihr Atem war tief und warm, und er duftete nach Hoʻoponopono: nach Vergebung, nach Wieder-Heilwerden, nach Zurückfinden zueinander.',
    horizontal: 'left',
    vertical: 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/10.jpg`,
    text: 'So wurde die Honu zur Hüterin des Friedens. Sie schwamm von Kontinent zu Kontinent, von Volk zu Volk, und überall, wo sie ankam, öffneten sich die Herzen der Menschen. Sie begannen, ihr eigenes Licht zu entzünden – ein kleines Feuer des Friedens, das in der Dunkelheit leuchtete.',
    horizontal: 'right',
    vertical: 'top'
  },
  {
    image: `${import.meta.env.BASE_URL}story/11.jpg`,
    text: 'Eines Tages, so erzählt man, werden all diese Lichter zusammenfinden – wie die Sterne am Himmel zu einem einzigen großen Ozean. Dann wird die Erde selbst leuchten, so hell wie die Sonne, und jeder Mensch wird wissen: Wir sind verbunden. Wir sind eins.',
    horizontal: 'left',
    vertical: 'bottom'
  },
  {
    image: `${import.meta.env.BASE_URL}story/12.jpg`,
    text: 'Und noch heute, wenn du am Meer stehst und die Wellen beobachtest, kannst du sie vielleicht sehen – die Honu, wie sie ruhig und still vorbeigleitet. Und wenn du genau hinhörst, dann hörst du vielleicht ihr Lied: Das Lied vom Frieden. Das Lied von Maluhia.',
    horizontal: 'right',
    vertical: 'top'
  },
  {
    image: `${import.meta.env.BASE_URL}story/13.jpg`,
    text: 'Maluhia - Das Lied vom Frieden',
    horizontal: 'center',
    vertical: 'center'
  }
]

export default function StorySection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Synchronize currentSlide with actual scroll position
  useEffect(() => {
    const carousel = document.querySelector('.carousel')
    if (!carousel) return

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft
      const slideWidth = carousel.clientWidth
      const newSlide = Math.round(scrollLeft / slideWidth)
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
        setCurrentSlide(newSlide)
      }
    }

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [currentSlide])

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault()
    if (currentSlide === 0) {
      // Bei der ersten Slide zur Hero-Sektion scrollen
      const heroSection = document.getElementById('home')
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      const prevSlide = currentSlide - 1
      setCurrentSlide(prevSlide)
      document.getElementById(`slide${prevSlide + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }, [currentSlide])

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault()
    if (currentSlide === slides.length - 1) {
      // Bei der letzten Slide zur nächsten Sektion scrollen
      const joinSection = document.getElementById('join')
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      const nextSlide = currentSlide + 1
      setCurrentSlide(nextSlide)
      document.getElementById(`slide${nextSlide + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }, [currentSlide])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    document.getElementById(`slide${index + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  // Global keyboard navigation
  useGlobalKeyboardNavigation({
    story: {
      currentSlide,
      totalSlides: slides.length,
      goToSlide,
      goToPrevious,
      goToNext
    }
  })

  // Listen for navbar clicks to reset to first slide
  useEffect(() => {
    const handleResetStory = () => {
      goToSlide(0)
    }

    window.addEventListener('resetStory', handleResetStory as EventListener)
    return () => window.removeEventListener('resetStory', handleResetStory as EventListener)
  }, [goToSlide])

  return (
    <section className="bg-black w-full h-dvh relative">
      <div className="w-full h-full">
        <div className="flex items-center h-full relative">
          {/* Previous button - always visible on desktop */}
          <ShadowButton
            onClick={goToPrevious}
            className="shrink-0 hidden sm:flex absolute left-8 bottom-8 z-20 min-w-20"
          >
            Zurück
          </ShadowButton>

          {/* Carousel */}
          <div className="carousel w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <div className="w-full relative">
                  <img
                    src={slide.image}
                    className="w-full h-full object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                  <div className={`absolute inset-0 flex
                    ${slide.horizontal === 'left' ? 'justify-start' : slide.horizontal === 'right' ? 'justify-end' : 'justify-center'}
                    ${slide.vertical === 'top' ? 'items-start' : slide.vertical === 'bottom' ? 'items-end' : 'items-center'}
                  `}>
                    <p
                      className={`text-white text-2xl font-semibold px-8 max-w-xl
                        ${slide.vertical === 'bottom' ? 'pb-28 sm:pb-28' : slide.vertical === 'top' ? 'pt-28 sm:pt-28' : ''}
                        ${slide.horizontal === 'left' ? 'text-left' : slide.horizontal === 'right' ? 'text-left' : 'text-center'}
                      `}
                      style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}
                      dangerouslySetInnerHTML={{ __html: slide.text }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next button - hidden on mobile */}  
          <ShadowButton
            onClick={goToNext}
            className="shrink-0 hidden sm:flex absolute right-8 bottom-8 z-20 min-w-20"
          >
           Weiter
          </ShadowButton>

          {/* Mobile navigation buttons - absolute positioned over carousel */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 sm:hidden z-10">
            <ShadowButton
              onClick={goToPrevious}
              className="min-w-20"
            >
              Zurück
            </ShadowButton>
            <ShadowButton
              onClick={goToNext}
              className="min-w-20"
            >
              Weiter
            </ShadowButton>
          </div>
        </div>
      </div>
    </section>
  )
}