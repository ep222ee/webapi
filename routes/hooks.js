'use strict'

const router = require('express').Router()

router.route('/hooks')
  .post((request, response, next) => {
    console.log(request.body.test)
    // skydda med jwt
    // spara url.
  })

module.exports = router
