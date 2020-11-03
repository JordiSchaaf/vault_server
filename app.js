const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

// Database
const Mongo_URI = 'mongodb://localhost:27017'
mongoose.connect(Mongo_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

// Bring in routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// Middleware
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())
app.use("/", authRoutes)
app.use("/user", userRoutes)

const port = 8080
app.listen(port, () => console.log(`Listening on port ${port}`))