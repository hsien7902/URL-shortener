const mongoose = require('mongoose')
const schema = mongoose.Schema
const urlSchema = new schema({
  URL: {
    type: String, required: true,
  },
  NewURL: {
    type: String, required: true,
  }
})

module.exports = mongoose.model('url', urlSchema)