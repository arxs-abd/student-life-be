require('dotenv')
require('./utils/db')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const routeAuth = require('./routes/auth') 
const routeNote = require('./routes/notes')
const port = process.env.PORT || 4000

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))

app.use(routeAuth)
app.use(routeNote)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})