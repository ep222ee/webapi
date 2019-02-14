'use strict'

// Requires

const express = require('express')
const app = express()
const port = 3000

app.use('/', require('./apiRoutes/test.js'))

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
