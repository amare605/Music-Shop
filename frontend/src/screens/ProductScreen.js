import { Link, useParams } from 'react-router-dom'

import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import products from '../products'

function ProductScreen({match}) {
  const { id } = useParams();
  const product = products.find((p) => String(p._id) === id);

  if (!product) return null ; // 或跳到回去ui

  return (
    <>
        <Link className='btn btn-primary my-3'  to="/">回上一頁</Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>{product.artist}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>{product.name}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>類別: {product.category}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>價格: NTD {product.price}</h3>
                  </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                  <ListGroup.Item>
                      <h3>庫存量: {product.countInStock > 0 ? product.countInStock: "此商品無庫存"}</h3>
                  </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={3}>
                  <button className='btn btn-block' type='button' disabled={product.countInStock <= 0}>
                    <h3>加入購物車</h3>
                  </button>       
          </Col>
        </Row>
    </>
  )
}

export default ProductScreen