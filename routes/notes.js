const express = require('express')
const { Note } = require('../model/note')
const router = express.Router()

router.get('/api/note', async (req, res) => {
    return res.send({
        status : 'success',
        data : {
            note : 'Ini Notenya'
        }
    })
})

router.post('/api/note', async (req, res) => {
    const { title, decsription } = req.body
    const data = {title, decsription}
    const newNote = new Note(data)
    await newNote.save()

    return res.send({
        status : 'success',
        msg : 'Note add successfully'
    })
})

router.delete('/api/note', async (req, res) => {
    const { _id } = req.body
    const note = await Note.findOne({
        _id
    })
    if (!note) return res.send({
        status : 'error',
        msg : 'Cannot find the note'
    })
    return res.send({
        status : 'success',
        msg : 'Note delete successfully'
    })
})