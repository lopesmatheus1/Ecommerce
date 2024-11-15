//lib
import { FiLogIn } from 'react-icons/fi'
import { BsGoogle } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
  signInWithPopup,
} from 'firebase/auth'

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

//utilities
import { auth, db, googleProvider } from '../../config/firebase.config'

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

  const handleLoginWithGooglePress = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const users = collection(db, 'users')
      const querySnaptshot = await getDocs(
        query(users, where('id', '==', userCredentials.user.uid))
      )

      const user = querySnaptshot.docs[0]?.data()
      console.log(userCredentials)

      const firstName = userCredentials.user.displayName?.split(' ')[0]
      const lastName = userCredentials.user.displayName?.split(' ')[1]

      if (!user) {
        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          provider: 'google',
          firstName,
          lastName,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com sua conta</LoginHeadline>

          <CustomButton
            onClick={handleLoginWithGooglePress}
            startIcon={<BsGoogle size={18} />}
          >
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
              <InputErrorMessage>
                O e-mail não foi encontrado ou a senha é inválida
              </InputErrorMessage>
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
