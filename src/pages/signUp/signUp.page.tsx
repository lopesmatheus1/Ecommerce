//lib
import { FiLogIn } from 'react-icons/fi'
import {
  AuthError,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//styles
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from './signUp.styles'
import { useForm } from 'react-hook-form'
import validator from 'validator'

//Components
import CustomButton from '../../components/custom-button/custom-button'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header'
import InputErrorMessage from '../../components/input-errror-message/input-errror-message.component'
import { InputErrorMessageContainer } from '../../components/input-errror-message/input-error-message.styles'
import Loading from '../../components/loading/loading.component'

//utilities
import { auth, db } from '../../config/firebase.config'
import { userContext } from '../../contexts/user.context'

interface SignUpForm {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignOnPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>()

  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      setIsLoading(true)
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: userCredentials.user.email,
      })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const watchPassword = watch('password')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Header />
      {isLoading && <Loading />}
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              placeholder="Digite seu nome"
              {...register('firstName', { required: true })}
              $hasError={!!errors?.firstName}
            />
            {errors.firstName?.type === 'required' && (
              <InputErrorMessage>O nome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              placeholder="Digite seu sobrenome"
              {...register('lastName', {
                required: true,
              })}
              $hasError={!!errors?.lastName}
            />
            {errors.lastName?.type === 'required' && (
              <InputErrorMessage>O sobrenome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              placeholder="Digite seu e-mail"
              $hasError={!!errors?.email}
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                },
              })}
            />

            {errors.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatório</InputErrorMessage>
            )}

            {errors.email?.type === 'validate' && (
              <InputErrorMessage>O email não é válido</InputErrorMessage>
            )}

            {errors.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>
                Este e-mail já está sendo utilizado
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              $hasError={!!errors?.password}
              type="password"
              placeholder="Digite sua senha"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && (
              <InputErrorMessageContainer>
                A senha é obrigatório
              </InputErrorMessageContainer>
            )}

            {errors.password?.type === 'minLength' && (
              <InputErrorMessageContainer>
                A senha precisa ter no mínimo 6 caracteres.
              </InputErrorMessageContainer>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              $hasError={!!errors?.passwordConfirmation}
              type="password"
              placeholder="Confirme sua senha"
              {...register('passwordConfirmation', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword
                },
              })}
            />

            {errors.passwordConfirmation?.type === 'required' && (
              <InputErrorMessageContainer>
                A confirmação de senha é obrigatório.
              </InputErrorMessageContainer>
            )}

            {errors.passwordConfirmation?.type === 'minLength' && (
              <InputErrorMessageContainer>
                A senha precisa ter no mínimo 6 caracteres.
              </InputErrorMessageContainer>
            )}
            {errors.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessageContainer>
                As senhas precisam ser iguais
              </InputErrorMessageContainer>
            )}
          </SignUpInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </div>
  )
}

export default SignOnPage
