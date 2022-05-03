const mongoose = require('mongoose')
const Url = require('../url')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < 4; i++) {
    Url.create({ name: `http://localhost:${i}` })
  }
  db.clse()
  console.log('Done')
})
