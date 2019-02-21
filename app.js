'use strict'

// Requires

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const mongoose = require('./config/mongoose.js')

const passport = require('passport')
const jwtStrategy = require('./passport/jwtstrategy')

mongoose()

// Bodyparser settings.
app.use(bodyParser.json())

// Passport settings.
app.use(passport.initialize())
passport.use(jwtStrategy)
let passportJWT = passport.authenticate('jwt', { session: false })

// Routes
app.use('/', require('./apiRoutes/login.js'))
app.use('/', passportJWT, require('./apiRoutes/entry.js'))

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
