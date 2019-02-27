'use strict'
// Requires.
let mongoose = require('mongoose')

// Setup schema for presets.
let hookSchema = new mongoose.Schema({
  hookUrl: {
    type: String,
    required: true
  },
  events: {
    type: Array,
    required: true
  }
})

let Hook = mongoose.model('Hook', hookSchema)

// Exports.
module.exports = Hook
