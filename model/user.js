const mongoose = require('mongoose')
const { noteSchema } = require('../model/note')

const userSchema = new mongoose.Schema( {
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    note : [noteSchema]
} )

const User = mongoose.model('User', userSchema)

module.exports = {
    userSchema,
    User
}
