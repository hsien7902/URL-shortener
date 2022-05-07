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
//trun to 'new' page & get shorten-URL
app.post('/shorten-urls', (req, res) => {
  const website = req.body.website
  if (!website.trim()) {
    return res.redirect('/')
  }

  /**
   * 1. find if the url is in the table
   * 2. if yes -> return NewURL
   * 3. if no -> create the short url
   * 4. if no -> insert a new record in this table, then return the content
   * 5. render the web 
   */
  
  return Url.findOne({ URL: website }).lean()
    .then(url => url ? url : Url.create({ URL: website, NewURL: website }))
    .then(url => res.render('new', { shortURL: url.NewURL }))
    .catch(error => console.log(error))

})

//shorten-URL link to origin website
app.get('/:NewURL', (req, res) => {
  return res.render('index')
  // const website = req.body.website
  // console.log(website)
  // return Url.findOne({ URL: `${website}` }).lean()
  //   .then(url => res.redirect(`${url.URL}`))
  //   .catch(error => console.log(error))
})

//listen app
app.listen(Port, () => {
  console.log(`the app is running on http://localhost:${Port}.`)
})