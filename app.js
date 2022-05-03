const express = require('express')
const app = express()
const Port = 3000

//載入handlebars
const exphbs = require('express-handlebars')

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