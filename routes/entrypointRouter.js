'use strict'

const router = require('express').Router()

const controller = require('../controllers/entryController')

router.get('/', controller.entry)

module.exports = router
