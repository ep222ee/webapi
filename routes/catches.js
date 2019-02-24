'use strict'

const router = require('express').Router()

const Catch = require('../models/CatchSchema')

router.route('/catches/')// unsafe protect with jwt.
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
    if (!request.query.page) {
      console.log('first page')
    } else {
      console.log('not first page')
    }
  })
  // return a set of X amount of catches
  // supply "next X amount" catches url to browse catches.

router.route('/catches/:id')
  .get(async (request, response, next) => {
    try {
      let catchData = await Catch.findById(request.params.id).exec()
      if (catchData !== null) {
        response.status(200).json(catchData)
      } else {
        next()
      }
      // hateoas browsing links?
      // message?
    } catch (err) {
      next()
    }
  })
  .put(async (request, response, next) => { // unsafe, protect with jwt
    try {
      let updatedCatch = await Catch.findOneAndUpdate(request.params.id, request.body).exec()
      if (updatedCatch !== null) {
        let updatedCatch = await Catch.findById(request.params.id).exec()
        response.status(200).json(updatedCatch)
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  })
  .patch(async (request, response, next) => { // unsafe, protect with jwt. Redundant since .put?
    try {
      console.log(request.body)
      let updatedCatch = await Catch.findOneAndUpdate(request.params.id, request.body).exec()
      if (updatedCatch !== null) {
        let updatedCatch = await Catch.findById(request.params.id).exec()
        response.status(200).json(updatedCatch)
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  })
  .delete(async (request, response, next) => { // unsafe, protect with jwt
    console.log(request.params.id)
    try {
      let deletedCatch = await Catch.findByIdAndDelete(request.params.id).exec()
      if (deletedCatch !== null) {
        response.status(204).json()
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  })

module.exports = router
