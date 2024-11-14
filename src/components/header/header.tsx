import { BsCart3 } from 'react-icons/bs'
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from './header.styles'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignOnClick = () => {
    navigate('/signon')
  }
  return (
    <HeaderContainer>
      <HeaderTitle>Club Clothing</HeaderTitle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSignOnClick}>Criar Conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25}></BsCart3>
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
