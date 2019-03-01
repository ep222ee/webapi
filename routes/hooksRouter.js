'use strict'
// Requires
const router = require('express').Router()
const controller = require('../controllers/hooksController')
// Webhook setup route.
router.post('/hooks/', controller.postHooks)

module.exports = router
