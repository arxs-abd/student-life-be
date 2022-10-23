require('dotenv')
require('./utils/db')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const actvityLogin = require('./routes/auth') 
const port = process.env.PORT || 4000


app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))

app.use(actvityLogin)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})