import { FiLogIn } from 'react-icons/fi'
import { BsGoogle } from 'react-icons/bs'

//components
import CustomButton from '../../components/custom-button/custom-button'
import Header from '../../components/header/header'

//styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from './login.styles'
import CustomInput from '../../components/custom-input/custom-input.component'

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>Ou entre com seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>Email</p>
            <CustomInput placeholder="Digite seu email" hasError={true} />
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput placeholder="Digite sua senha" />
          </LoginInputContainer>

          <CustomButton startIcon={<FiLogIn />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </div>
  )
}

export default LoginPage
