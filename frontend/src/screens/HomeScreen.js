import products from '../../../backend/data/products'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'

function HomeScreen() {
  return (
    <>
        <h2>新品上市</h2>
        <Row>
            {products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen