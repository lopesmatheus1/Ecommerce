import { ReactNode } from 'react'
import { InputErrorMessageContainer } from './input-error-message.styles'

interface InputErrorMessageProps {
  children: ReactNode
}

const InputErrorMessage = ({ children }: InputErrorMessageProps) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage
