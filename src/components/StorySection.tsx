import { useCallback, useRef, forwardRef, useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'

const slides = [
  {
    image: `${import.meta.env.BASE_URL}story/1.png`,
    text: 'In den Tiefen des weiten Ozeans lebte vor langer, langer Zeit die Honu, die alte Meeresschildkröte. Langsam und leise glitt sie durch das Wasser, so still, dass selbst die Wellen innehielten, um ihr zuzusehen.',
    horizontal: 'left' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/23.png`,
    text: 'Die Honu trug auf ihrem Panzer das Symbol von Maluhia (Frieden) das in uns wächst und sich ausbreitet – von Herz zu Herz, wie eine Welle. Man sagt in diesem kraftvollen Zeichen, sei die Erinnerung der Welt verborgen – die Lieder der Ahnen, die Wege der Sterne, das Flüstern der Erde.',
    horizontal: 'right' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/3.png`,
    text: 'Die uralte Schildkröte liebte ihren blauen Planeten sehr: die Felsen, das Wasser, die Pflanzen, die Tiere … Vor allem liebte sie die Menschen, denn aus den Augen ihrer Kinder lächelte die Liebe des unendlichen Weltengeistes.',
    horizontal: 'left' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/4.png`,
    text: 'Doch eines Nachts kam der große Schatten und legte sich in die Herzen der Menschen. Erschrocken sah Honu, dass die Menschen immer unglücklicher wurden, sodass sie ihren Planeten zu hassen begannen und einander mit immer grausameren Kriegen quälten.',
    horizontal: 'right' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/5.png`,
    text: 'Da beschloss die Honu, zu allen Ufern der Erde zu schwimmen und den Menschen das Licht zurückzubringen. Sie schwamm Tag für Tag, Nacht für Nacht, Jahr für Jahr. Sie überquerte Ozeane, sah die Strände vieler Länder, und überall, wo sie vorbeikam, hinterließ sie eine Spur aus Licht.',
    horizontal: 'left' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/6.jpg`,
    text: 'Dieses Licht verband die Küsten miteinander – so wie Kinder ihre Hände halten, wenn sie einen Kreis bilden. Und so wurden die Menschen, die Tiere, die Bäume und die Flüsse wieder miteinander verbunden – durch das sanfte Leuchten der Honu.',
    horizontal: 'right' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/7.jpg`,
    text: 'Manchmal, wenn Stürme tobten und die Wellen hochschlugen, blieb die Honu ganz ruhig. Sie wusste: Frieden entsteht nicht durch Eile, sondern durch Geduld. „Aloha", flüsterte sie in den Wind – und der Wind brachte Liebe und Mitgefühl zu den Herzen der Menschen.',
    horizontal: 'left' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/8.jpg`,
    text: 'Wenn die Honu Inseln erreichte, erinnerte sie die Menschen an Lokahi – die Harmonie, die entsteht, wenn alle zusammenstehen wie die Wellen am Ufer. Und wenn sie weiterzog, hinterließ sie das Geschenk von Pono – das Gleichgewicht, das wie eine Waage den Frieden trägt.',
    horizontal: 'right' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/9.jpg`,
    text: 'Und wenn Herzen schwer wurden, wenn Streit oder Kummer die Menschen trennten, dann schwamm die Honu nah an den Strand. Ihr Atem war tief und warm, und er duftete nach Hoʻoponopono: nach Vergebung, nach Wieder-Heilwerden, nach Zurückfinden zueinander.',
    horizontal: 'left' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/10.jpg`,
    text: 'So wurde die Honu zur Hüterin des Friedens. Sie schwamm von Kontinent zu Kontinent, von Volk zu Volk, und überall, wo sie ankam, öffneten sich die Herzen der Menschen. Sie begannen, ihr eigenes Licht zu entzünden – ein kleines Feuer des Friedens, das in der Dunkelheit leuchtete.',
    horizontal: 'right' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/11.jpg`,
    text: 'Eines Tages, so erzählt man, werden all diese Lichter zusammenfinden – wie die Sterne am Himmel zu einem einzigen großen Ozean. Dann wird die Erde selbst leuchten, so hell wie die Sonne, und jeder Mensch wird wissen: Wir sind verbunden. Wir sind eins.',
    horizontal: 'left' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/12.jpg`,
    text: 'Und noch heute, wenn du am Meer stehst und die Wellen beobachtest, kannst du sie vielleicht sehen – die Honu, wie sie ruhig und still vorbeigleitet. Und wenn du genau hinhörst, dann hörst du vielleicht ihr Lied: Das Lied vom Frieden. Das Lied von Maluhia.',
    horizontal: 'right' as const,
  }
]

// Page component for half of a spread - must use forwardRef for react-pageflip
interface PageProps {
  image: string
  text?: string
  side: 'left' | 'right'
  hasText: boolean
  textSide: 'left' | 'right'
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ image, text, side, hasText, textSide }, ref) => {
  // Show text only on the correct side
  const showText = hasText && side === textSide

  return (
    <div ref={ref} className="page relative w-full h-full overflow-hidden" data-density="hard">
      {/* Background image - positioned to show correct half */}
      <div
        className="absolute inset-0"
        style={{
          width: '200%',
          height: '100%',
          left: side === 'left' ? '0' : '-100%',
        }}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text overlay - only on the designated side */}
      {showText && text && (
        <div
          className={`absolute inset-0 flex items-center ${
            textSide === 'left'
              ? 'justify-start bg-gradient-to-r from-black/50 via-black/30 to-transparent'
              : 'justify-end bg-gradient-to-l from-black/50 via-black/30 to-transparent'
          }`}
        >
          <div className="w-full p-4 sm:p-6 md:p-8">
            <p
              className="text-white text-sm sm:text-base md:text-lg font-serif leading-relaxed drop-shadow-lg"
              style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </div>
      )}

      {/* Inset shadow for book spine effect - moves with the page during animation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: side === 'left'
            ? 'inset -60px 0 60px -30px rgba(0,0,0,0.7)'
            : 'inset 60px 0 60px -30px rgba(0,0,0,0.7)'
        }}
      />
    </div>
  )
})

Page.displayName = 'Page'

// Generate page pairs from slides (each slide becomes left + right page)
const generatePages = () => {
  const pages: Array<{
    image: string
    text?: string
    side: 'left' | 'right'
    hasText: boolean
    textSide: 'left' | 'right'
    slideIndex: number
  }> = []

  slides.forEach((slide, index) => {
    // Left page of the spread
    pages.push({
      image: slide.image,
      text: slide.text,
      side: 'left',
      hasText: true,
      textSide: slide.horizontal,
      slideIndex: index,
    })
    // Right page of the spread
    pages.push({
      image: slide.image,
      text: slide.text,
      side: 'right',
      hasText: true,
      textSide: slide.horizontal,
      slideIndex: index,
    })
  })

  return pages
}

const pages = generatePages()

export default function StorySection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  // Calculate book dimensions based on container
  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 900
      // Mobile: minimal padding, Desktop: more breathing room
      const horizontalPadding = isMobile ? 16 : 80
      const maxWidth = window.innerWidth - horizontalPadding
      // Mobile: use more vertical space, Desktop: leave room for navbar
      const maxHeight = isMobile ? window.innerHeight * 0.95 : window.innerHeight * 0.8

      // 2:1 aspect ratio for double page spread, so each page is 1:1
      let width = maxWidth / 2
      let height = width

      if (height > maxHeight) {
        height = maxHeight
        width = height
      }

      setDimensions({ width: Math.floor(width), height: Math.floor(height) })
      setWindowWidth(window.innerWidth)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('orientationchange', updateDimensions)
    // Also listen for visual viewport changes (more reliable on mobile)
    window.visualViewport?.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('orientationchange', updateDimensions)
      window.visualViewport?.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const goToNext = useCallback(() => {
    if (currentPage >= slides.length - 1) {
      // On last page, scroll to next section
      const nextSection = document.getElementById('story')?.nextElementSibling
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }, [currentPage])

  const goToPrevious = useCallback(() => {
    if (currentPage <= 0) {
      // On first page, scroll to previous section
      const prevSection = document.getElementById('story')?.previousElementSibling
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
    }
  }, [currentPage])

  // Convert slide index to page index (each slide = 2 pages)
  const goToSlide = useCallback((slideIndex: number) => {
    if (bookRef.current) {
      // Each slide consists of 2 pages (left + right), so multiply by 2
      bookRef.current.pageFlip().flip(slideIndex * 2)
    }
  }, [])

  const onFlip = useCallback((e: { data: number }) => {
    // Convert page index back to slide index
    setCurrentPage(Math.floor(e.data / 2))
  }, [])

  useGlobalKeyboardNavigation({
    story: {
      currentSlide: currentPage,
      totalSlides: slides.length,
      goToSlide,
      goToPrevious,
      goToNext
    }
  })

  useEffect(() => {
    const handleResetStory = () => {
      goToSlide(0)
    }
    window.addEventListener('resetStory', handleResetStory as EventListener)
    return () => window.removeEventListener('resetStory', handleResetStory as EventListener)
  }, [goToSlide])

  // Calculate button positions - 16px from book edge, or with min margin from screen edge if not enough space
  const bookWidth = dimensions.width * 2
  const buttonSize = 48
  const minScreenMargin = 8
  const gapFromBook = 16
  const remainingSpace = (windowWidth - bookWidth) / 2
  // Ideal position: gapFromBook pixels from book edge
  // If not enough space, position minScreenMargin from screen edge (button may overlap book)
  const idealButtonDistance = buttonSize + gapFromBook
  const buttonOffset = remainingSpace >= idealButtonDistance + minScreenMargin
    ? gapFromBook
    : remainingSpace - buttonSize - minScreenMargin

  return (
    <section id="story" className="w-full min-h-dvh flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Previous button - positioned dynamically */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#F6CF6B] text-[#564722] shadow-[0_6px_0_0_#E37039] hover:shadow-[0_8px_0_0_#E37039] active:shadow-[0_4px_0_0_#E37039] active:translate-y-[calc(-50%+4px)] transition-all duration-150 flex items-center justify-center"
          style={{ left: `calc(50% - ${bookWidth / 2 + buttonSize + buttonOffset}px)` }}
          aria-label="Vorherige Seite"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="relative" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }}>
            {/* Buchrücken - mittige Linie */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05))',
                boxShadow: '-2px 0 8px rgba(0,0,0,0.1), 2px 0 8px rgba(0,0,0,0.1)'
              }}
            />

            {/* @ts-expect-error - react-pageflip types are incomplete */}
            <HTMLFlipBook
              key={`${dimensions.width}-${dimensions.height}`}
              ref={bookRef}
              width={dimensions.width}
              height={dimensions.height}
              size="fixed"
              minWidth={150}
              maxWidth={1000}
              minHeight={150}
              maxHeight={1000}
              showCover={false}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="book"
              flippingTime={500}
              usePortrait={false}
              startPage={currentPage * 2}
              drawShadow={true}
              maxShadowOpacity={0.5}
              useMouseEvents={true}
              swipeDistance={30}
              clickEventForward={true}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {pages.map((page, index) => (
                <Page
                  key={index}
                  image={page.image}
                  text={page.text}
                  side={page.side}
                  hasText={page.hasText}
                  textSide={page.textSide}
                />
              ))}
            </HTMLFlipBook>

          {/* Page number display - inside book */}
          <div className="absolute cursor-pointer bottom-3 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-xs font-serif">
            {currentPage + 1} / {slides.length}
          </div>
        </div>

        {/* Next button - positioned dynamically */}
        <button
          onClick={goToNext}
          className="absolute cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#F6CF6B] text-[#564722] shadow-[0_6px_0_0_#E37039] hover:shadow-[0_8px_0_0_#E37039] active:shadow-[0_4px_0_0_#E37039] active:translate-y-[calc(-50%+4px)] transition-all duration-150 flex items-center justify-center"
          style={{ right: `calc(50% - ${bookWidth / 2 + buttonSize + buttonOffset}px)` }}
          aria-label="Nächste Seite"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}