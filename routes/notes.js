const express = require('express')
const jwt = require('jsonwebtoken')
const { Note } = require('../model/note')
const { User } = require('../model/user')
const { checkField } = require('../middleware/note')
const router = express.Router()

router.get('/api/note', async (req, res) => {
    return res.send({
        status : 'success',
        data : {
            note : 'Ini Notenya'
        }
    })
})

router.post('/api/note', checkField, async (req, res) => {
    const { title, description } = req.body
    const token = jwt.verify(req.cookies['x-access-token'], process.env.SECRET_CODE)
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

router.put('/api/note', async (req, res) => {
    const { id, title, description } = req.body
    const token = jwt.verify(req.cookies['x-access-token'], process.env.SECRET_CODE)
    const user = await User.findOne({
        _id : token.user._id
    })
    const allNote = user.note
    const newNote = allNote.map(note => {
        if (String(note._id) === id) {
            note.title = title
            note.description = description
            return note
        } else {
            return note
        }
    })
    user.note = newNote
    await user.save()
    return res.send({
        status : 'success',
        msg : 'Note update successfully'
    })
})

router.delete('/api/note', async (req, res) => {
    const { id } = req.body
    const token = jwt.verify(req.cookies['x-access-token'], process.env.SECRET_CODE)
    const user = await User.findOne({
        _id : token.user._id
    })
    const allNote = user.note
    const newNotes = allNote.filter(note => {
        return String(note._id) !== id
    })
    if (allNote.length === newNotes.length) return res.send({
        status : 'error',
        msg : 'Note not found'
    })
    await user.save()
    return res.send({
        status : 'success',
        msg : 'Note delete successfully'
    })
})

module.exports = router