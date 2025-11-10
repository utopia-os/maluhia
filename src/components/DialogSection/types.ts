export type InputType = 'single' | 'multi' | 'none'

export interface DialogStep {
  question: string | ((userName: string) => string)
  placeholder?: string
  inputType: InputType
}
