import type { InputType } from './types'

interface InputFieldProps {
  inputType: InputType
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onEnter: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  showInput: boolean
  isTransitioning: boolean
}

export function InputField({
  inputType,
  placeholder,
  value,
  onChange,
  onEnter,
  inputRef,
  textareaRef,
  showInput,
  isTransitioning
}: InputFieldProps) {
  return (
    <div
      className='flex h-40 items-center justify-center w-full transition-opacity duration-1000 ease-in-out'
      style={{
        opacity: isTransitioning || !showInput ? 0 : 1
      }}
    >
      {showInput && inputType === 'single' && (
        <div className="form-control mt-6 w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="input input-bordered input-lg w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEnter()
              }
            }}
          />
        </div>
      )}

      {showInput && inputType === 'multi' && (
        <div className="form-control mt-6 w-full">
          <textarea
            ref={textareaRef}
            placeholder={placeholder}
            className="textarea textarea-bordered textarea-lg w-full min-h-32"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
