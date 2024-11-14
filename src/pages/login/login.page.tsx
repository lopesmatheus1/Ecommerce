import CustomButton from '../../components/custom-button/custom-button'
import { IconContainer } from '../../components/custom-button/custom-button.styles'
import Header from '../../components/header/header'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from './login.styles'
import { BsGoogle } from 'react-icons/bs'

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com sua conta</LoginHeadline>

          <CustomButton>
            <IconContainer>
              <BsGoogle size={18} />
            </IconContainer>
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>Ou entre com seu e-mail</LoginSubtitle>

          <LoginInputContainer></LoginInputContainer>
          <LoginInputContainer></LoginInputContainer>
        </LoginContent>
      </LoginContainer>
    </div>
  )
}

export default LoginPage
