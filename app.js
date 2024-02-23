require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const Routers = require("./routes/auth-route")
const workoutRouters = require("./routes/traniner-route")
const bookingRouters = require("./routes/booking-route")
const bodyParse = require('body-parser')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require("./middlewares/error")
const authenticate = require('./middlewares/authenticate')

const app = express()
app.use(morgan('dev'))
app.use(cors())


app.use(express.json())
app.use(bodyParse.json({limit :"10mb"}))

// service
app.use('/auth', Routers)
app.use('/workout', workoutRouters)
app.use('/booking', bookingRouters)

// notFound
app.use(notFound)


// error
app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))