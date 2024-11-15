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
import {
  signInWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
} from 'firebase/auth'
import { auth } from '../../config/firebase.config'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>()

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      console.log(userCredentials)
    } catch (error) {
      const _error = error as AuthError
      console.log(_error)

      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setError('email', { type: 'WrongEmail' })
        setError('password', { type: 'WrongPassword' })
        return
      }
    }
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
            {errors.email?.type === 'WrongEmail' && (
              <InputErrorMessage>
                O e-mail não foi encontrado ou a senha é inválida
              </InputErrorMessage>
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

            {errors.password?.type === 'WrongPassword' && (
              <InputErrorMessage>O e-mail não foi encontrado ou a senha é inválida</InputErrorMessage>
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
