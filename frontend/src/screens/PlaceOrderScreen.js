import { useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)

    useEffect(()=>{
     if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }      
    },[navigate, cart.shippingAddress.address, cart.paymentMethod])

    //   取整數
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(0)
    }

    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) 
    ).toFixed(0)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
      if (success) {
        navigate(`/order/${order._id}`)
      }
      // eslint-disable-next-line
    }, [navigate, success])

    const placeOrderHandler = () => {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        })
    )}


  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                <h2>配送地址</h2>
                <p>
                  <strong>地址:</strong>
                  {cart.shippingAddress.country}{' '}
                  {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode}{' '}
                  {cart.shippingAddress.address}
                </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>付款方式</h2>
                  <strong>付款方式: </strong>
                  {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>購買品項</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message>您的購物車為空...</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>訂單摘要</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>商品總額</Col>
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>運費</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>總金額</Col>
                      <Col>${cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant='danger'>{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      確認訂單
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen