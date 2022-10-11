import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >Music Shop</Navbar.Brand>
                </LinkContainer>              
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>會員資料</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      會員登出
                    </NavDropdown.Item>
                  </NavDropdown>
                  ) :
                    <LinkContainer to="/login"> 
                      <Nav.Link><i className="fa-solid fa-user">會員中心</i></Nav.Link>
                    </LinkContainer>
                  }
                 
                  <LinkContainer to="/cart"> 
                    <Nav.Link><i className="fa-solid fa-cart-shopping">購物車</i></Nav.Link>
                  </LinkContainer>      
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header