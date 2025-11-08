import { useState } from 'react'

const turtleQuestions = [
  "What brings you to our movement today?",
  "How do you envision making a difference?",
  "What skills or passions would you like to contribute?",
  "What does Maluhia mean to you?"
]

export default function DialogSection() {
  const [dialogStep, setDialogStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')

  const handleAnswerSubmit = () => {
    if (currentAnswer.trim()) {
      setUserAnswers([...userAnswers, currentAnswer])
      setCurrentAnswer('')
      if (dialogStep < turtleQuestions.length - 1) {
        setDialogStep(dialogStep + 1)
      }
    }
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-4">
          {/* Turtle's question */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-16 rounded-full">
                <img
                  alt="Turtle guide"
                  src="https://em-content.zobj.net/source/apple/391/turtle_1f422.png"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              Wise Turtle
            </div>
            <div className="chat-bubble chat-bubble-primary">
              {turtleQuestions[dialogStep]}
            </div>
          </div>

          {/* Previous answers */}
          {userAnswers.map((answer, index) => (
            <div key={index}>
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-accent">
                  {answer}
                </div>
              </div>
              {index < dialogStep && (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-16 rounded-full">
                      <img
                        alt="Turtle guide"
                        src="https://em-content.zobj.net/source/apple/391/turtle_1f422.png"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble chat-bubble-primary">
                    {turtleQuestions[index + 1]}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Input for current answer */}
          {dialogStep < turtleQuestions.length && (
            <div className="flex gap-2 mt-6">
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="input input-bordered flex-1"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswerSubmit()
                  }
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleAnswerSubmit}
                disabled={!currentAnswer.trim()}
              >
                Send
              </button>
            </div>
          )}

          {dialogStep === turtleQuestions.length && userAnswers.length === turtleQuestions.length && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-16 rounded-full">
                  <img
                    alt="Turtle guide"
                    src="https://em-content.zobj.net/source/apple/391/turtle_1f422.png"
                  />
                </div>
              </div>
              <div className="chat-bubble chat-bubble-success">
                Thank you for sharing! Your journey with Maluhia begins now. 🌊
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}