import { CustomButtonContainer, IconContainer } from './custom-button.styles'

import { FunctionComponent, ReactNode } from 'react'

interface CustomButtonProps {
  children: ReactNode
  startIcon?: ReactNode
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  startIcon,
}) => {
  return (
    <CustomButtonContainer>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  )
}

export default CustomButton
