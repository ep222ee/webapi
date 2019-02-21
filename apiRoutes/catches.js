'use strict'

const router = require('express').Router()

const Catch = require('../models/CatchSchema')

router.route('/catches')// unsafe protect with jwt.
  .post((request, response, next) => {
    let newCatch = new Catch({
      user: request.body.user,
      position: request.body.position,
      species: request.body.species,
      weight: request.body.weight,
      length: request.body.length,
      imageUrl: request.body.imageUrl,
      time: request.body.time
    })
    newCatch.save(function (err, data) {
      if (err) {
        console.log(err)
      }
      response.status(201).json({
        _self: `http://localhost:3000/catches/${data._id}`,
        user: data.user,
        position: data.position,
        species: data.species,
        weight: data.weight,
        length: data.length,
        imageUrl: data.imageUrl,
        time: data.time
      })
      // emit webhook payload!.
    })
  })
  /* .get((request, response, next) => {
    // 200
    // safe
  })
  .put((request, reponse, next) => {
    // unsafe, protect with jwt
    // update with full body.
  })
  .patch((request, response, next) => {
    // unsafe, protet with jwt
    // update with 1 param.
  }) */
module.exports = router
