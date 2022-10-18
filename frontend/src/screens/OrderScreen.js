import { useEffect } from 'react'
import { Link, useNavigate, useParams  } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

function OrderScreen() {
    const {id} = useParams(); 
    const orderId = id

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    useEffect(() => {
      dispatch(getOrderDetails(orderId))
    }, [dispatch])


  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
         <>
            <h1>訂單單號: {order._id}</h1>
            <Row>
                <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2>配送地址</h2>
                    <p><strong>姓名: </strong> {order.user.name}</p>
                    <p><strong>Email: </strong>{' '}<a href={`mail to:${order.user.email}`}>{order.user.email}</a></p>                    <p>
                    <strong>地址:</strong>
                    {order.shippingAddress.country}{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}{' '}
                    {order.shippingAddress.address}
                    </p>

                    {order.isDelivered ? (
                        <Message variant='success'>
                            於{order.deliveredAt}已出貨
                        </Message>
                        ) : (
                        <Message variant='danger'>尚未出貨</Message>
                    )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>付款方式</h2>
                    <p>
                        <strong>付款方式: </strong>
                        {order.paymentMethod}
                    </p>

                    {order.isPaid ? (
                        <Message variant='success'>於{order.paidAt}已付款</Message>
                        ) : (
                        <Message variant='danger'>尚未付款</Message>
                    )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>購買品項</h2>
                    {order.orderItems.length === 0 ? (
                        <Message>您的購物車為空...</Message>
                    ) : (
                        <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
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
                        <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>運費</Col>
                        <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>總金額</Col>
                        <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>
         </>
}

export default OrderScreen