import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login.page'
import SignOnPage from './pages/signUp/signUp.page'

function App() {
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
