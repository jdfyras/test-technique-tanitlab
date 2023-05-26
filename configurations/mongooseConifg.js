const { env } = require('process')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose
    .connect(
        env.MONGODB_URI,
        {
            dbName: env.MONGODB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        6000000
    )
    .then(() => {
        console.log('mongodb connected.')
    })
    .catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
