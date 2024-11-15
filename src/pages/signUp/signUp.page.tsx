//lib
import { FiLogIn } from 'react-icons/fi'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

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

//utilities
import { auth, db } from '../../config/firebase.config'
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
    formState: { errors },
  } = useForm<SignUpForm>()

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
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
      console.log(error)
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

      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              placeholder="Digite seu nome"
              {...register('firstName', { required: true })}
              hasError={!!errors?.firstName}
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
              hasError={!!errors?.lastName}
            />
            {errors.lastName?.type === 'required' && (
              <InputErrorMessage>O sobrenome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              placeholder="Digite seu e-mail"
              hasError={!!errors?.email}
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
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              type="password"
              placeholder="Digite sua senha"
              {...register('password', { required: true })}
            />
            {errors.password?.type === 'required' && (
              <InputErrorMessageContainer>
                A senha é obrigatório
              </InputErrorMessageContainer>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              hasError={!!errors?.passwordConfirmation}
              type="password"
              placeholder="Confirme sua senha"
              {...register('passwordConfirmation', {
                required: true,
                validate: (value) => {
                  return value === watchPassword
                },
              })}
            />

            {errors.passwordConfirmation?.type === 'required' && (
              <InputErrorMessageContainer>
                A senha é obrigatório
              </InputErrorMessageContainer>
            )}

            {errors.passwordConfirmation?.type === 'Validate' && (
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
