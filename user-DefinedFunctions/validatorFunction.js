const Joi = require('joi')
const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    image: Joi.string().optional().allow(null)
})
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    ratings: Joi.object({ count: Joi.number().optional(), rate: Joi.number().optional() }),
    isOutOfStock: Joi.boolean().optional(),
    images: Joi.array().items(Joi.string().required()).optional().allow(null),
    mainImage: Joi.string().optional().allow(null)
})
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    cin: Joi.string().required(),
    phone: Joi.string().required(),
    dialCode: Joi.string().required(),
    street: Joi.string().optional().allow(null),
    governorate: Joi.string().optional().allow(null),
    postalcode: Joi.string().required(),
    gender: Joi.string().valid('M', 'F').required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().optional().allow(null)
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
module.exports = {
    registerSchema,
    loginSchema,
    productSchema,
    categorySchema,
   
}
