import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listNewProducts } from '../actions/productActions'
import { Card, Row ,Col } from "react-bootstrap"
import { LinkContainer, } from 'react-router-bootstrap'



function ProductNew({product}) {
    const dispatch = useDispatch()

    const productNew = useSelector((state) => state.productNew)
    const { loading, error, products } = productNew
  
    useEffect(() => {
      dispatch(listNewProducts())
    }, [dispatch])
  


  return loading ? (
    <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
    <Col style={{display:'flex', flexDirection:'row'}}>
        {products.map((products) => (
        <Card key={products._id} className="my-2 p-3 rounded" style={{backgroundColor:'white' }}>
            <LinkContainer to={`/product/${products._id}`}>
                <Card.Img src={products.image} variant='top' />
            </LinkContainer>
            <Card.Body>
            <LinkContainer to={`/product/${products._id}`}>
                <Card.Title as='div'>
                    <strong style={{color:'#696969' }}>{products.name}</strong>
                </Card.Title>
            </LinkContainer> 
            </Card.Body>
            <Card.Text as='h3' className="text-right">
                NTD {products.price}
            </Card.Text>
        </Card>
        ))}
    </Col>
    
  )
}

export default ProductNew