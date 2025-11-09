interface ShadowButtonProps {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  className?: string
}

export default function ShadowButton({ children, onClick, className = '' }: ShadowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn text-[#564722] bg-[#F6CF6B] border-none rounded-full px-8 shadow-[0_6px_0_0_#E37039] hover:shadow-[0_8px_0_0_#E37039] active:shadow-[0_4px_0_0_#E37039] active:translate-y-1 transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  )
}
