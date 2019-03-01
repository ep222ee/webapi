'use strict'
// Requires
const router = require('express').Router()
const controller = require('../controllers/loginController')
// Api authentication route.
router.post('/login/', controller.loginPost)

module.exports = router
