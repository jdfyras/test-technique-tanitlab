process.env.TZ = 'Europe/London'
require('dotenv').config()
const { env } = require('process')
const createError = require('http-errors')

const express = require('express')
const morgan = require('morgan')
require('./configurations/mongooseConifg')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute.js')
const categoryRoute = require('./routes/categoryRoute.js')
const errorHandler = require('./errorHandler')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
})
app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use((req, res, next) => {
    next(createError.NotFound())
})
app.use(errorHandler)

const { PORT } = env

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`NODE ENVIRONNEMENT : ${env.NODE_ENV}`)
})
