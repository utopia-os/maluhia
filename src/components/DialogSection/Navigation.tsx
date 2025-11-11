import ShadowButton from '../ShadowButton'
import type { InputType } from './types'

interface NavigationProps {
  onBack: () => void
  onNext: () => void
  currentStep: number
  totalSteps: number
  userAnswers: string[]
  isLastQuestion: boolean
  currentInputType: InputType
  currentAnswer: string
}

export function Navigation({
  onBack,
  onNext,
  currentStep,
  totalSteps,
  userAnswers,
  isLastQuestion,
  currentInputType,
  currentAnswer
}: NavigationProps) {
  const isNextDisabled = currentInputType !== 'none' && !currentAnswer.trim()
  const isFirstQuestion = currentStep === 0

  const handleNextClick = () => {
    if (isLastQuestion) {
      // Scroll to map section
      const mapSection = document.getElementById('map')
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      onNext()
    }
  }

  return (
    <div className="flex justify-between items-center mt-6">
      {!isFirstQuestion && (
        <ShadowButton onClick={onBack}>
          Zurück
        </ShadowButton>
      )}

      <div className={`flex gap-2 ${isFirstQuestion ? 'mx-auto' : ''}`}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentStep
                ? 'bg-[#E37039]'
                : userAnswers[index]?.trim()
                ? 'bg-success'
                : 'bg-base-300'
            }`}
          />
        ))}
      </div>

      <ShadowButton
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        {isLastQuestion ? 'Fertig' : 'Weiter'}
      </ShadowButton>
    </div>
  )
}
