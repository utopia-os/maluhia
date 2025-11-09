import { useState, useEffect } from 'react'

export default function CountdownSection() {
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 10,
    minutes: 24,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 pb-32 bg-transparent">
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
          <button className="btn btn-lg btn-neutral">
            Get Notified
          </button>
        </div>
      </div>
    </section>
  )
}