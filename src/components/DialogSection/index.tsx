import { useState, useCallback, useRef, useEffect } from 'react'
import { useGlobalKeyboardNavigation } from '../../hooks/useGlobalKeyboardNavigation'
import { dialogSteps, INPUT_DELAY } from './constants'
import { useStepTransition } from './useStepTransition'
import { TurtleQuestion } from './TurtleQuestion'
import { InputField } from './InputField'
import { Navigation } from './Navigation'
import ShadowButton from '../ShadowButton'

export default function DialogSection() {
  const [dialogStep, setDialogStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(dialogSteps.length).fill(''))
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [hasEnteredSection, setHasEnteredSection] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { transitionToStep } = useStepTransition({
    setIsTransitioning,
    setShowInput,
    setDialogStep,
    setCurrentAnswer,
    inputRef,
    textareaRef
  })

  const currentStep = dialogSteps[dialogStep]
  const isLastQuestion = dialogStep === dialogSteps.length - 1

  // Get the current question with user's name inserted
  const userName = userAnswers[0] || 'Freund'
  const currentQuestion = typeof currentStep.question === 'function'
    ? currentStep.question(userName)
    : currentStep.question

  const handleNext = useCallback(() => {
    const newAnswers = [...userAnswers]
    newAnswers[dialogStep] = currentAnswer
    setUserAnswers(newAnswers)

    if (dialogStep < dialogSteps.length - 1) {
      const nextStep = dialogSteps[dialogStep + 1]
      transitionToStep(
        dialogStep + 1,
        newAnswers[dialogStep + 1] || '',
        nextStep.inputType
      )
    } else {
      // Last question completed - show completion message
      setIsCompleted(true)
    }
  }, [dialogStep, currentAnswer, userAnswers, transitionToStep])

  const handleBack = useCallback(() => {
    // If coming back from completion screen
    if (isCompleted) {
      setIsCompleted(false)
      return
    }

    if (dialogStep > 0) {
      const newAnswers = [...userAnswers]
      newAnswers[dialogStep] = currentAnswer
      setUserAnswers(newAnswers)

      const prevStep = dialogSteps[dialogStep - 1]
      transitionToStep(
        dialogStep - 1,
        userAnswers[dialogStep - 1] || '',
        prevStep.inputType
      )
    }
  }, [dialogStep, currentAnswer, userAnswers, transitionToStep, isCompleted])

  const goToStep = useCallback((stepIndex: number) => {
    // Reset completion state when navigating
    setIsCompleted(false)

    const newAnswers = [...userAnswers]
    newAnswers[dialogStep] = currentAnswer
    setUserAnswers(newAnswers)

    const targetStep = dialogSteps[stepIndex]
    transitionToStep(
      stepIndex,
      newAnswers[stepIndex] || '',
      targetStep.inputType
    )
  }, [dialogStep, currentAnswer, userAnswers, transitionToStep])

  // Global keyboard navigation
  useGlobalKeyboardNavigation({
    dialog: {
      currentStep: dialogStep,
      totalSteps: dialogSteps.length,
      goToPrevious: handleBack,
      goToNext: handleNext,
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

  // Show input with delay when component mounts or step changes
  useEffect(() => {
    setShowInput(false)
    const timer = setTimeout(() => {
      setShowInput(true)
    }, INPUT_DELAY)

    return () => clearTimeout(timer)
  }, [dialogStep])

  // Auto-focus input field when scrolling into the dialog section
  useEffect(() => {
    const currentSection = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnteredSection) {
            setHasEnteredSection(true)
            setTimeout(() => {
              if (currentStep.inputType === 'single' && inputRef.current) {
                inputRef.current.focus()
              } else if (currentStep.inputType === 'multi' && textareaRef.current) {
                textareaRef.current.focus()
              }
            }, 300)
          }
        })
      },
      { threshold: 0.8 }
    )

    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [hasEnteredSection, currentStep.inputType])

  // Handle Enter key for inputType 'none'
  useEffect(() => {
    if (currentStep.inputType === 'none') {
      let isReady = false

      const timeout = setTimeout(() => {
        isReady = true
      }, 100)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && isReady) {
          handleNext()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        clearTimeout(timeout)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [currentStep.inputType, handleNext])

  return (
    <section ref={sectionRef} className="dialog-section py-8 sm:p-16 h-dvh bg-transparent flex items-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card p-0! bg-transparent">
          <div className="card-body">
            {/* Show completion message when dialog is completed */}
            {isCompleted ? (
              <>
                <div className="chat chat-start" style={{ alignItems: 'start' }}>
                  <div className="chat-image avatar">
                    <div className="w-32">
                      <img
                        alt="Turtle guide"
                        src={`${import.meta.env.BASE_URL}turtle.png`}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#F6CF6B] text-[#564722] text-lg rounded-r-3xl rounded-t-3xl">
                    Deine Aufgabe ist es nun, die ganze Welt zu erleuchten –
                    also teile die Vision von Maluhia mit deinen Liebsten. 💖
                  </div>
                </div>
                <div className="flex justify-start items-center mt-6">
                  <ShadowButton onClick={handleBack}>
                    Zurück
                  </ShadowButton>
                </div>
              </>
            ) : (
              <>
                <TurtleQuestion
                  question={currentQuestion}
                  isTransitioning={isTransitioning}
                  turtleImageUrl={`${import.meta.env.BASE_URL}turtle.png`}
                />

                <InputField
                  inputType={currentStep.inputType}
                  placeholder={currentStep.placeholder}
                  value={currentAnswer}
                  onChange={setCurrentAnswer}
                  onEnter={handleNext}
                  inputRef={inputRef}
                  textareaRef={textareaRef}
                  showInput={showInput}
                  isTransitioning={isTransitioning}
                />

                <Navigation
                  onBack={handleBack}
                  onNext={handleNext}
                  currentStep={dialogStep}
                  totalSteps={dialogSteps.length}
                  userAnswers={userAnswers}
                  isLastQuestion={isLastQuestion}
                  currentInputType={currentStep.inputType}
                  currentAnswer={currentAnswer}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
