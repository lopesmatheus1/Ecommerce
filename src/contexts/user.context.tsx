import { createContext, FunctionComponent, ReactNode, useState } from 'react'
import User from '../types/users.types'

interface UserContextProviderProps {
  children: ReactNode
}

interface IUserProps {
  currentUser: User | null
  isAuthenticated: boolean
  loginUser: (user: User) => void
  logoutUser: () => void
}

export const userContext = createContext<IUserProps>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
})

const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const isAuthenticated = currentUser !== null

  const loginUser = (user: User) => {
    setCurrentUser(user)
  }
  const logoutUser = () => {
    setCurrentUser(null)
  }

  return (
    <userContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider
