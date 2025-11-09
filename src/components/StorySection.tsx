import { useState } from 'react'

const slides = [
  {
    image: `${import.meta.env.BASE_URL}story/1.png`,
    text: 'In den Tiefen des weiten Ozeans lebte vor langer, langer Zeit die Honu, die alte Meeresschildkröte. Langsam und leise glitt sie durch das Wasser, so still, dass selbst die Wellen innehielten, um ihr zuzusehen.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/2.jpg`,
    text: 'Die Honu trug auf ihrem Panzer das Symbol von Maluhiia (Fieden) das in uns wächst und sich ausbreitet – von Herz zu Herz, wie eine Welle.", Man sagt in diesem kraftvollen Zeichen, sei die Erinnerung der Welt verborgen – die Lieder der Ahnen, die Wege der Sterne, das Flüstern der Erde.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/3.jpg`,
    text: 'Die uralte Schildkröte liebte ihren blauen Planeten sehr: die Felsen, das Wasser, die Pflanzen, die Tiere… Vor allem liebte sie die Menschen, denn aus den Augen ihrer Kinder lächelte die Liebe des unendlichen Weltengeistes.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/4.jpg`,
    text: 'Doch eines Nachts kam der große Schatten und legte sich in die Herzen der Menschen. Erschrocken sah Honu, dass die Menschen immer unglücklicher wurden, sodass sie ihren Planeten zu hassen begannen und einander mit immer grausameren Kriegen quälten.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/5.jpg`,
    text: 'Da beschloss die Honu, zu allen Ufern der Erde zu schwimmen und den Menschen das Licht zurückzubringen. Sie schwamm Tag für Tag, Nacht für Nacht, Jahr für Jahr. Sie überquerte Ozeane, sah die Strände vieler Länder, und überall, wo sie vorbeikam, hinterließ sie eine Spur aus Licht.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/6.jpg`,
    text: 'Dieses Licht verband die Küsten miteinander – so wie Kinder ihre Hände halten, wenn sie einen Kreis bilden. Und so wurden die Menschen, die Tiere, die Bäume und die Flüsse wieder miteinander verbunden – durch das sanfte Leuchten der Honu.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/7.jpg`,
    text: 'Manchmal, wenn Stürme tobten und die Wellen hochschlugen, blieb die Honu ganz ruhig. Sie wusste: Frieden entsteht nicht durch Eile, sondern durch Geduld. „Aloha", flüsterte sie in den Wind – und der Wind brachte Liebe und Mitgefühl zu den Herzen der Menschen.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/8.jpg`,
    text: 'Wenn die Honu Inseln erreichte, erinnerte sie die Menschen an Lokahi – die Harmonie, die entsteht, wenn alle zusammenstehen wie die Wellen am Ufer. Und wenn sie weiterzog, hinterließ sie das Geschenk von Pono – das Gleichgewicht, das wie eine Waage den Frieden trägt.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/9.jpg`,
    text: 'Und wenn Herzen schwer wurden, wenn Streit oder Kummer die Menschen trennten, dann schwamm die Honu nah an den Strand. Ihr Atem war tief und warm, und er duftete nach Hoʻoponopono: nach Vergebung, nach Wieder-Heilwerden, nach Zurückfinden zueinander.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/10.jpg`,
    text: 'So wurde die Honu zur Hüterin des Friedens. Sie schwamm von Kontinent zu Kontinent, von Volk zu Volk, und überall, wo sie ankam, öffneten sich die Herzen der Menschen. Sie begannen, ihr eigenes Licht zu entzünden – ein kleines Feuer des Friedens, das in der Dunkelheit leuchtete.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/11.jpg`,
    text: 'Eines Tages, so erzählt man, werden all diese Lichter zusammenfinden – wie die Sterne am Himmel zu einem einzigen großen Ozean. Dann wird die Erde selbst leuchten, so hell wie die Sonne, und jeder Mensch wird wissen: Wir sind verbunden. Wir sind eins.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/12.jpg`,
    text: 'Und noch heute, wenn du am Meer stehst und die Wellen beobachtest, kannst du sie vielleicht sehen – die Honu, wie sie ruhig und still vorbeigleitet. Und wenn du genau hinhörst, dann hörst du vielleicht ihr Lied: Das Lied vom Frieden. Das Lied von Maluhia.'
  },
  {
    image: `${import.meta.env.BASE_URL}story/13.jpg`,
    text: 'Maluhia - Das Lied vom Frieden'
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
    <section className="w-full h-screen bg-transparent relative">
      <div className="w-full h-full">
        <div className="flex items-center h-full relative">
          {/* Previous button - hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="btn shrink-0 hidden sm:flex absolute left-4 bottom-4 z-20 min-w-20"
          >
            Zurück
          </button>

          {/* Carousel */}
          <div className="carousel w-full h-screen">
            {slides.map((slide, index) => (
              <div
                key={index}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <div className="w-full relative">
                  <img
                    src={slide.image}
                    className="w-full h-screen object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                  <div className={`absolute inset-0 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <p className="text-white text-2xl font-semibold px-8 max-w-xl">
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
            className="btn btn-primary shrink-0 hidden sm:flex absolute right-4 bottom-4 z-20 min-w-20"
          >
            Vor
          </button>

          {/* Mobile navigation buttons - absolute positioned over carousel */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 sm:hidden z-10">
            <button
              onClick={goToPrevious}
              className="btn min-w-20"
            >
              Zurück
            </button>
            <button
              onClick={goToNext}
              className="btn btn-primary  min-w-20"
            >
              Vor
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}