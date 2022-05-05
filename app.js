const express = require('express')
const app = express()
const Port = 3000
const Url = require('./models/url')

const mongoose = require('mongoose')
const exphbs = require('express-handlebars')//載入handlebars
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => {
  res.render('index')
})
//create shorten url page
app.post('/shorten-urls', (req, res) => {
  const website = req.body.website
  return Url.findOne({ URL: `${website}` }).lean()
    .then(url => res.render('new', { url: url }))
    .catch(error => console.log(error))

})

app.get('/shorten', (req, res) => {
  const website = req.body.website
  console.log(website)
  return Url.findOne({ URL: `${website}` }).lean()
    .then(url => res.redirect(`${url.URL}`))
    .catch(error => console.log(error))
})

//listen app
app.listen(Port, () => {
  console.log(`the app is running on http://localhost:${Port}.`)
})