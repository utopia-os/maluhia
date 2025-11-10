interface TurtleQuestionProps {
  question: string
  isTransitioning: boolean
  turtleImageUrl: string
}

export function TurtleQuestion({ question, isTransitioning, turtleImageUrl }: TurtleQuestionProps) {
  return (
    <div className="chat h-40 chat-start relative" style={{ alignItems: 'start' }}>
      <div className="chat-image avatar">
        <div className="w-32">
          <img alt="Turtle guide" src={turtleImageUrl} />
        </div>
      </div>
      <div
        className="chat-bubble bg-[#F6CF6B] text-[#564722] text-lg text-left mb-24 ml-8 transition-opacity duration-400 ease-in-out rounded-r-3xl rounded-t-3xl"
        style={{
          opacity: isTransitioning ? 0 : 1
        }}
      >
        {question}
      </div>
    </div>
  )
}
