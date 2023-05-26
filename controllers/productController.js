const createError = require('http-errors')
const Category = require('../models/Category')
const Product = require('../models/Product')
const { productSchema } = require('../user-DefinedFunctions/validatorFunction')
module.exports = {
    createProduct: async (req, res, next) => {
        try {
            let query = await productSchema.validateAsync(req.body)
            const {
                name,
                mainImage,
                images,
                description,
                category,
                price,
                quantity,
                isOutOfStock,
                ratings
            } = query
            const categoryIdCheck = await Category.findById(category)
            if (!categoryIdCheck) {
                return next({ status: 400, message: 'Invalid category' })
            }

            let product = new Product({
                name,
                mainImage,
                images,
                description,
                category: category,
                price,
                quantity,
                isOutOfStock,
                ratings,
                user: req.user.userId
            })
            await product.save()
            if (!product)
                return next({
                    status: 500,
                    message: 'Product Creation is failure . Please try later'
                })

            return res.json({ success: true, product })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    getAll: async (req, res, next) => {
        try {
            let products = await Product.find()
                .populate('category')
                .populate('user')
                .select(' -__v')
            return res.json({ success: true, products: products })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    getOneById: async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.productId)
                .populate('category')
                .populate('user')
                .select(' -__v')
            if (!product) {
                return next({ status: 400, message: 'product with given ID is not found' })
            }

            return res.json({ success: true, product })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.productId)
            if (!product) throw createError.Conflict(`The product with the given ID is not found `)
            return res.json({ success: true, message: 'product is deleted successfully' })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    }
}
