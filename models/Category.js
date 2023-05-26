const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

CategorySchema.virtual('categoryId').get(function () {
    return this._id.toHexString()
})

CategorySchema.set('toJSON', {
    virtuals: true
})

const Category = mongoose.model('category', CategorySchema)
module.exports = Category
