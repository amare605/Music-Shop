import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails,  } from '../actions/userActions'


function UserEditScreen () {
  const {id} = useParams(); 
  const userId = id

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails




  useEffect(() => {
    if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
  }, [dispatch, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        返回
      </Link>
      <FormContainer>
        <h1>編輯使用者</h1>
       
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type='name'
                placeholder='請輸入姓名...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='請輸入Email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='是否為管理員'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              更新
            </Button>
          </Form>
        
      </FormContainer>
    </>
  )
}

export default UserEditScreen