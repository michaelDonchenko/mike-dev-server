const express = require('express')
const cors = require('cors')
const app = express()
const { PORT } = require('./constants')
const connectDB = require('./database')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const { CLIENT_URL } = require('./constants')

//import passport middleware
require('./middlewares/passport-middleware')

//init middlewares
app.use(express.json({ limit: '5mb' }))
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())
app.use(cookieParser())

//import routers
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/message')

//init routes
app.use('/api', authRoutes)
app.use('/api', messageRoutes)

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })

    connectDB()
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
