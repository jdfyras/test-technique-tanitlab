const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {
    getAll,
    createProduct,
    getOneById,
    deleteProduct,
} = require('../controllers/productController.js')
router.post('/', isAuthenticated, createProduct)
router.get('/', isAuthenticated, getAll)
router.get('/:productId', isAuthenticated, getOneById)
router.delete('/:productId', isAuthenticated, deleteProduct)

module.exports = router
