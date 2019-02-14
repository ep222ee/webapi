'use strict'

const router = require('express').Router()

router.route('/test')
  .get(async (request, response, next) => {
    response.status(200).send({
      message: 'gick ju bra det här'
    })
  })

module.exports = router
