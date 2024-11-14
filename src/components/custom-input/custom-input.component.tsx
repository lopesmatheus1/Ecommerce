import { CustomInputContainer } from './custom-input.styles'
import { InputHTMLAttributes } from 'react'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const CustomInput = ({ hasError, ...rest }: CustomInputProps) => {
  return (
    <>
      <CustomInputContainer hasError={hasError} {...rest} />
    </>
  )
}

export default CustomInput
