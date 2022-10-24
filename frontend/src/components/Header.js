import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
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
                <SearchBox />
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
                  {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='管理介面' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>使用者管理</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>商品管理</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>訂單管理</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  )}    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header