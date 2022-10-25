import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen ({  history }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile
  


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
        if(!user || !user.name || success){
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else{
            setName(user.name)
            setEmail(user.email) 
        }
    }
  }, [dispatch,  history, userInfo , user, navigate ,success ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('密碼不符')
    } else {
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
        <Col md={3}>
            <h2>會員資料</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>會員資料，更新成功</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                <Form.Label>名稱</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='請輸入姓名'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='請輸入E-MAIL'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <Form.Label>密碼</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='請輸入您的密碼'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                <Form.Label>確認密碼</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='請再次輸入您的密碼'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                更新資料
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>我的訂單</h2>
            {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>訂單單號</th>
                      <th>訂單日期</th>
                      <th>總金額</th>
                      <th>已狀態</th>
                      <th>已狀態</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            <i className='fa-solid fa-check' style={{ color: 'green' }}></i>
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <i className='fa-solid fa-check' style={{ color: 'green' }}></i>
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                              訂單明細
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
        </Col>
    </Row>
  )
}

export default ProfileScreen