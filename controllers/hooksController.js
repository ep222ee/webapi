'use strict'
const Hook = require('../models/HookSchema')

const hooksController = {}

hooksController.postHooks = async (req, res, next) => {
  let newHook = new Hook({
    hookUrl: req.body.hookUrl,
    events: req.body.options.events
  })
  await newHook.save((err, hookData) => {
    if (err) {
      next()
    }
    res.status(201).json({
      message: 'successfully subscribed webhook',
      hookUrl: hookData.hookUrl,
      events: hookData.events
    }, [
      { rel: 'self', method: 'POST', href: `${process.env.HOST_URL}${req.url}` },
      { rel: 'view all', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}/catches/` }
    ])
  })
}

module.exports = hooksController
