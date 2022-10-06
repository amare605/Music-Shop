import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation  } from 'react-router-dom'
import Message from '../components/Message'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, history }) => {
    const {id} = useParams(); 
    const productId = id

    const location = useLocation();
    const qty = new URLSearchParams(location.search).get('qty');

    const dispatch = useDispatch()
    const cart = useSelector(state =>state.cart)
    const { cartItems } = cart
    

    useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    

    return <div>cart</div>
}

export default CartScreen