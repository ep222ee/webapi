'use strict'

const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.route('/login')
  .post((request, response, next) => {
    // Hardcoded user.
    if (request.body.username === 'admin' && request.body.password === 'admin') {
      // Should be environment variable.
      let secret = 'secret'
      let token = jwt.sign({ payload: request.body.username }, secret, { expiresIn: 1800 })

      response.status(200).send({
        message: 'Logged in successfully!',
        token
      })
    } else {
      response.status(401).send({
        message: 'failed to login'
      })
    }
  })

module.exports = router
