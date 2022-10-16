import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
    const navigate = useNavigate();
    
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        
        navigate('/payment')
        
        
      }
    


  return (
    <FormContainer>
        <h1>寄送地址</h1>
        <CheckoutSteps step1 step2 />
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='country'>
            <Form.Label>國家</Form.Label>
            <Form.Control
                type='text'
                placeholder='請輸入國家....'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
            </Form.Group>         

            <Form.Group controlId='postalCode'>
            <Form.Label>郵遞區號</Form.Label>
            <Form.Control
                type='text'
                placeholder='請輸入郵遞區號...'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            </Form.Group>


            <Form.Group controlId='city'>
            <Form.Label>城市</Form.Label>
            <Form.Control
                type='text'
                placeholder='請輸入城市...'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            </Form.Group>
          
            
            
            <Form.Group controlId='address'>
            <Form.Label>地址</Form.Label>
            <Form.Control
                type='text'
                placeholder='請輸入地址...'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                繼續
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen