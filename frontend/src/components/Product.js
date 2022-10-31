import { Card } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

function Product({product}) {
  return (
    <Card className="my-2 p-3 rounded" style={{backgroundColor:'white' }}>
        <LinkContainer to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
        </LinkContainer>
        <Card.Body>
        <LinkContainer to={`/product/${product._id}`}>
            <Card.Title as='div'>
                <strong style={{color:'#696969' }}>{product.name}</strong>
            </Card.Title>
        </LinkContainer> 
        </Card.Body>
        <Card.Text as='h3' className="text-right">
            NTD {product.price}
        </Card.Text>
    </Card>
  )
}

export default Product