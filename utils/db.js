require('dotenv').config()
const mongoose = require('mongoose')
const URL = process.env.MONGODB_URL
const DB = 'student_life'

mongoose.connect(URL, {
// mongoose.connect('mongodb://127.0.0.1:27017/student_life', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})