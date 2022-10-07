import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, history }) => {
    const {id} = useParams(); 
    const productId = id

    const location = useLocation();
    const qty = Number(new URLSearchParams(location.search).get('qty'));

    const dispatch = useDispatch()
    const cart = useSelector(state =>state.cart)
    const { cartItems } = cart
    
    const removeFromCartHandler = (id) => {
       console.log('remove')
      }
    
    const navigate = useNavigate();
    const checkoutHandler = () => {
        navigate(`/login?redirect=${"/shipping"}`)
      }

    useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    

    return (
        <Row>
        <Col md={8}>
          <h1>購物車</h1>
          {cartItems.length === 0 ? (
            <Message>
              您的購物車為空 <Link to='/'>回上一頁</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        size="lg" 
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light' 
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  數量總計: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  件
                </h2>
                總金額:
                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  結帳
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
}

export default CartScreen