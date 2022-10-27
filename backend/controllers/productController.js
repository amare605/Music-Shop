import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc 抓取所有商品
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
  ? {
      $or: [
        {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
        {
          artist: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
      ],
    }
  : {};

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    res.json({products, page, pages: Math.ceil(count / pageSize)})
  })

// @desc 抓取特定id商品
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

  })

// @desc    刪除特定id商品
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    建立商品
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    artist: 'sample artist',
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    更新商品
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    artist,
    image,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.artist = artist
    product.image = image
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    取得countInStock數最高的前3個商品，用於carousel呈現
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ countInStock: -1 }).limit(3)

  res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getTopProducts,
}