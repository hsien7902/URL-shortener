const mongoose = require('mongoose')
const Url = require('../url')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  Url.create({
    URL: 'https://www.google.com',
    NewURL: 'https://Url-Shorten.herokuapp.com/6y7UP',
  })
  console.log('mongodb connected')
})
