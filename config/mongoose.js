'use strict'
// Requires.
require('dotenv').config()
const mongoose = require('mongoose')

// Database connectionstring
let connectionString = `mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ds233320.mlab.com:33320/catches`

module.exports = function () {
  mongoose.connect(connectionString, { useNewUrlParser: true })

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connection opened.')
  })

  mongoose.connection.on('error', function (error) {
    console.error('Mongoose connection error: ', error)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected')
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination')
      process.exit(0)
    })
  })
}
