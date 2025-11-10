import { useCallback } from 'react'
import { ANIMATION_DURATION, INPUT_DELAY } from './constants'

interface UseStepTransitionProps {
  setIsTransitioning: (value: boolean) => void
  setShowInput: (value: boolean) => void
  setDialogStep: (value: number) => void
  setCurrentAnswer: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

export function useStepTransition({
  setIsTransitioning,
  setShowInput,
  setDialogStep,
  setCurrentAnswer,
  inputRef,
  textareaRef
}: UseStepTransitionProps) {
  const transitionToStep = useCallback((
    stepIndex: number,
    newAnswer: string,
    inputType: 'single' | 'multi' | 'none'
  ) => {
    // Start animation and hide input
    setIsTransitioning(true)
    setShowInput(false)

    // After animation, change step
    setTimeout(() => {
      setDialogStep(stepIndex)
      setCurrentAnswer(newAnswer)

      // Animate back in
      setTimeout(() => {
        setIsTransitioning(false)

        // Show input after delay
        setTimeout(() => {
          setShowInput(true)

          // Focus the input field after it appears
          setTimeout(() => {
            if (inputType === 'single' && inputRef.current) {
              inputRef.current.focus()
            } else if (inputType === 'multi' && textareaRef.current) {
              textareaRef.current.focus()
            }
          }, 50)
        }, INPUT_DELAY)
      }, 50)
    }, ANIMATION_DURATION)
  }, [setIsTransitioning, setShowInput, setDialogStep, setCurrentAnswer, inputRef, textareaRef])

  return { transitionToStep }
}
