const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true
        },
        mainImage: {
            type: String,
            required: [true, 'A product must have a main image']
        },
        images: {
            type: [String],
            required: [true, 'A product must have sub images']
        },
        description: {
            type: String,
            required: [true, 'A product must have a description']
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        isOutOfStock: {
            type: Boolean,
            default: false
        },
        ratings: {
            rate: Number,
            count: Number
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

productSchema.index({ name: 1, category: 1, price: 1, ratings: -1 }, { unique: true })

productSchema.set('toJSON', {
    virtuals: true
})
const Product = mongoose.model('product', productSchema)

module.exports = Product
