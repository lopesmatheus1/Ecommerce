//libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

//Pages
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login.page'
import SignOnPage from './pages/signUp/signUp.page'

//utilities
import { auth, db } from './config/firebase.config'
import { userContext } from './contexts/user.context'
import { userConverter } from './converters/firebase.converter'

function App() {
  const [isInitializing, setIsInitializing] = useState(true)
  const { isAuthenticated, logoutUser, loginUser } = useContext(userContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigninOut = isAuthenticated && !user
    if (isSigninOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    const isSigningIn = !isAuthenticated && user
    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConverter),
          where('id', '==', user?.uid)
        )
      )

      const userFromFireStore = querySnapshot.docs[0]?.data()
      loginUser(userFromFireStore)
      return setIsInitializing(false)
    }

    return setIsInitializing(false)
  })

  if (isInitializing) return null

  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signon" element={<SignOnPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
