'use strict'
// Require.s
const Hook = require('../models/HookSchema')

// Initiate hook controller object.
const hooksController = {}

/**
 * /hooks/ Post
 * subscribe to webhook
 * receives body with url and event options.
 * saves hook to database.
 * offers hateoas browsing.
 */
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
      { rel: 'self', method: 'POST', title: 'setup webhook', href: `${process.env.HOST_URL}${req.url}` },
      { rel: 'view all', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}/catches/` }
    ])
  })
}

module.exports = hooksController
