'use strict'

// Requires

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const mongoose = require('./config/mongoose.js')

const passport = require('passport')
const jwtStrategy = require('./passport/jwtstrategy')

const hateoasLinker = require('express-hateoas-links')

mongoose()

app.use(hateoasLinker)

// Bodyparser settings.
app.use(bodyParser.json())

// Passport settings.
app.use(passport.initialize())
passport.use(jwtStrategy)
// let passportJWT = passport.authenticate('jwt', { session: false })
// app.use('/', passportJWT, require('./routes/login.js'))

// Routes
app.use('/', require('./routes/entrypointRouter.js'))
app.use('/', require('./routes/loginRouter.js'))

app.use('/', require('./routes/catches.js'))
app.use('/', require('./routes/hooks.js'))

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
