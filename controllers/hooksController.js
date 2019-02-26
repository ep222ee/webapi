'use strict'
const Hook = require('../models/HookSchema')

const hooksController = {}

hooksController.postHooks = async (req, res, next) => {
  console.log('yeah')
  let newHook = new Hook({
    hookUrl: req.body.hookUrl
  })

  // receive webhook options that sign's up to different events?
  // receive secret, hash and save?

  await newHook.save(function (err, catchData) {
    if (err) {
      next()
    }
    // add proper message and hateoas.
    res.status(201).json({
      message: 'success'
    })
  })
}

module.exports = hooksController
