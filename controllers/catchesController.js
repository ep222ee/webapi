'use strict'

require('dotenv').config()
const Catch = require('../models/CatchSchema')
const fetch = require('node-fetch')
const Hook = require('../models/HookSchema')

const catchesController = {}

catchesController.getCatches = async (req, res, next) => {
  try {
    let page = 0
    let nextPage = 2
    let resourcesPerPage = 20
    let lastPage

    if (req.query.page) {
      page = parseInt(req.query.page, 10)
      nextPage = page + 1
    }

    // Todo: Fixa lastpage.
    let catchData = await Catch.find({}).exec()
    lastPage = catchData.length / resourcesPerPage - 1
    let catchArray = []
    let startIndex = page * resourcesPerPage
    let endIndex = startIndex + (resourcesPerPage - 1)

    if (catchData.length > 0) {
      for (let i = startIndex; i <= endIndex; i++) {
        let catchResource = {
          data: {
            type: 'catches',
            id: catchData[i]._id,
            properties: {
              user: catchData[i].user,
              position: catchData[i].position,
              species: catchData[i].species,
              weight: catchData[i].weight,
              length: catchData[i].length,
              imageUrl: catchData[i].imageUrl,
              time: catchData[i].time
            },
            links: [
              { rel: 'self', method: 'GET', title: 'view catch', href: `${process.env.host_URL}/catches/${catchData[i]._id}` },
              { rel: 'update', method: 'PUT', title: 'update catch', href: `${process.env.host_URL}/catches/${catchData[i]._id}` },
              { rel: 'delete', method: 'DELETE', title: 'delete catch', href: `${process.env.host_URL}/catches/${catchData[i]._id}` }
            ]
          }
        }
        catchArray.push(catchResource)
      }
    }
    res.status(200).json({
      data: catchArray
    }, [
      { rel: 'self', method: 'GET', title: 'View all catches', href: `${process.env.HOST_URL}${req.url}` },
      { rel: 'next', method: 'GET', title: `View next ${resourcesPerPage} catches`, href: `${process.env.HOST_URL}/catches?page=${nextPage}` },
      { rel: 'lastPage', method: 'GET', title: `View last page of catches`, href: `${process.env.HOST_URL}/catches?page=${lastPage}` }
    ])
  } catch (err) {
    next()
  }
}

catchesController.postCatches = async (req, res, next) => {
  let newCatch = new Catch({
    user: req.body.user,
    position: req.body.position,
    species: req.body.species,
    weight: req.body.weight,
    length: req.body.length,
    imageUrl: req.body.imageUrl,
    time: req.body.time
  })
  await newCatch.save(function (err, catchData) {
    if (err) {
      next()
    }

    res.status(201).json({
      message: 'Successfully created catch',
      data: {
        type: 'catches',
        id: catchData._id,
        properties: {
          user: catchData.user,
          position: catchData.position,
          species: catchData.species,
          weight: catchData.weight,
          length: catchData.length,
          imageUrl: catchData.imageUrl,
          time: catchData.time
        }
      }
    }, [
      { rel: 'self', method: 'POST', title: 'Create catch', href: `${process.env.HOST_URL}/catches/` },
      { rel: 'view created', method: 'GET', title: 'View newly created catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'update', method: 'PUT', title: 'Edit newly created catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'delete', method: 'DELETE', title: 'View newly created catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` }
    ])
    catchesController.sendPayload()
  })
}

catchesController.getCatch = async (req, res, next) => {
  try {
    let catchData = await Catch.findById(req.params.id).exec()
    res.status(200).json({
      data: {
        type: 'catches',
        id: catchData._id,
        properties: {
          user: catchData.user,
          position: catchData.position,
          species: catchData.species,
          weight: catchData.weight,
          length: catchData.length,
          imageUrl: catchData.imageUrl,
          time: catchData.time
        }
      }
    }, [
      { rel: 'self', method: 'GET', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'update', method: 'PUT', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'delete', method: 'DELETE', href: `${process.env.HOST_URL}/catches/${catchData._id}` }
    ])
  } catch (err) {
    next()
  }
}

catchesController.putCatch = async (req, res, next) => {
  let updatedCatch = await Catch.findOneAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) {
      next()
    }
    return data
  })

  res.status(200).json({
    data: {
      type: 'catches',
      id: updatedCatch._id,
      properties: {
        user: updatedCatch.user,
        position: updatedCatch.position,
        species: updatedCatch.species,
        weight: updatedCatch.weight,
        length: updatedCatch.length,
        imageUrl: updatedCatch.imageUrl,
        time: updatedCatch.time
      }
    }
  }, [
    { rel: 'self', method: 'PUT', href: `${process.env.HOST_URL}/catches/${updatedCatch._id}` },
    { rel: 'view', method: 'GET', title: 'view catch', href: `${process.env.HOST_URL}/catches/${updatedCatch._id}` },
    { rel: 'delete', method: 'DELETE', title: 'delete catch', href: `${process.env.HOST_URL}/catches/${updatedCatch._id}` }
  ])
}

catchesController.deleteCatch = async (req, res, next) => {
  await Catch.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
      next()
    }

    if (data !== null) {
      res.status(204).send()
    } else {
      next()
    }
  })
}

catchesController.sendPayload = async () => {
  // event as parameter?
  console.log('payload!')

  try {
    // setup proper payload
    let payload = {
      test: 'tja',
      tes2t: 'tja2'
    }
    let subscribers = await Hook.find({})
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
  }
}

module.exports = catchesController
