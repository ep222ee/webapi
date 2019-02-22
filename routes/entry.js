'use strict'

const router = require('express').Router()

router.route('/')
  .get((request, response, next) => {
    response.status(200).json({
      Login: 'localhost:3000/login',
      Catches: 'localhost:3000/catches'
    })
  })

module.exports = router
