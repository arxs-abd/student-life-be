const express = require('express')
const jwt = require('jsonwebtoken')
const { Note } = require('../model/note')
const { User } = require('../model/user')
const router = express.Router()

router.get('/api/note', async (req, res) => {
    return res.send({
        status : 'success',
        data : {
            note : 'Ini Notenya'
        }
    })
})

// router.get('/api/note/:id', async (req, res) => {
//     return res.send({
//         status : 'success',
//         data : {
//             note : 'Ini Notenya'
//         }
//     })
// })

router.post('/api/note', async (req, res) => {
    const { title, description } = req.body
    const token = jwt.verify(req.cookies['x-access-token'], 'SECRET')
    const data = { title, description }
    const newNote = new Note(data)
    const user = await User.findOne({
        _id : token.user._id
    })
    const allNote = user.note
    allNote.push(newNote)
    user.note = allNote
    await user.save()
    return res.send({
        status : 'success',
        msg : 'Note add successfully'
    })
})

router.delete('/api/note', async (req, res) => {
    const { _id } = req.body
    const token = jwt.verify(req.cookies['x-access-token'], 'SECRET')
    const user = await User.findOne({
        _id : token.user._id
    })
    const allNote = user.note
    const newNotes = allNote.filter(note => {
        return note._id !== _id
    })
    user.note = newNotes
    return res.send({
        status : 'success',
        msg : 'Note delete successfully'
    })
})

module.exports = router