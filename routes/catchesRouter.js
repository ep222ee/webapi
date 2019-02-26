'use strict'

const router = require('express').Router()
// require('dotenv').config()

const controller = require('../controllers/catchesController')

router.route('/catches/')
  .post(controller.postCatches)
  .get(controller.getCatches)

router.route('/catches/:id')
  .get(controller.getCatch)
  .put(controller.putCatch)
  .delete(controller.deleteCatch)

module.exports = router
