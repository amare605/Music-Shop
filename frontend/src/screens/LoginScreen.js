import  { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen() {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin);
   
    const {loading, error, userInfo } = userLogin;
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    useEffect(() => {
        console.log(redirect)
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>登入</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>電子郵件</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='請輸入E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>密碼</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='請輸入密碼'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary'>
                登入
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            新會員 ?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                註冊會員
            </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen