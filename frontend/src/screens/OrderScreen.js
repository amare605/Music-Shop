import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams  } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, } from '../constants/orderConstants'

function OrderScreen() {
    const {id} = useParams(); 
    const orderId = id

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
          }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        

        if(!order || order._id !== orderId || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript()
            } else {
              setSdkReady(true)
            }
        }

    }, [navigate, dispatch, userInfo, successPay ,successDeliver ,order, orderId]) 


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
                        <Message variant='success'>已出貨</Message>
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
                        <Message variant='success'>已付款</Message>
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
                    {!order.isPaid && (
                        <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                            <Loader />
                        ) : (
                            <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                            />
                        )}
                        </ListGroup.Item>
                    )}
                    {loadingDeliver && <Loader />}
                    {userInfo &&
                        userInfo.isAdmin &&
                        order.isPaid &&
                        !order.isDelivered && (
                        <ListGroup.Item>
                            <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliverHandler}
                            >
                            確認出貨
                            </Button>
                        </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
                </Col>
            </Row>
         </>
}

export default OrderScreen