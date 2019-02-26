'use strict'

const router = require('express').Router()

const controller = require('../controllers/hooksController')

router.post('/hooks/', controller.postHooks)

module.exports = router
