'use strict'

const router = require('express').Router()
const Hook = require('../models/HookSchema')

router.route('/hooks/')
  .post(async (request, response, next) => {
    let newHook = new Hook({
      hookUrl: request.body.hookUrl
    })

    await newHook.save(function (err, catchData) {
      if (err) {
        next()
      }
      response.status(201).json({
        status: 'success'
      })
    })
  })
module.exports = router
