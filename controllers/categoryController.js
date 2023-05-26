const createError = require('http-errors')
const Category = require('../models/Category')
const { categorySchema } = require('../user-DefinedFunctions/validatorFunction')
module.exports = {
    createCategory: async (req, res, next) => {
        try {
            let query = await categorySchema.validateAsync(req.body)
            const categoryIdCheck = await Category.findOne({ name: query.name })
            if (categoryIdCheck) {
                return next({ status: 400, message: 'category is already exists' })
            }

            let category = new Category({ ...query })
            await category.save()
            if (!category)
                return next({
                    status: 500,
                    message: 'Category Creation is failure . Please try later'
                })

            return res.json({ success: true, category })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    getAll: async (req, res, next) => {
        try {
            const categories = await Category.find()
            if (!categories) {
                return next({ status: 400, message: 'categories not Found' })
            }

            return res.json({ success: true, categories })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    getOneById: async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.categoryId)
            if (!category) {
                return next({ status: 400, message: 'category with given ID is not found' })
            }

            return res.json({ success: true, category })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.categoryId)
            if (!category)
                throw createError.Conflict(`The category with the given ID is not found `)
            return res.json({ success: true, message: 'category is deleted successfully' })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const { name, description, image } = req.body
            if (!(name || description || image))
                throw createError.BadRequest(`No name or description or image`)
            const category = await Category.findById(req.params.categoryId)

            if (!category)
                throw createError.NotFound(`The category with the given ID is not found `)

            let filter = {}
            if (name) filter.name = name
            if (description) filter.description = description
            if (image) filter.image = image
            filter.updateAt = Date.now()
            const categoryUpdate = await Category.findOneAndUpdate({ _id: category._id }, filter, {
                new: true
            })
            if (!categoryUpdate) throw createError.Conflict('update Failure.')

            return res.json({ success: true, category: categoryUpdate })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    }
}
