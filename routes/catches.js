'use strict'

const router = require('express').Router()

const Catch = require('../models/CatchSchema')

router.route('/catches')// unsafe protect with jwt.
  .post(async (request, response, next) => {
    let newCatch = new Catch({
      user: request.body.user,
      position: request.body.position,
      species: request.body.species,
      weight: request.body.weight,
      length: request.body.length,
      imageUrl: request.body.imageUrl,
      time: request.body.time
    })
    await newCatch.save(function (err, data) {
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
      // call webhook emit payload function!.
    })
  })
  .get(async (request, response, next) => {
    await Catch.find({}, function (err, catches) {
      if (err) {
        console.log(err)
      }
      response.status(200).json({
        message: 'här ska alla catches dyka upp'
      })
      // return a set of X amount of catches
      // supply "next X amount" catches url to browse catches.
    })
    // safe
  })

router.route('/catches/:id')
  .get(async (request, response, next) => {
    try {
      let catchData = await Catch.findById(request.params.id).exec()
      response.status(200).json(catchData)
      // hateoas browsing links?
      // message?
    } catch (err) {
      next()
      console.log(err)
    }
  })

  .put(async (request, reponse, next) => {
    // unsafe, protect with jwt
    // update with full body.
  })
  .patch(async (request, response, next) => {
    // unsafe, protect with jwt
    // update with 1 param.
  })
  .delete(async (request, response, next) => {
    // unsafe, protect with jwt
    // 204 no content
    // message "removed?"
  })
module.exports = router
