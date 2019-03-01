'use strict'
// Requires
const router = require('express').Router()
const controller = require('../controllers/rootController')
// Api entry point route.
router.get('/', controller.getRoot)

module.exports = router
