'use strict'

require('dotenv').config()
const Catch = require('../models/CatchSchema')
const Hook = require('../models/HookSchema')
const fetch = require('node-fetch')
const xssFilters = require('xss-filters')

const catchesController = {}

catchesController.getCatches = async (req, res, next) => {
  try {
    console.log(req.headers)
    let page
    let nextPage
    let previousPage
    let resourcesPerPage = 5
    let lastPage

    if (req.query.page) {
      page = parseInt(req.query.page, 10)
    } else {
      page = 1
    }

    previousPage = page > 1 ? page - 1 : null // in case user has manually entered ?page=1

    let catchData = await Catch.find({})
    if (catchData.length > 0) {
      lastPage = Math.ceil(catchData.length / resourcesPerPage)
      if (page < lastPage) {
        nextPage = page + 1
      }
      let catchArray = []
      let startIndex = (page - 1) * resourcesPerPage
      let endIndex = startIndex + resourcesPerPage - 1

      if (endIndex >= catchData.length) {
        endIndex = catchData.length - 1
      }
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
      res.status(200).json({
        data: catchArray
      }, [
        { rel: 'self', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}${req.url}` },
        { rel: 'create', method: 'POST', title: 'create catch', href: `${process.env.HOST_URL}/catches/` },
        { rel: 'next page', method: 'GET', title: `view next ${resourcesPerPage} catches`, href: nextPage ? `${process.env.HOST_URL}/catches?page=${nextPage}` : '' },
        { rel: 'previous page', method: 'GET', title: `view previous ${resourcesPerPage} catches`, href: previousPage ? `${process.env.HOST_URL}/catches?page=${previousPage}` : '' },
        { rel: 'first page', method: 'GET', title: `view first page`, href: `${process.env.HOST_URL}/catches/` },
        { rel: 'last page', method: 'GET', title: `view last page`, href: `${process.env.HOST_URL}/catches?page=${lastPage}` },
        { rel: 'hook', method: 'POST', title: `setup webhook`, href: `${process.env.HOST_URL}/hooks/` }
      ])
    }
  } catch (err) {
    next()
  }
}

catchesController.postCatches = async (req, res, next) => {
  let newCatch = new Catch({
    user: xssFilters.inHTMLData(req.body.user),
    position: xssFilters.inHTMLData(req.body.position),
    species: xssFilters.inHTMLData(req.body.species),
    weight: xssFilters.inHTMLData(req.body.weight),
    length: xssFilters.inHTMLData(req.body.length),
    imageUrl: xssFilters.inHTMLData(req.body.imageUrl),
    time: xssFilters.inHTMLData(req.body.time)
  })
  await newCatch.save((err, catchData) => {
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
      { rel: 'self', method: 'POST', title: 'create catch', href: `${process.env.HOST_URL}/catches/` },
      { rel: 'view created', method: 'GET', title: 'view newly created catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'update', method: 'PUT', title: 'edit newly created catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'delete', method: 'DELETE', title: 'delete newly created catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'view all', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}/catches/` }
    ])
    catchesController.sendPayload('created', catchData)
  })
}

catchesController.getCatch = async (req, res, next) => {
  try {
    let catchData = await Catch.findById(req.params.id)
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
      { rel: 'self', method: 'GET', title: 'view catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'update', method: 'PUT', title: 'update catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'delete', method: 'DELETE', title: 'delete catch', href: `${process.env.HOST_URL}/catches/${catchData._id}` },
      { rel: 'view all', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}/catches/` }
    ])
  } catch (err) {
    next()
  }
}

catchesController.putCatch = async (req, res, next) => {
  console.log(req.body)
  let updateData = {
    user: xssFilters.inHTMLData(req.body.user),
    position: xssFilters.inHTMLData(req.body.position),
    species: xssFilters.inHTMLData(req.body.species),
    weight: xssFilters.inHTMLData(req.body.weight),
    length: xssFilters.inHTMLData(req.body.length),
    imageUrl: xssFilters.inHTMLData(req.body.imageUrl),
    time: xssFilters.inHTMLData(req.body.time)
  }

  let updatedCatch = await Catch.findByIdAndUpdate(req.params.id, updateData, (err, data) => {
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
    { rel: 'self', method: 'PUT', title: 'update catch', href: `${process.env.HOST_URL}/catches/${updatedCatch._id}` },
    { rel: 'view', method: 'GET', title: 'view catch', href: `${process.env.HOST_URL}/catches/${updatedCatch._id}` },
    { rel: 'delete', method: 'DELETE', title: 'delete catch', href: `${process.env.HOST_URL}/catches/${updatedCatch._id}` },
    { rel: 'view all', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}/catches/` }
  ])
  catchesController.sendPayload('updated', updatedCatch)
}

catchesController.deleteCatch = async (req, res, next) => {
  await Catch.findByIdAndDelete(req.params.id, (err, catchData) => {
    if (err) {
      next()
    }
    if (catchData !== null) {
      res.status(204).send()
      catchesController.sendPayload('deleted', catchData)
    } else {
      next()
    }
  })
}

catchesController.sendPayload = async (event, catchData) => {
  try {
    let payload = {
      message: `Catch ${catchData._id} was ${event}`,
      event: `catch.${event}`,
      contains: ['catch'],
      payload: {
        catch: {
          id: catchData._id,
          user: catchData.user,
          position: catchData.position,
          species: catchData.species,
          weight: catchData.weight,
          length: catchData.length,
          imageUrl: catchData.imageUrl,
          time: catchData.time
        }
      }
    }
    let subscribers = await Hook.find({})
    subscribers.forEach(async (subscriber) => {
      if (subscriber.events.includes(event)) {
        await fetch(subscriber.hookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = catchesController
