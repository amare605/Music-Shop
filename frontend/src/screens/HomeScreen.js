import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts} from '../actions/productActions'


function HomeScreen() {
    const dispatch = useDispatch()
    const params = useParams()
 
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1

    const productList = useSelector(state =>state.productList)
    const {loading, error, products, page, pages } = productList

    
    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    
  return (
    <>
        <h2>新品上市</h2>
        {loading ? (<Loader />) :
        error ? (<Message variant='danger'>{error}</Message>) : 
        (<>
            <Row>
                {products.map(product => (
                    <Col  key={product._id}  className='align-items-stretch d-flex' sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
            <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            />
        </>
        )}
    </>
  )
}

export default HomeScreen