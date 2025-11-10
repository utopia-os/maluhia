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

  return (
    <div className="flex justify-between items-center mt-6">
      <ShadowButton onClick={onBack}>
        Zurück
      </ShadowButton>

      <div className="flex gap-2">
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
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {isLastQuestion ? 'Fertig' : 'Weiter'}
      </ShadowButton>
    </div>
  )
}
