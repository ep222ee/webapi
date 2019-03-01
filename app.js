'use strict'

// Requires
const express = require('express')
const hateoasLinker = require('express-hateoas-links')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mongoose = require('./config/mongoose.js')
const passport = require('passport')
const jwtStrategy = require('./passport/jwtstrategy')

// Initiate mongoDB
mongoose()

// Hateoas url middleware.
app.use(hateoasLinker)

// Disable x-powered-by header.
app.disable('x-powered-by')

// Bodyparser settings.
app.use(bodyParser.json())

// Passport settings.
app.use(passport.initialize())
passport.use(jwtStrategy)
let passportJWT = passport.authenticate('jwt', { session: false })

// Set accept header.
app.use((req, res, next) => {
  res.set('Accept', 'application/json')
  next()
})

// Routes.
app.use('/', require('./routes/rootRouter.js'))
app.use('/', require('./routes/loginRouter.js'))
// Protected Routes.
app.use('/', passportJWT, require('./routes/catchesRouter.js'))
app.use('/', passportJWT, require('./routes/hooksRouter.js'))

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
