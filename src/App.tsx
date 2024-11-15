import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login.page'
import SignOnPage from './pages/signUp/signUp.page'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase.config'

function App() {
  onAuthStateChanged(auth, (user) => {
    console.log(user)
  })
  return (
    <>
      <BrowserRouter>
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
