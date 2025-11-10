interface ShadowButtonProps {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  className?: string
  disabled?: boolean
}

export default function ShadowButton({ children, onClick, className = '', disabled = false }: ShadowButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn text-[#564722] bg-[#F6CF6B] border-none rounded-full px-8 shadow-[0_6px_0_0_#E37039] hover:shadow-[0_8px_0_0_#E37039] active:shadow-[0_4px_0_0_#E37039] active:translate-y-1 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[0_4px_0_0_#E37039] disabled:translate-y-1 ${className}`}
    >
      {children}
    </button>
  )
}
