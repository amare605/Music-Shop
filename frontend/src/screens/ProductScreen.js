import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router';
import {Row, Col, Image, ListGroup, Card, Button, Form, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen({match , history}) {  
    const [qty, setQty] = useState(1)

    const {id} = useParams(); 
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(()=>{
        dispatch(listProductsDetails(id))
    },[ dispatch, id ])

    const navigate = useNavigate();
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }
    
    
  return (
    <>
        <Link className='btn btn-primary my-3'  to="/">回上一頁</Link>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>藝人:{product.artist}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>專輯:{product.name}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>類別: {product.category}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>價格: NTD {product.price}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>庫存量: {product.countInStock > 0 ? product.countInStock: "此商品無庫存"}</h3>
                  </ListGroup.Item>
              </ListGroup>
          </Col>      

          <Col md={3}>
                {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col><h3>購買數量</h3></Col>
                        <Col>
                          <FormControl
                            as='select'
                            size="lg" 
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                <Button 
                    onClick={addToCartHandler}
                    className='btn btn-block' 
                    type='button'
                    disabled={product.countInStock <= 0}>
                   <h3>加入購物車</h3>
                </Button>    
          </Col>
        </Row> 
        )}
    </>
  )
}

export default ProductScreen