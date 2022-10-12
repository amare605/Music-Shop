import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

function ProfileScreen ({  history }) {
  const location = useLocation();
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user.name){
            dispatch(getUserDetails('profile'))
        } else{
            setName(user.name)
            setEmail(user.email) 
        }
    }
  }, [dispatch,  history, userInfo , user ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('密碼不符')
    } else {
      // Dispatch update profile
    }
  }

  return (
    <Row>
        <Col md={3}>
            <h2>會員資料</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
        </Col>
    </Row>
  )
}

export default ProfileScreen