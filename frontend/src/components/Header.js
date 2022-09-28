import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

function Header() {
  return (
    <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Music Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/login"><i class="fa-solid fa-user">會員中心</i></Nav.Link>
                    <Nav.Link href="/cart"><i class="fa-solid fa-cart-shopping">購物車</i></Nav.Link>     
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header