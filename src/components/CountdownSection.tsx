import { useState, useEffect, useMemo } from 'react'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'

export default function CountdownSection() {
  // Global keyboard navigation
  useGlobalKeyboardNavigation({})

  // Target date: December 15th, 2025 at 9:00 AM
  const targetDate = useMemo(() => new Date('2025-12-15T09:00:00'), [])

  const calculateTimeLeft = () => {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const [countdown, setCountdown] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="py-8 px-24 h-dvh bg-transparent flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-white">
          Crowdfunding starts in
        </h2>
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <span className="countdown font-mono text-4xl sm:text-6xl text-white">
              <span style={{ '--value': countdown.days } as React.CSSProperties} aria-live="polite">
                {countdown.days}
              </span>
            </span>
            <div className="text-white text-xl mt-2">days</div>
          </div>
          <div className="text-center">
            <span className="countdown font-mono text-4xl sm:text-6xl text-white">
              <span style={{ '--value': countdown.hours } as React.CSSProperties} aria-live="polite">
                {countdown.hours}
              </span>
            </span>
            <div className="text-white text-xl mt-2">hours</div>
          </div>
          <div className="text-center">
            <span className="countdown font-mono text-4xl sm:text-6xl text-white">
              <span style={{ '--value': countdown.minutes } as React.CSSProperties} aria-live="polite">
                {countdown.minutes}
              </span>
            </span>
            <div className="text-white text-xl mt-2">min</div>
          </div>
          <div className="text-center">
            <span className="countdown font-mono text-4xl sm:text-6xl text-white">
              <span style={{ '--value': countdown.seconds } as React.CSSProperties} aria-live="polite">
                {countdown.seconds}
              </span>
            </span>
            <div className="text-white text-xl mt-2">sec</div>
          </div>
        </div>
        <div className="text-center mt-8">
        </div>
      </div>
    </section>
  )
}