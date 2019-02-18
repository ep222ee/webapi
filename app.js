'use strict'

// Requires

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

// Bodyparser settings.
app.use(bodyParser.json())

// Routes
app.use('/', require('./apiRoutes/login.js'))

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
