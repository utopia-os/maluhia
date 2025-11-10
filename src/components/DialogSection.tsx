import { useState, useEffect, useCallback } from 'react'
import ShadowButton from './ShadowButton'
import { useGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation'

type InputType = 'single' | 'multi' | 'none'

interface DialogStep {
  question: string | ((userName: string) => string)
  placeholder?: string
  inputType: InputType
}

const dialogSteps: DialogStep[] = [
  {
    question: "Aloha, Ich bin die Honu. Wie ist dein Name?",
    placeholder: "Dein Name...",
    inputType: 'single'
  },
  {
    question: (userName) => `Lieber ${userName}, Maluhia bedeutet in der hawaiianischen Kultur "Frieden" und "Harmonie". Meine Aufgabe ist es, Maluhia wieder in die Herzen der Menschen zu bringen.`,
    inputType: 'none'
  },
  {
    question: (userName) => `Frieden kommt aus den Herzen der Menschen. Was möchte uns dein Herz mitteilen, lieber ${userName}?`,
    placeholder: "Was dein Herz mitteilen möchte...",
    inputType: 'multi'
  },
  {
    question: (userName) => `Danke, lieber ${userName}. Jetzt bist du ein Teil der Maluhia Friedenskette. Setze dein Licht auf die Karte und leuchte für den Frieden.`,
    placeholder: "Deine Friedensbotschaft für die Welt...",
    inputType: 'multi'
  }
]

export default function DialogSection() {
  const [dialogStep, setDialogStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(dialogSteps.length).fill(''))
  const [currentAnswer, setCurrentAnswer] = useState('')

  const handleNext = () => {
    const newAnswers = [...userAnswers]
    newAnswers[dialogStep] = currentAnswer
    setUserAnswers(newAnswers)

    if (dialogStep < dialogSteps.length - 1) {
      setDialogStep(dialogStep + 1)
      setCurrentAnswer(newAnswers[dialogStep + 1] || '')
    } else {
      // Bei der letzten Frage zur nächsten Sektion scrollen
      const mapSection = document.getElementById('map')
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleBack = () => {
    if (dialogStep > 0) {
      const newAnswers = [...userAnswers]
      newAnswers[dialogStep] = currentAnswer
      setUserAnswers(newAnswers)

      setDialogStep(dialogStep - 1)
      setCurrentAnswer(userAnswers[dialogStep - 1] || '')
    } else {
      // Bei Step 1 zur vorherigen Sektion scrollen
      const storySection = document.getElementById('story')
      if (storySection) {
        storySection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleNextWrapper = () => {
    handleNext()
  }

  const goToStep = useCallback((stepIndex: number) => {
    // Save current answer before switching
    const newAnswers = [...userAnswers]
    newAnswers[dialogStep] = currentAnswer
    setUserAnswers(newAnswers)

    // Switch to new step
    setDialogStep(stepIndex)
    setCurrentAnswer(newAnswers[stepIndex] || '')
  }, [dialogStep, currentAnswer, userAnswers])

  const isLastQuestion = dialogStep === dialogSteps.length - 1
  const allAnswered = userAnswers.every(answer => answer.trim() !== '')
  const currentStep = dialogSteps[dialogStep]

  // Get the current question with user's name inserted
  const userName = userAnswers[0] || 'Freund'
  const currentQuestion = typeof currentStep.question === 'function'
    ? currentStep.question(userName)
    : currentStep.question

  // Global keyboard navigation
  useGlobalKeyboardNavigation({
    dialog: {
      currentStep: dialogStep,
      totalSteps: dialogSteps.length,
      goToPrevious: handleBack,
      goToNext: handleNextWrapper,
      goToStep
    }
  })

  // Listen for navbar clicks to reset to first question
  useEffect(() => {
    const handleResetDialog = () => {
      goToStep(0)
    }

    window.addEventListener('resetDialog', handleResetDialog as EventListener)
    return () => window.removeEventListener('resetDialog', handleResetDialog as EventListener)
  }, [goToStep])

  return (
    <section className="dialog-section py-8 sm:p-16 h-dvh bg-transparent flex items-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card p-0! bg-transparent">
          <div className="card-body">
            {/* Show completion message when all questions are answered */}
            {isLastQuestion && allAnswered && currentAnswer.trim() ? (
              <div className="chat chat-start" style={{ alignItems: 'start' }}>
                <div className="chat-image avatar">
                  <div className="w-32">
                    <img
                      alt="Turtle guide"
                      src={`${import.meta.env.BASE_URL}turtle.png`}
                    />
                  </div>
                </div>
                <div className="chat-bubble bg-[#F6CF6B] text-[#564722] text-lg">
                Deine Aufgabe ist es nun, die ganze Welt zu erleuchten –
                also teile die Vision von Maluhia mit deinen Liebsten. 💖
                </div>
              </div>
            ) : (
              <>
                {/* Turtle's question */}
                <div className="chat chat-start" style={{ alignItems: 'start' }}>
                  <div className="chat-image avatar">
                    <div className="w-32">
                      <img
                        alt="Turtle guide"
                        src={`${import.meta.env.BASE_URL}turtle.png`}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#F6CF6B] text-[#564722] text-lg">
                    {currentQuestion}
                  </div>
                </div>

                {/* Input for current answer */}
                {currentStep.inputType === 'single' && (
                  <div className="form-control mt-6">
                    <input
                      type="text"
                      placeholder={currentStep.placeholder}
                      className="input input-bordered input-lg w-full"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                  </div>
                )}

                {currentStep.inputType === 'multi' && (
                  <div className="form-control mt-6">
                    <textarea
                      placeholder={currentStep.placeholder}
                      className="textarea textarea-bordered textarea-lg w-full min-h-32"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-6">
                  <ShadowButton onClick={handleBack}>
                    Zurück
                  </ShadowButton>

                  <div className="flex gap-2">
                    {dialogSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                          index === dialogStep
                            ? 'bg-[#E37039]'
                            : userAnswers[index]?.trim()
                            ? 'bg-success'
                            : 'bg-base-300'
                        }`}
                      />
                    ))}
                  </div>

                  <ShadowButton onClick={handleNext}>
                    {isLastQuestion ? 'Fertig' : (currentAnswer.trim() ? 'Weiter' : 'Skip')}
                  </ShadowButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}