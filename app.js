const express = require('express')
const app = express()
const Port = process.env.PORT || 3000
const Url = require('./models/url')

const mongoose = require('mongoose')
const exphbs = require('express-handlebars')//載入handlebars
const bodyParser = require('body-parser')
const makeId = require('./shortenURL')

//mongodb連線設定
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
//trun to 'new' page & get shorten-URL
app.post('/shorten-urls', (req, res) => {

  const website = req.body.website
  //不要有空白、非網址的關鍵字
  const header = website.substring(0, 8)
  if (!(website.trim() && header === 'https://')) {
    console.log('not a website') //alert()無法用
    return res.redirect('/')
  }
  //輸入亂數 5 character for newurl
  const shortenID = makeId(5)
  const host = req.headers.origin //回傳本地伺服器url

  return Url.findOne({ URL: website }).lean()
    .then(url => url ? url : Url.create({ URL: website, NewURL: shortenID }))
    .then(url => {
      const shortenURL = `${host}/${url.NewURL}`
      res.render('new', { URL: url.URL, shortURL: shortenURL, shortID: url.NewURL })
    })
    .catch(error => console.log(error))

})
//shorten-URL link to origin website
app.get('/:NewURL', (req, res) => {
  const shortener = req.params.NewURL
  return Url.findOne({ NewURL: shortener })
    .then(url => res.redirect(`${url.URL}`))
    .catch(error => console.log(error))
})

//listen app
app.listen(Port, () => {
  console.log(`the app is running on http://localhost:${Port}.`)
})