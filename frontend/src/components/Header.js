import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
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
                  <LinkContainer to="/login"> 
                    <Nav.Link><i className="fa-solid fa-user">會員中心</i></Nav.Link>
                  </LinkContainer>
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