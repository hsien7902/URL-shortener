const express = require('express')
const app = express()
const Port = 3000

const mongoose = require('mongoose')
const exphbs = require('express-handlebars')//載入handlebars

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
//mongoose.connection 監聽
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//設定模板引擎預設介面
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//routes

app.get('/', (req, res) => {
  res.render('index')
})

//listen app
app.listen(Port, () => {
  console.log(`the app is running on http://localhost:${Port}.`)
})