const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {
    getAll,
    getOneById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController.js')
router.post('/', isAuthenticated, createCategory)
router.get('/', isAuthenticated, getAll)
router.get('/:categoryId', isAuthenticated, getOneById)
router.patch('/:categoryId', isAuthenticated, updateCategory)
router.delete('/:categoryId', isAuthenticated, deleteCategory)
module.exports = router
