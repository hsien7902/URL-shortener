const express = require('express')
const app = express()
const Port = 3000

//routes

app.get('/', (req, res) => {
  res.send('Hello fucking world!!!')
})

//listen app

app.listen(Port, () => {
  console.log(`the app is running on http://localhost:${Port}.`)
})