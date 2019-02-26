'use strict'

const router = require('express').Router()

const controller = require('../controllers/loginController')

router.post('/login', controller.loginPost)

module.exports = router
