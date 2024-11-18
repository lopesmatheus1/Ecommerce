/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent } from 'react'
import { CustomInputContainer } from './custom-input.styles'
import { InputHTMLAttributes } from 'react'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean
}

const CustomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
  (props, ref) => {
    return <CustomInputContainer {...props} ref={ref as any} />
  }
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
