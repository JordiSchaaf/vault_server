const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const logger = require('./utils/logger')
const seeder = require('./utils/database-seed')

// Database
// const Mongo_URI = 'mongodb://localhost:27017'
const Mongo_URI = process.env.MONGO_URI
mongoose.connect(Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => logger.info('DB Connected'))

mongoose.connection.on('error', err => {
    logger.error(`DB connection error: ${err.message}`)
})

seeder.defaultCompany()

// Bring in routes
const authRoutes = require('./routes/auth')
const orgRoutes = require('./routes/org')
const userRoutes = require('./routes/user')
const imageRoutes = require('./routes/image')

// Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())
app.use("/", authRoutes)
app.use("/org", orgRoutes)
app.use("/user", userRoutes)
app.use("/image", imageRoutes)

const port = process.env.PORT
app.listen(port, () => logger.info(`Listening on port ${port}`))