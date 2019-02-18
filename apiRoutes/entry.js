'use strict'

const router = require('express').Router()

router.route('/')
  .get((request, response, next) => {
    response.status(200).send({
      message: 'välkommen till entrypointen.'
    })
  })

module.exports = router
