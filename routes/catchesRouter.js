'use strict'
// Requires
const router = require('express').Router()
const controller = require('../controllers/catchesController')
// Catches - Multiple resources
// GET | POST
router.route('/catches/')
  .post(controller.postCatches)
  .get(controller.getCatches)

// Catches - Single resources
// GET | PUT | DELETE
router.route('/catches/:id')
  .get(controller.getCatch)
  .put(controller.putCatch)
  .delete(controller.deleteCatch)

module.exports = router
