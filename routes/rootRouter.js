'use strict'

const router = require('express').Router()

const controller = require('../controllers/rootController')

router.get('/', controller.getRoot)

module.exports = router
