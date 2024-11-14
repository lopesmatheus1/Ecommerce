import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login.page'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
