'use strict'
// Requires.
let mongoose = require('mongoose')

// Setup schema for presets.
let catchSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  position: {
    type: Array,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

let Catch = mongoose.model('Catch', catchSchema)

// Exports.
module.exports = Catch
