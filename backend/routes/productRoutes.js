import express from 'express'
const router = express.Router()
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getTopProducts,
    getNewProducts,
    getRecommendProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/')
            .get(getProducts)
            .post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.get('/new', getNewProducts)
router.get('/recommend', getRecommendProducts)
router.route('/:id')
            .get(getProductById)
            .delete(protect, admin, deleteProduct)
            .put(protect, admin, updateProduct)

export default router