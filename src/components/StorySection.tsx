import { useCallback, useRef, forwardRef, useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'

const slides = [
  {
    image: `${import.meta.env.BASE_URL}story/1-1.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/1.mp3`,
    text: 'In den Tiefen des weiten Ozeans lebte vor langer, langer Zeit die Honu, die alte Meeresschildkröte. Langsam und leise glitt sie durch das Wasser, so still, dass selbst die Wellen innehielten, um ihr zuzusehen.',
    horizontal: 'left' as const,
    vertical: 'top' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/23.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/2.mp3`,
    text: 'Die Honu trug auf ihrem Panzer das Symbol von Maluhia (Frieden) das in uns wächst und sich ausbreitet – von Herz zu Herz, wie eine Welle. Man sagt in diesem kraftvollen Zeichen, sei die Erinnerung der Welt verborgen – die Lieder der Ahnen, die Wege der Sterne, das Flüstern der Erde.',
    horizontal: 'right' as const,
    vertical: 'bottom' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/3-1.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/3.mp3`,
    text: 'Die uralte Schildkröte liebte ihren blauen Planeten sehr: die Felsen, das Wasser, die Pflanzen, die Tiere … Vor allem liebte sie die Menschen, denn aus den Augen ihrer Kinder lächelte die Liebe des unendlichen Weltengeistes.',
    horizontal: 'left' as const,
    vertical: 'top' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/4.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/4.mp3`,
    text: 'Doch eines Nachts kam der große Schatten und legte sich in die Herzen der Menschen. Erschrocken sah Honu, dass die Menschen immer unglücklicher wurden, sodass sie ihren Planeten zu hassen begannen und einander mit immer grausameren Kriegen quälten.',
    horizontal: 'right' as const,
    vertical: 'bottom' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/5.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/5.mp3`,
    text: 'Da beschloss die Honu, zu allen Ufern der Erde zu schwimmen und den Menschen das Licht zurückzubringen.',
    horizontal: 'left' as const,
    vertical: 'center' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/5-1.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/6.mp3`,
    text: 'Sie schwamm Tag für Tag, Nacht für Nacht, Jahr für Jahr. Sie überquerte Ozeane, sah die Strände vieler Länder, und überall, wo sie vorbeikam, hinterließ sie eine Spur aus Licht. Dieses Licht verband die Küsten miteinander – so wie Kinder ihre Hände halten, wenn sie einen Kreis bilden. Und so wurden die Menschen, die Tiere, die Bäume und die Flüsse wieder miteinander verbunden – durch das sanfte Leuchten der Honu.',
    horizontal: 'left' as const,
    vertical: 'center' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/9.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/7.mp3`,
    text: 'Manchmal, wenn Stürme tobten und die Wellen hochschlugen, blieb die Honu ganz ruhig. Sie wusste: Frieden entsteht nicht durch Eile, sondern durch Geduld. „Aloha", flüsterte sie in den Wind – und der Wind brachte Liebe und Mitgefühl zu den Herzen der Menschen.',
    horizontal: 'right' as const,
    vertical: 'center' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/8.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/8.mp3`,
    text: 'Wenn die Honu Inseln erreichte, erinnerte sie die Menschen an Lokahi – die Harmonie, die entsteht, wenn alle zusammenstehen wie die Wellen am Ufer. Und wenn sie weiterzog, hinterließ sie das Geschenk von Pono – das Gleichgewicht, das wie eine Waage den Frieden trägt.',
    horizontal: 'right' as const,
    vertical: 'center' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/9.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/9.mp3`,
    text: 'Und wenn Herzen schwer wurden, wenn Streit oder Kummer die Menschen trennten, dann schwamm die Honu nah an den Strand. Ihr Atem war tief und warm, und er duftete nach Hoʻoponopono: nach Vergebung, nach Wieder-Heilwerden, nach Zurückfinden zueinander.',
    horizontal: 'left' as const,
    vertical: 'center' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/10.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/10.mp3`,
    text: 'So wurde die Honu zur Hüterin des Friedens. Sie schwamm von Kontinent zu Kontinent, von Volk zu Volk, und überall, wo sie ankam, öffneten sich die Herzen der Menschen.',
    horizontal: 'left' as const,
    vertical: 'center' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/10-1.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/11.mp3`,
    text: 'Sie begannen, ihr eigenes Licht zu entzünden – ein kleines Feuer des Friedens, das in der Dunkelheit leuchtete.',
    horizontal: 'right' as const,
    vertical: 'top' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/16.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/12.mp3`,
    text: 'Eines Tages, so erzählt man, werden all diese Lichter zusammenfinden – wie die Sterne am Himmel zu einem einzigen großen Ozean. Dann wird die Erde selbst leuchten, so hell wie die Sonne, und jeder Mensch wird wissen: Wir sind verbunden. Wir sind eins.',
    horizontal: 'left' as const,
    vertical: 'top' as const,
  },
  {
    image: `${import.meta.env.BASE_URL}story/17.webp`,
    audio: `${import.meta.env.BASE_URL}story/audio/13.mp3`,
    text: 'Und noch heute, wenn du am Meer stehst und die Wellen beobachtest, kannst du sie vielleicht sehen – die Honu, wie sie ruhig und still vorbeigleitet. Und wenn du genau hinhörst, dann hörst du vielleicht ihr Lied: Das Lied vom Frieden. Das Lied von Maluhia.',
    horizontal: 'left' as const,
    vertical: 'top' as const,
  }
]

// Page component for half of a spread - must use forwardRef for react-pageflip
interface PageProps {
  image: string
  text?: string
  side: 'left' | 'right'
  hasText: boolean
  textSide: 'left' | 'right'
  textVertical: 'top' | 'center' | 'bottom'
  isFirstSlide?: boolean
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ image, text, side, hasText, textSide, textVertical, isFirstSlide }, ref) => {
  // Show text only on the correct side
  const showText = hasText && side === textSide

  // Vertical alignment classes
  const verticalAlignClass = {
    top: 'items-start pt-4 sm:pt-6 md:pt-8 lg:pt-12',
    center: 'items-center',
    bottom: 'items-end pb-4 sm:pb-6 md:pb-8 lg:pb-12',
  }[textVertical]

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
          loading={isFirstSlide ? 'eager' : 'lazy'}
          decoding={isFirstSlide ? 'sync' : 'async'}
          fetchPriority={isFirstSlide ? 'high' : 'low'}
        />
      </div>

      {/* Text overlay - only on the designated side */}
      {showText && text && (
        <div
          className={`absolute inset-0 flex ${verticalAlignClass} ${
            textSide === 'left'
              ? 'justify-start bg-linear-to-r from-black/50 via-black/30 to-transparent'
              : 'justify-end bg-linear-to-l from-black/50 via-black/30 to-transparent'
          }`}
        >
          <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8">
            <p
              className="text-white text-xs sm:text-sm md:text-base lg:text-xl xl:text-3xl leading-relaxed drop-shadow-lg"
              style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', fontFamily: '"Caveat Brush", cursive' }}
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
    textVertical: 'top' | 'center' | 'bottom'
    slideIndex: number
    isFirstSlide: boolean
  }> = []

  slides.forEach((slide, index) => {
    const isFirstSlide = index === 0
    // Left page of the spread
    pages.push({
      image: slide.image,
      text: slide.text,
      side: 'left',
      hasText: true,
      textSide: slide.horizontal,
      textVertical: slide.vertical,
      slideIndex: index,
      isFirstSlide,
    })
    // Right page of the spread
    pages.push({
      image: slide.image,
      text: slide.text,
      side: 'right',
      hasText: true,
      textSide: slide.horizontal,
      textVertical: slide.vertical,
      slideIndex: index,
      isFirstSlide,
    })
  })

  return pages
}

const pages = generatePages()

export default function StorySection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const exitFullscreenTargetRef = useRef<'prev' | 'next' | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [isAudioLoading, setIsAudioLoading] = useState(false)

  // Stop any currently playing audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setAudioProgress(0)
    setIsAudioLoading(false)
  }, [])

  // Play audio for a specific slide (always stops current audio first)
  const playAudioForSlide = useCallback((slideIndex: number) => {
    // Only play if playing is enabled
    if (!isPlaying) {
      stopAudio()
      return
    }

    const slide = slides[slideIndex]
    if (!slide?.audio) {
      stopAudio()
      return
    }

    // Set loading state BEFORE stopping old audio to prevent flash of pause button
    setIsAudioLoading(true)

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setAudioProgress(0)

    // Create and play new audio
    audioRef.current = new Audio(slide.audio)

    // When audio actually starts playing, hide loading
    audioRef.current.onplaying = () => {
      setIsAudioLoading(false)
    }

    // Auto-advance to next page when audio ends
    audioRef.current.onended = () => {
      if (slideIndex < slides.length - 1 && bookRef.current) {
        bookRef.current.pageFlip().flipNext()
      } else {
        // Last page finished - stop playing
        setIsPlaying(false)
      }
    }

    // Handle errors
    audioRef.current.onerror = () => {
      setIsAudioLoading(false)
    }

    audioRef.current.play().catch(() => {
      setIsAudioLoading(false)
    })
  }, [isPlaying, stopAudio])

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
      setIsAudioLoading(false)
    } else {
      // Play
      setIsPlaying(true)
      // If there's a paused audio, resume it
      if (audioRef.current && audioRef.current.paused && audioRef.current.currentTime > 0) {
        audioRef.current.play().catch(() => {})
      } else {
        // Start fresh for current page
        const slide = slides[currentPage]
        if (slide?.audio) {
          stopAudio()
          setIsAudioLoading(true)
          audioRef.current = new Audio(slide.audio)
          audioRef.current.onplaying = () => {
            setIsAudioLoading(false)
          }
          audioRef.current.onended = () => {
            if (currentPage < slides.length - 1 && bookRef.current) {
              bookRef.current.pageFlip().flipNext()
            } else {
              setIsPlaying(false)
            }
          }
          audioRef.current.onerror = () => {
            setIsAudioLoading(false)
          }
          audioRef.current.play().catch(() => {
            setIsAudioLoading(false)
          })
        }
      }
    }
  }, [isPlaying, currentPage, stopAudio])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Track audio progress
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
        setAudioProgress(progress)
      }
    }

    const interval = setInterval(updateProgress, 50)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Track fullscreen state and scroll back when exiting
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement
      setIsFullscreen(isNowFullscreen)

      if (!isNowFullscreen) {
        // Check if we need to navigate to a different section
        const target = exitFullscreenTargetRef.current
        exitFullscreenTargetRef.current = null

        if (target === 'next') {
          const nextSection = document.getElementById('story')?.nextElementSibling
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' })
            return
          }
        } else if (target === 'prev') {
          const prevSection = document.getElementById('story')?.previousElementSibling
          if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' })
            return
          }
        }

        // Default: scroll back to story section
        const section = document.getElementById('story')
        if (section) {
          section.scrollIntoView({ behavior: 'instant' })
        }
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

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
      // On last page, exit fullscreen first if active, then scroll to next section
      if (document.fullscreenElement) {
        exitFullscreenTargetRef.current = 'next'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(screen.orientation as any)?.unlock?.()
        document.exitFullscreen()
      } else {
        const nextSection = document.getElementById('story')?.nextElementSibling
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }, [currentPage])

  const goToPrevious = useCallback(() => {
    if (currentPage <= 0) {
      // On first page, exit fullscreen first if active, then scroll to previous section
      if (document.fullscreenElement) {
        exitFullscreenTargetRef.current = 'prev'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(screen.orientation as any)?.unlock?.()
        document.exitFullscreen()
      } else {
        const prevSection = document.getElementById('story')?.previousElementSibling
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' })
        }
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
    const newSlideIndex = Math.floor(e.data / 2)
    setCurrentPage(newSlideIndex)
    playAudioForSlide(newSlideIndex)
  }, [playAudioForSlide])

  useGlobalKeyboardNavigation({
    story: {
      currentSlide: currentPage,
      totalSlides: slides.length,
      goToSlide,
      goToPrevious,
      goToNext
    }
  })

  // Spacebar to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle spacebar when story section is visible
      if (e.code === 'Space' || e.key === ' ') {
        const storySection = document.getElementById('story')
        if (storySection) {
          const rect = storySection.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0
          if (isVisible) {
            e.preventDefault()
            togglePlayPause()
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlayPause])

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
          className="absolute cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#F6CF6B] text-[#564722] shadow-[0_6px_0_0_#E37039] hover:shadow-[0_8px_0_0_#E37039] active:shadow-[0_4px_0_0_#E37039] active:translate-y-[calc(-50%+4px)] transition-all duration-150 flex items-center justify-center"
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
              showPageCorners={false}
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
                  textVertical={page.textVertical}
                  isFirstSlide={page.isFirstSlide}
                />
              ))}
            </HTMLFlipBook>

          {/* Play/Pause button with progress indicator - bottom left */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-3 left-3 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:bg-black/60 transition-colors flex items-center justify-center cursor-pointer"
            aria-label={isAudioLoading ? 'Lädt...' : isPlaying ? 'Pause' : 'Abspielen'}
          >
            {/* Progress ring */}
            <svg className="absolute w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={2 * Math.PI * 22 * (1 - audioProgress / 100)}
                className="transition-[stroke-dashoffset] duration-100"
              />
            </svg>
            {/* Loading spinner / Play / Pause icon */}
            {isAudioLoading ? (
              <span className="loading loading-spinner loading-sm relative z-10" />
            ) : isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Page number display - center bottom */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-xs font-serif">
            {currentPage + 1} / {slides.length}
          </div>

          {/* Fullscreen button - bottom right */}
          <button
            onClick={async () => {
              const section = document.getElementById('story')
              if (document.fullscreenElement) {
                // Exit fullscreen and unlock orientation
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (screen.orientation as any)?.unlock?.()
                document.exitFullscreen()
              } else {
                // Enter fullscreen and try to force landscape on mobile
                await section?.requestFullscreen()
                try {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  await (screen.orientation as any)?.lock?.('landscape')
                } catch {
                  // Orientation lock not supported or not allowed
                }
              }
            }}
            className="absolute bottom-3 right-3 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:bg-black/60 transition-colors flex items-center justify-center cursor-pointer"
            aria-label={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
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