import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import ProductNew from '../components/ProductNew'
import ProductRecommend from '../components/ProductRecommend'
import { listNewProducts, listProducts, listRecommendProducts } from '../actions/productActions'




function HomeScreen() {
    const dispatch = useDispatch()
    const params = useParams()
 
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1

    const productList = useSelector(state =>state.productList)
    const {loading, error, products, page, pages } = productList
  
    const productsPublished = products.filter(product => product.isPublished)
    
    
    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber,  ])


    
  return (
    <>
        <Meta />
        {!keyword ? (
        <>
            <ProductCarousel />
            {/* <h2>新品上架</h2>
            <Row>
                <ProductNew />
            </Row>      

            <h2>推薦商品</h2>
            <Row>
                <ProductRecommend />
            </Row> */}

            <h2>全部商品</h2>
        </>
        ) : (
        <Link to='/' className='btn btn-light'>
          返回
        </Link>
        )}

        {loading ? (<Loader />) :
        error ? (<Message variant='danger'>{error}</Message>) : 
        (<>
            <Row>
                {productsPublished.map(product => (
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