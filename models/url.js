const mongoose = require('mongoose')
const schema = mongoose.Schema
const urlSchema = new schema({
  name: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Url', urlSchema)