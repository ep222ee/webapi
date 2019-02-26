'use strict'

const router = require('express').Router()
require('dotenv').config()
const Catch = require('../models/CatchSchema')

const controller = require('../controllers/catchesController')

router.route('/catches/')
  .post(controller.postCatches)
  .get(controller.getCatches)

router.route('/catches/:id')
  .get(async (request, response, next) => {
    try {
      let catchData = await Catch.findById(request.params.id).exec()
      response.status(200).json({
        links: {
          self: `${process.env.HOST_URL}${request.url}`
        },
        data: {
          id: catchData._id,
          user: catchData.user,
          position: catchData.position,
          species: catchData.species,
          weight: catchData.weight,
          length: catchData.length,
          imageUrl: catchData.imageUrl,
          time: catchData.time
        }
      })
    } catch (err) {
      next()
    }
  })
  .put(async (request, response, next) => { // unsafe, protect with jwt
    try {
      let updatedCatch = await Catch.findOneAndUpdate(request.params.id, request.body).exec()
      if (updatedCatch !== null) {
        let updatedCatch = await Catch.findById(request.params.id).exec()
        response.status(200).json({
          links: {
            self: `${process.env.HOST_URL}${request.url}`
          },
          data: {
            id: updatedCatch._id,
            user: updatedCatch.user,
            position: updatedCatch.position,
            species: updatedCatch.species,
            weight: updatedCatch.weight,
            length: updatedCatch.length,
            imageUrl: updatedCatch.imageUrl,
            time: updatedCatch.time
          }
        })
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  })
  .patch(async (request, response, next) => { // unsafe, protect with jwt. Redundant since .put?
    try {
      let updatedCatch = await Catch.findOneAndUpdate(request.params.id, request.body).exec()
      if (updatedCatch !== null) {
        let updatedCatch = await Catch.findById(request.params.id).exec()
        response.status(200).json({
          links: {
            self: `${process.env.HOST_URL}${request.url}`
          },
          data: {
            id: updatedCatch._id,
            user: updatedCatch.user,
            position: updatedCatch.position,
            species: updatedCatch.species,
            weight: updatedCatch.weight,
            length: updatedCatch.length,
            imageUrl: updatedCatch.imageUrl,
            time: updatedCatch.time
          }
        })
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  })
  .delete(async (request, response, next) => { // unsafe, protect with jwt
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

// move this to other file.
const fetch = require('node-fetch')
const Hook = require('../models/HookSchema')

async function sendPayload () {
  try {
    // setup proper payload
    let payload = {
      test: 'tja',
      tes2t: 'tja2'
    }

    let subscribers = await Hook.find({}).exec()
    subscribers.forEach(async (subscriber) => {
      await fetch(subscriber.hookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    })
  } catch (err) {
    console.log(err)
    // next
  }
}

module.exports = router
