import { useState } from 'react'

const turtleQuestions = [
  "What brings you to our movement today?",
  "How do you envision making a difference?",
  "What skills or passions would you like to contribute?",
  "What does Maluhia mean to you?"
]

export default function DialogSection() {
  const [dialogStep, setDialogStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(turtleQuestions.length).fill(''))
  const [currentAnswer, setCurrentAnswer] = useState('')

  const handleNext = () => {
    if (currentAnswer.trim()) {
      const newAnswers = [...userAnswers]
      newAnswers[dialogStep] = currentAnswer
      setUserAnswers(newAnswers)

      if (dialogStep < turtleQuestions.length - 1) {
        setDialogStep(dialogStep + 1)
        setCurrentAnswer(newAnswers[dialogStep + 1] || '')
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
    }
  }

  const isLastQuestion = dialogStep === turtleQuestions.length - 1
  const allAnswered = userAnswers.every(answer => answer.trim() !== '')

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card bg-transparent">
          <div className="card-body">
            {/* Show completion message when all questions are answered */}
            {isLastQuestion && allAnswered && currentAnswer.trim() ? (
              <div className="chat chat-start" style={{ alignItems: 'start' }}>
                <div className="chat-image avatar">
                  <div className="w-32">
                    <img
                      alt="Turtle guide"
                      src="/turtle.png"
                    />
                  </div>
                </div>
                <div className="chat-bubble chat-bubble-success text-lg">
                  Thank you for sharing! Your journey with Maluhia begins now.
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
                        src="/turtle.png"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble chat-bubble-primary text-lg">
                    {turtleQuestions[dialogStep]}
                  </div>
                </div>

                {/* Input for current answer */}
                <div className="form-control mt-6">
                  <textarea
                    placeholder="Share your thoughts..."
                    className="textarea textarea-bordered textarea-lg w-full min-h-32"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  />
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    className="btn btn-outline"
                    onClick={handleBack}
                    disabled={dialogStep === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Zurück
                  </button>

                  <div className="flex gap-2">
                    {turtleQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                          index === dialogStep
                            ? 'bg-primary'
                            : userAnswers[index]?.trim()
                            ? 'bg-success'
                            : 'bg-base-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!currentAnswer.trim()}
                  >
                    {isLastQuestion ? 'Fertig' : 'Weiter'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}