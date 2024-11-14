import { CustomButtonContainer } from './custom-button.styles'

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
      {startIcon}
      {children}
    </CustomButtonContainer>
  )
}

export default CustomButton
