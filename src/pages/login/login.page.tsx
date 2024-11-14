//utilities
import { FiLogIn } from 'react-icons/fi'
import { BsGoogle } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import validator from 'validator'

//components
import CustomButton from '../../components/custom-button/custom-button'
import Header from '../../components/header/header'
import InputErrorMessage from '../../components/input-errror-message/input-errror-message.component'
import CustomInput from '../../components/custom-input/custom-input.component'

//styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from './login.styles'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const handleSubmitPress = (data: LoginForm) => {
    console.log(data)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            <CustomInput
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                },
              })}
              placeholder="Digite seu email"
              hasError={!!errors?.email}
            />
            {errors.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatório</InputErrorMessage>
            )}
            {errors.email?.type === 'validate' && (
              <InputErrorMessage>Digite um e-mail válido</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              type="password"
              {...register('password', { required: true })}
              placeholder="Digite sua senha"
              hasError={!!errors?.password}
            />
            {errors.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </div>
  )
}

export default LoginPage
