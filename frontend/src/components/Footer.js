import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                版權所有 &copy; Music Shop<br /> 
                聯絡資訊 : amare605@gmail.com
                </Col>                
            </Row>
        </Container>
    </footer>
  )
}

export default Footer