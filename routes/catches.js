'use strict'

const router = require('express').Router()
require('dotenv').config()
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
    await newCatch.save(function (err, catchData) {
      if (err) {
        next()
      }
      response.status(201).json({
        links: {
          self: `${process.env.HOST_URL}${request.url}/${catchData._id}`
        },
        data: {
          type: 'catches',
          id: catchData._id,
          attributes: {
            user: catchData.user,
            position: catchData.position,
            species: catchData.species,
            weight: catchData.weight,
            length: catchData.length,
            imageUrl: catchData.imageUrl,
            time: catchData.time
          }
        }
      })
    })
    sendPayload() // move this function to separate file
  })
  .get(async (request, response, next) => {
    try {
      let page = 0
      let nextPage = 2
      let resourcesPerPage = 3
      let lastPage

      if (request.query.page) {
        page = parseInt(request.query.page, 10)
        nextPage = page + 1
      }

      let catchData = await Catch.find({}).exec()
      lastPage = catchData.length / resourcesPerPage - 1
      let catchArray = []
      let startIndex = page * resourcesPerPage
      let endIndex = startIndex + (resourcesPerPage - 1)

      if (catchData.length > 0) {
        for (let i = startIndex; i <= endIndex; i++) {
          let catchResource = {
            links: {
              self: `${process.env.host_URL}/catches/${catchData[i]._id}`
            },
            id: catchData[i]._id,
            user: catchData[i].user,
            position: catchData[i].position,
            species: catchData[i].species,
            weight: catchData[i].weight,
            length: catchData[i].length,
            imageUrl: catchData[i].imageUrl,
            time: catchData[i].time
          }
          catchArray.push(catchResource)
        }
      }

      response.status(200).json({
        links: {
          self: `${process.env.HOST_URL}${request.url}`,
          next: `${process.env.HOST_URL}/catches?page=${nextPage}`, // change if already on last?
          lastpage: `${process.env.HOST_URL}/catches?page=${lastPage}`
        },
        data: catchArray
      })
    } catch (err) {
      next()
    }
  })

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
