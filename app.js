'use strict'

// Requires

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const passport = require('passport')
const jwtStrategy = require('./passport/jwtstrategy')

// Bodyparser settings.
app.use(bodyParser.json())

app.use(passport.initialize())
passport.use(jwtStrategy)

let passportJWT = passport.authenticate('jwt', { session: false })
// Routes
app.use('/', require('./apiRoutes/login.js'))
app.use('/', passportJWT, require('./apiRoutes/entry.js'))

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
