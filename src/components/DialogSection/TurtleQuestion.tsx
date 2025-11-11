import { AnimatedTurtle } from '../AnimatedTurtle'

interface TurtleQuestionProps {
  question: string
  isTransitioning: boolean
}

export function TurtleQuestion({ question, isTransitioning }: TurtleQuestionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-16 sm:gap-0">
      <div className="flex justify-center sm:justify-start">
        <AnimatedTurtle size={192} />
      </div>
      <div
        className="relative bg-[#F6CF6B] text-[#564722] text-lg text-left mb-8 sm:ml-8 p-6 transition-opacity duration-400 ease-in-out rounded-3xl"
        style={{
          opacity: isTransitioning ? 0 : 1
        }}
      >
        {/* Triangle pointer for mobile (top) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-16 border-r-16 border-b-16 border-l-transparent border-r-transparent border-b-[#F6CF6B] sm:hidden" />

        {/* Triangle pointer for desktop (left) */}
        <div className="hidden sm:block absolute -left-4 top-8 w-0 h-0 border-t-16 border-b-16 border-r-16 border-t-transparent border-b-transparent border-r-[#F6CF6B]" />

        {question}
      </div>
    </div>
  )
}
