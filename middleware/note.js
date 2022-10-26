const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const checkField = [
    check('title').isLength({min : 1}),
    check('description').isLength({min : 1}),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(404).send({
            status : 'error',
            ...errors
        })
    }
]

module.exports = {
    checkField
}